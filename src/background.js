browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Add settings.js to settings.html
    if (changeInfo.status === 'complete' && tab.url.includes('settings.html')) {
        browser.scripting.executeScript({
            target: { tabId: tabId },
            files: ['src/settings.js']
        });
    }

    // Add list.js to list.html
    if (changeInfo.status === 'complete' && tab.url.includes('list.html')) {
        browser.scripting.executeScript({
            target: { tabId: tabId },
            files: ['src/list.js']
        });
    }
});

function data_exists(data) {
    return data !== "" && data !== null
}

browser.runtime.onMessage.addListener((message, sender) => {
    console.log("MSG recieved")
    if (message.msg == "clicked") {
        
        // Get ip address and port number from stored data
        const ip = window.localStorage.getItem("ip");
        const port = window.localStorage.getItem("port");

        // Only run code if 'ip' and 'port' exists
        if (data_exists(ip) && data_exists(port)){

            // Extract all data exept 'msg' into a new object
            const { msg, ...new_object } = message;
            new_object["interval"] = 1000 * 60 //TODO: Change to read from default stored value

            // Send data to server
            fetch("http://" + ip + ":" + port + "/add", {
                method: "POST",
                body: JSON.stringify(new_object),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => {
                if (response.status == 200){
                }
            })
        }
    		browser.tabs.query({active: true, currentWindow: true})
    		.then((tabs) => {
    			browser.tabs.sendMessage(tabs[0].id, {action: "dissableEventListener"})
    		})
    } else {
        console.log(message)
    }
})
