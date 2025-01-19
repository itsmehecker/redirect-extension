// ...existing code...

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get('redirectConfig', (data) => {
    let config = data.redirectConfig || [];
    config.push({ url: tab.url, redirectUrl: '' }); // Add the current URL with an empty redirect URL
    chrome.storage.sync.set({ redirectConfig: config }, () => {
      console.log('Current website added to the configuration.');
      updateDynamicRules(config);
    });
  });
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.redirectConfig) {
    updateDynamicRules(changes.redirectConfig.newValue);
  }
});

function updateDynamicRules(config) {
  const rules = config
    .filter(item => item.redirectUrl) // Only include items with a valid redirect URL
    .map((item, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: 'redirect', redirect: { url: item.redirectUrl } },
      condition: { urlFilter: item.url, resourceTypes: ['main_frame'] }
    }));

  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({ length: config.length }, (_, i) => i + 1),
    addRules: rules
  }, () => {
    console.log('Dynamic rules updated.');
  });
}

// Initialize rules on startup
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get('redirectConfig', (data) => {
    updateDynamicRules(data.redirectConfig || []);
  });
});

// ...existing code...
