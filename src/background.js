browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Add settings.js to settings.html
    if (changeInfo.status === 'complete' && tab.url.includes('settings.html')) {
        browser.scripting.executeScript({
            target: { tabId: tabId },
            files: ['src/settings.js']
        });
    }
});

browser.runtime.onMessage.addListener((message, sender) => {
    console.log("MSG recieved")
    if (message.msg == "clicked") {
        console.log(message.path)
    		browser.tabs.query({active: true, currentWindow: true})
    		.then((tabs) => {
    			browser.tabs.sendMessage(tabs[0].id, {action: "dissableEventListener"})
    		})
    } else {
        console.log(message)
    }
})
