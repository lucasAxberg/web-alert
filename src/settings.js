// Form element reference 
const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    // Prevent the default submit function from the form
    event.preventDefault();

    // Create a formdata object to access the values
    const formData = new FormData(form);

    // Clear unused and update stored data
    localStorage.clear()
    for (const [key, value] of formData) {
        localStorage.setItem(key, value);
    }

});


const formData = new FormData(form);

// Apply saved settings to inputs except the checkboxes 
for (const key of formData.keys()) {
    document.querySelector(`*[name=${key}]`).value = localStorage.getItem(key)
}

// Apply the stored state to all checkboxes
form.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.checked = localStorage.getItem(checkbox.name) ? true : false
});

