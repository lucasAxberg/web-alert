browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Add settings.js to settings.html
    if (changeInfo.status === 'complete' && tab.url.includes('settings.html')) {
        browser.scripting.executeScript({
            target: { tabId: tabId },
            files: ['src/settings.js']
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

            // Get the tracked data from server
            fetch("http://" + ip + ":" + port)
            .then((response) => response.text())
            .then((data) => {

                // Calculate index
                const res_obj = JSON.parse(data)
                const index = Object.keys(res_obj).length

                // Set object as value to the key [index]
                const { msg, ...new_object } = message;
                const obj = {}
                obj[index] = new_object

                // Send data to server
                fetch("http://" + ip + ":" + port, {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
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
