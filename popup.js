document.addEventListener('DOMContentLoaded', () => {
  const redirectList = document.getElementById('redirectList');
  const newSiteUrl = document.getElementById('newSiteUrl');
  const addSiteButton = document.getElementById('addSiteButton');
  const saveCurrentWebsiteButton = document.getElementById('saveCurrentWebsite');

  chrome.storage.sync.get('redirectConfig', (data) => {
    let config = data.redirectConfig || [];
    if (config.length === 0) {
      redirectList.innerHTML = '<p>No redirects configured.</p>';
    } else {
      config.forEach((item, index) => {
        let div = document.createElement('div');
        div.className = 'redirect-item';
        div.innerHTML = `
          <span>${item.url}</span>
          <input type="text" placeholder="Redirect URL" value="${item.redirectUrl}" data-index="${index}">
          <button class="save-button" data-index="${index}">Save</button>
          <button class="remove-button" data-index="${index}">Remove</button>
        `;
        redirectList.appendChild(div);
      });

      document.querySelectorAll('.save-button').forEach(button => {
        button.addEventListener('click', (e) => {
          let index = e.target.getAttribute('data-index');
          let input = document.querySelector(`input[data-index="${index}"]`);
          config[index].redirectUrl = input.value;
          chrome.storage.sync.set({ redirectConfig: config }, () => {
            console.log('Redirect URL updated.');
          });
        });
      });

      document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (e) => {
          let index = e.target.getAttribute('data-index');
          config.splice(index, 1);
          chrome.storage.sync.set({ redirectConfig: config }, () => {
            console.log('Site removed from the configuration.');
            location.reload(); // Reload to update the list
          });
        });
      });
    }
  });

  addSiteButton.addEventListener('click', () => {
    let url = newSiteUrl.value;
    if (url && !url.match(/^https?:\/\//)) {
      url = 'https://' + url;
    }
    if (url) {
      chrome.storage.sync.get('redirectConfig', (data) => {
        let config = data.redirectConfig || [];
        config.push({ url: url, redirectUrl: '' });
        chrome.storage.sync.set({ redirectConfig: config }, () => {
          console.log('New site added to the configuration.');
          location.reload(); // Reload to update the list
        });
      });
    }
  });

  saveCurrentWebsiteButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let currentTab = tabs[0];
      chrome.storage.sync.get('redirectConfig', (data) => {
        let config = data.redirectConfig || [];
        config.push({ url: currentTab.url, redirectUrl: '' }); // Add the current URL with an empty redirect URL
        chrome.storage.sync.set({ redirectConfig: config }, () => {
          console.log('Current website added to the configuration.');
          location.reload(); // Reload to update the list
        });
      });
    });
  });
});
