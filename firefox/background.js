browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    return new Promise((resolve) => {
      browser.storage.sync.get('redirectConfig', (data) => {
        let config = data.redirectConfig || [];
        let redirectUrl = null;
        for (let item of config) {
          if (details.url.includes(item.url)) {
            redirectUrl = item.redirectUrl;
            if (redirectUrl && !redirectUrl.match(/^https?:\/\//)) {
              redirectUrl = 'https://' + redirectUrl;
            }
            break;
          }
        }
        if (redirectUrl) {
          resolve({ redirectUrl: redirectUrl });
        } else {
          resolve({});
        }
      });
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

browser.browserAction.onClicked.addListener((tab) => {
  browser.storage.sync.get('redirectConfig', (data) => {
    let config = data.redirectConfig || [];
    config.push({ url: tab.url, redirectUrl: '' }); // Add the current URL with an empty redirect URL
    browser.storage.sync.set({ redirectConfig: config }, () => {
      console.log('Current website added to the configuration.');
    });
  });
});

browser.storage.onChanged.addListener((changes, namespace) => {
  if (changes.redirectConfig) {
    console.log('Redirect configuration updated.');
  }
});

// Initialize rules on startup
browser.runtime.onStartup.addListener(() => {
  browser.storage.sync.get('redirectConfig', (data) => {
    console.log('Redirect configuration loaded on startup.');
  });
});

