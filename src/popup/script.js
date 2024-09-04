document.addEventListener("click", (e) => {
	if (e.target.tagName == "BUTTON") {
		browser.tabs.executeScript({
			code: 'console.log("HALLO")',
		});
	}
});
