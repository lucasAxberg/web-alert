// Listener trackers
let click_listener = null;
let move_listener = null;
let key_listener = null;

// Highlight box
const border_width = 4;
const hover_box = document.createElement("div");
hover_box.style.position = "absolute";
hover_box.style.pointerEvents = "none";

// Box data
let layer = 0;
let mouse_viewport_x = 0;
let mouse_viewport_y = 0; 

// Ensure all items are accessable on the mousemove event
new Promise(() => {
  let all_elements = document.querySelectorAll("*")
  all_elements.forEach(current_element => {
    if (window.getComputedStyle(current_element).pointerEvents == "none"){
      current_element.style.pointerEvents = "auto"
    }
  })
})

browser.runtime.onMessage.addListener((data, sender) => {
  if (data.action === "enableEventListener") {
    if (!click_listener) {
      click_listener = handle_click;
      move_listener = handle_move;
      key_listener = handle_key;
      document.addEventListener("click", click_listener)
      document.addEventListener("keypress", key_listener)
      document.addEventListener("mousemove", move_listener)
      console.log("Event listener activated")
    } else {
      console.log("Event listener activated")
    }
  } else if (data.action === "dissableEventListener") {
      document.removeEventListener("click", click_listener)
      document.removeEventListener("keypress", key_listener)
      document.removeEventListener("mousemove", move_listener)
      click_listener = null;
      move_listener = null;
      key_listener = null;
      if (document.body.contains(hover_box) == true){
        document.body.removeChild(hover_box)
      }
    
  }
})

function handle_click(event){
  browser.runtime.sendMessage({
    msg: "clicked",
    path: "<placeholder>"
  })
}

function handle_move(event) {
  // Get position of mouse
  mouse_viewport_x = event.pageX - window.scrollX;
  mouse_viewport_y = event.pageY - window.scrollY;

  // Update highlight
  update_highlight(mouse_viewport_x, mouse_viewport_y, layer)
  
}

function handle_key(event) {
  // Adjust the layer based on which key was pressed
  if (event.key == "+") {
    layer += 1
  } else if (event.key == "-") {
    layer -= 1
  } else if (event.key == "0") {
    layer = 0
  } else return
  
  // Update highlight
  update_highlight(mouse_viewport_x, mouse_viewport_y, layer)
  
}


function update_highlight(pos_x, pos_y, z_index){

  // Get specified targets information
  let target = getElementOnPos(pos_x, pos_y, z_index)
  const target_bounds = target.getBoundingClientRect()
  const target_height = target_bounds.height
  const target_width = target_bounds.width

  // Move hover_box into position
  hover_box.style.height = target_height + border_width * 2 + "px";
  hover_box.style.width = target_width + border_width * 2 + "px";
  hover_box.style.top = target_bounds.top + window.scrollY - border_width + "px";
  hover_box.style.left = target_bounds.left + window.scrollX - border_width + "px";
  hover_box.style.background = "rgba(153, 235, 255, 0.5)"

  // Add hover_box to document if not existing
  if (document.body.contains(hover_box) == false){
    document.body.appendChild(hover_box)
  }
}

function getElementOnPos(pos_x, pos_y, z_index) {
  
  // Get all elements under the cursor 
  let elements = document.elementsFromPoint(pos_x, pos_y)

  // Ensures the layer is within the array
  const max_z = elements.length - 1
  if (z_index > max_z) {
    z_index = max_z
  } else if (z_index < 0){
    z_index = 0
  }
    
  return elements[z_index]
}

