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
	// browser.scripting.executeScript({file: "/src/main.js"})
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

