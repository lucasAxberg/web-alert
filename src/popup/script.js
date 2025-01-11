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
			browser.tabs.executeScript({
				code: 'console.log("other")',
			});
	}
});

function add_function() {
	print_console("add");
	browser.tabs.executeScript({file: "/src/main.js"})
	window.close()
}

function remove_function() {
	print_console("remove");
}

function settings_function() {
	// let main_content = document.getElementById("popup_content");
	// let settings_content = document.getElementById("settings_content");

	// main_content.classList.add("hidden");
	// settings_content.classList.remove("hidden");
	browser.tabs.create({ 
		url: "/src/settings.html",
	  // active: false,
	}).then((tab) => {
  browser.tabs.executeScript(tab.id, {
    file: '/src/settings.js'
  });
});;
}

function refresh_function() {
	print_console("refresh");
}

function print_console(message) {
	browser.tabs.executeScript({
		code: `console.log("${message}")`,
	});
}
