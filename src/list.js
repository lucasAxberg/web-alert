let current_tracker

// Get ip address and port number from stored data
const ip = window.localStorage.getItem("ip");
const port = window.localStorage.getItem("port");

function refresh_values() {

  // Get ip address and port number from stored data
  const ip2 = window.localStorage.getItem('ip');
  const port2 = window.localStorage.getItem('port');

  // Return empty object if server settings are incomplete
  if (!data_exists(ip2) || !data_exists(port2)) {
    console.log('Both "Port" and "IP" must be specified in server settings')
  }
  
  // Get data from server and store it locally
  return fetch('http://' + ip2 + ':' + port2 + '/data')
    .then((response) => response.text())
    .then((data) => {
      console.log('Data:', data)
      window.localStorage.setItem('trackers', data)
      return
    })
}

function get_trackers() {
  // Get stored data
  const tracker = window.localStorage.getItem('trackers')

  // Return empty object if nothing was found
  if (tracker === null) {
    return {}
  }

  // Return formatted data
  return JSON.parse(tracker)
}


function data_exists(data) {
    return data !== "" && data !== null
}

function save_button() {
  // Only run if current tracker is set
  if (typeof current_tracker === 'string' && !isNaN(current_tracker)){

    // Update property of current tracker object
    const trackers = get_trackers()
    trackers[current_tracker]['name'] = document.getElementById('name').value
  
    // Post object to server
    fetch('http://' + ip + ':' + port + '/update/' + current_tracker, {
      method: 'POST',
      body: JSON.stringify(trackers[current_tracker])
    })
    .then(()=> {refresh_values()})
  }
}

function delete_button() {
  // Only run if current tracker is set
  if (typeof current_tracker === 'string' && !isNaN(current_tracker)){

    // Tell server to remove the item with index of current_tracker
    fetch('http://' + ip + ':' + port + '/data/' + current_tracker, {
      method: 'DELETE',
    })
    .then(() => {refresh_values()})
  }
}

refresh_values()
.then(() => {
  document.getElementById('save').onclick = save_button
  document.getElementById('delete').onclick = delete_button

  // Get template and list to put it in
  const template = document.getElementById('tracker-template')
  const list = document.getElementById('left')

  // Get all preset fields
  const name = document.getElementById('name')
  const last_checked = document.getElementById('date-and-time')
  const url = document.getElementById('url')
  const path = document.getElementById('path')
  const value = document.getElementById('value')
  
  console.log(get_trackers())
  // Loop though data from server
  const trackers = get_trackers()
  for (const key in trackers) {

    // Create a visible clone and set it's id
    const item = template.cloneNode(true)
    item.classList.remove('hidden')
    item.id = key

    item.onclick = () => {
      // Set values of preset field on click
      name.value = trackers[key]["name"]
      last_checked.value = new Date(trackers[key]['checked']).toISOString().substring(0, 16)
      url.value = trackers[key]['url']
      path.value = trackers[key]['path']
      value.value = trackers[key]['value']
                
      // Set current tracker
      current_tracker = key
    }

    // Add item to list
    list.appendChild(item)
  }
})

// // Only run code if 'ip' and 'port' exists
// if (data_exists(ip) && data_exists(port)){

//     // Get the tracked data from server
//     fetch("http://" + ip + ":" + port + '/data')
//     .then((response) => response.text())
//     .then((data) => {

//       document.getElementById('save').onclick = save_button
//       document.getElementById('delete').onclick = delete_button

//       // Get template and list to put it in
//       const template = document.getElementById('tracker-template')
//       const list = document.getElementById('left')

//       // Get all preset fields
//       const name = document.getElementById('name')
//       const last_checked = document.getElementById('date-and-time')
//       const url = document.getElementById('url')
//       const path = document.getElementById('path')
//       const value = document.getElementById('value')
      
//       // Loop though data from server
//       trackers = JSON.parse(data)
//       for (const key in trackers) {

//         // Create a visible clone and set it's id
//         const item = template.cloneNode(true)
//         item.classList.remove('hidden')
//         item.id = key

//         item.onclick = () => {
//           // Set values of preset field on click
//           name.value = trackers[key]["name"]
//           last_checked.value = new Date(trackers[key]['checked']).toISOString().substring(0, 16)
//           url.value = trackers[key]['url']
//           path.value = trackers[key]['path']
//           value.value = trackers[key]['value']
                    
//           // Set current tracker
//           current_tracker = key
//         }

//         // Add item to list
//         list.appendChild(item)
//       }
      
//     })

// } else {
//   console.log("SERVER SETTINGS INCOMPLETE")
// }
