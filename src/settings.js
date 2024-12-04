const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

        const formData = new FormData(form);

        // const formDataObj = {
        //   "ip": formData.get('ip'),
        //   "port": formData.get('port'),
        //   "use-server": formData.get('use-server'),
        //   "use-encryption": formData.get('use-encryption'),
        //   "encryption": formData.get('encryption'),
        // };
        localStorage.clear()
        for (const [key, value] of formData) {
            localStorage.setItem(key, value);
        }
        console.log(formData);
});


console.log("test:", localStorage.getItem("test"))
localStorage.setItem("test", "TEST_VALUE")
const formData = new FormData(form);
for (const [key, value] of formData) {
    tmp_val = localStorage.getItem(key)
    console.log(key, ": ", value, " | ", tmp_val)
    document.querySelector(`*[name=${key}]`).value = tmp_val
}

const checkboxes = form.querySelectorAll('input[type="checkbox"]');
const checkboxNames = [];

checkboxes.forEach(function(checkbox) {
    tmp_val = localStorage.getItem(checkbox.name)
    console.log(checkbox.name, " | ", tmp_val)
    checkbox.checked = tmp_val ? true : false
});

