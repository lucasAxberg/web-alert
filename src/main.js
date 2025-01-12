const border_width = 4;
const hover_box = document.createElement("div");
hover_box.style.position = "absolute";
hover_box.style.pointerEvents = "none";

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

function handleMouseMove(event) {
  // Get position of mouse
  mouse_viewport_x = event.pageX - window.scrollX;
  mouse_viewport_y = event.pageY - window.scrollY;

  // Update highlight
  update_highlight(mouse_viewport_x, mouse_viewport_y, layer)
}

function handleKeyPress(event){
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

  // Get all elements under the cursor 
  let elements = document.elementsFromPoint(pos_x, pos_y)

  // Ensures the layer is within the array
  const max_z = elements.length - 1
  if (z_index > max_z) {
    z_index = max_z
  } else if (z_index < 0){
    z_index = 0
  }

  // Get specified target and its information
  let target = elements[z_index]
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

function handleClick(event) {
  event.preventDefault()

  // Remove eventlisteners to stop higlight
  document.removeEventListener("mousemove", handleMouseMove)
  document.removeEventListener("keypress", handleKeyPress)
  document.body.removeChild(hover_box)

  // Only continue if button pressed is left-click
  if (event.button == 2) return

  // Recursive funtion that looks for a unique identifier ("class", "name", "id")
  // and creates an xpath from it. If none was found call itself on the parent 
  // node and repeat until one with a unique identifier is found and build from it
  
}

document.addEventListener("mousemove", handleMouseMove)
document.addEventListener("keypress", handleKeyPress)
document.addEventListener("click", handleClick)


