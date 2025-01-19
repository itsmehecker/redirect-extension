// ...existing code...

document.getElementById('saveCurrentWebsite').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let currentTab = tabs[0];
    chrome.storage.sync.get('redirectConfig', (data) => {
      let config = data.redirectConfig || [];
      config.push({ url: currentTab.url, redirectUrl: '' }); // Add the current URL with an empty redirect URL
      chrome.storage.sync.set({ redirectConfig: config }, () => {
        console.log('Current website added to the configuration.');
      });
    });
  });
});

// ...existing code...
