browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Add settings.js to settings.html
    if (changeInfo.status === 'complete' && tab.url.includes('settings.html')) {
        browser.scripting.executeScript({
            target: { tabId: tabId },
            files: ['src/settings.js']
        });
    }
});

