const border_width = 4;
let hover_box = document.createElement("div");
hover_box.style.position = "absolute";
hover_box.style.pointerEvents = "none";

let layer = 0;
let max_layer = 0;

// Ensure all items are accessable on the mousemove event
new Promise(() => {
  let all_elements = document.querySelectorAll("*")
  all_elements.forEach(current_element => {
    if (window.getComputedStyle(current_element).pointerEvents == "none"){
      current_element.style.pointerEvents = "auto"
    }
  })
})

document.addEventListener("mousemove", (event) => {

  // Get all elements under the cursor 
  const mouse_viewport_x = event.pageX - window.scrollX;
  const mouse_viewport_y = event.pageY - window.scrollY;
  let elements = document.elementsFromPoint(mouse_viewport_x, mouse_viewport_y)

  // Ensures the layer is within the array
  max_layer = elements.length - 1
  if (layer > max_layer) {
    layer = max_layer
  } else if (layer < 0){
    layer = 0
  }

  // Get specified target and its information
  let target = elements[layer]
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
  
})

document.addEventListener("keypress", (event) => {

  // Adjust the layer based on which key was pressed
  if (event.key == "+") {
    layer += 1
  } else if (event.key == "-") {
    layer -= 1
  } else if (event.key == "0") {
    layer = 0
  }
})
