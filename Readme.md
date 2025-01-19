# Website Redirector

Website Redirector is a Chrome extension that allows users to redirect websites according to their configuration.

## Features

- Add new websites to the redirect configuration.
- Save the currently visiting website to the configuration.
- Remove websites from the configuration.
- Automatically add `https://` to URLs if not provided.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" using the toggle switch in the top right corner.
4. Click the "Load unpacked" button and select the directory containing your extension files.

## Usage

1. Click on the extension icon to open the popup.
2. Use the input field to add a new site URL and click "Add Site".
3. Click "Save Current Website" to add the currently visiting website to the configuration.
4. Use the "Save" button to save the redirect URL for a site.
5. Use the "Remove" button to remove a site from the configuration.

## Configuration

The extension uses a `config.json` file to store key-value pairs of all the configurations. The `redirectConfig` key holds an array of objects, each containing a `url` and a `redirectUrl`.

## Files

- `manifest.json`: The manifest file for the Chrome extension.
- `background.js`: The background script to handle URL redirection.
- `popup.html`: The HTML file for the popup interface.
- `popup.js`: The JavaScript file for the popup interface.
- `config.json`: The configuration file for storing redirect configurations.
- `icons/`: Directory containing the icon files for the extension.

