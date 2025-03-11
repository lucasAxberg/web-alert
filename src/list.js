let trackers
let current_tracker

// Get ip address and port number from stored data
const ip = window.localStorage.getItem("ip");
const port = window.localStorage.getItem("port");

console.log("get")

function data_exists(data) {
    return data !== "" && data !== null
}

// Only run code if 'ip' and 'port' exists
if (data_exists(ip) && data_exists(port)){

    // Get the tracked data from server
    fetch("http://" + ip + ":" + port)
    .then((response) => response.text())
    .then((data) => {
      const template = document.getElementById('tracker-template')
      const list = document.getElementById('left')

      const name = document.getElementById('name')
      const last_checked = document.getElementById('date-and-time')
      const url = document.getElementById('url')
      const path = document.getElementById('path')
      const value = document.getElementById('value')
      
      trackers = JSON.parse(data)

      for (const key in trackers) {
        const item = template.cloneNode(true)
        item.classList.remove('hidden')
        item.id = key
        item.onclick = () => {
          name.value = trackers[key]["name"]
          last_checked.value = new Date(trackers[key]['checked']).toISOString().substring(0, 16)
          url.value = trackers[key]['url']
          path.value = trackers[key]['path']
          value.value = trackers[key]['value']
        }
        list.appendChild(item)

        console.log(key, trackers[key])
      }
      
    })

} else {
  console.log("SERVER SETTINGS INCOMPLETE")
}
