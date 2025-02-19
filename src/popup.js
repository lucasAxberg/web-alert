// Server settings
let ip
let port

function data_exists(data) {
    return data !== "" && data !== null
}

// Get data from server and save it in local storage as JSON string
new Promise((resolve) => {
	// Get ip and port
	ip = localStorage.getItem("ip")
	port = localStorage.getItem("port")
	// Print if one of port or ip doesn't exist
	if (data_exists(ip) === false && data_exists(port) === false) {
		console.log("Must specify Port and IP")
	}
	resolve({ip, port})
})
.then(({ip, port}) => fetch("http://" + ip + ":" + port)) // Get data
.then((response) => response.text()) // Get the text sent
.then((data) => {
	// Store data as JSON string
	localStorage.setItem("trackers", data)	
	console.log("Successfully stored data: " + data)
})
.catch((err) => {
	console.log(err)
})

document.addEventListener("click", (e) => {
	switch (e.target.id) {
		case "add":
			add_function();
			break;
		case "remove":
			remove_function();
			break;
		case "settings":
			settings_function();
			break;
		case "refresh":
			refresh_function();
			break;
		default:
	}
});


function add_function() {
	browser.tabs.query({active: true, currentWindow: true})
	.then((tabs) => {
		return browser.tabs.sendMessage(tabs[0].id, {action: "enableEventListener"})
	})
	.then(() => {
		window.close()
	})
}

function remove_function() {
}

function settings_function() {
	// Create settings tab
	browser.tabs.create({ 
		url: "/src/settings.html",
	  active: true,
	})
}

function refresh_function() {
}

