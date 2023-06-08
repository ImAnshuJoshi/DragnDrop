// Get all draggable items and containers
const draggableItems = document.querySelectorAll(".draggableItem");
const containers = document.querySelectorAll(".container");

// Add event listeners to each draggable item
draggableItems.forEach((draggable) => {
  // When drag starts
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("draggingItem");
    // Add additional visual feedback styles here
    draggable.style.opacity = "0.2";
  });

  // When drag ends
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("draggingItem");
    // Reset the visual feedback styles
    draggable.style.opacity = "";
  });
});

// Add event listeners to each container
containers.forEach((container) => {
  // When item is being dragged over the container
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    // Get the element after which the dragged item should be placed
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".draggingItem");
    // If there is no element after, append the dragged item to the container
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      // Otherwise, insert the dragged item before the element
      container.insertBefore(draggable, afterElement);
    }
  });
});

// Function to find the element after which the dragged item should be placed
function getDragAfterElement(container, y) {
  // Get all draggable items within the container, excluding the dragging item
  const draggableItems = [
    ...container.querySelectorAll(".draggableItem:not(.draggingItem)"),
  ];

  // Find the closest element based on the Y position
  return draggableItems.reduce(
    (closest, item) => {
      // Get the bounding rectangle of the item
      const box = item.getBoundingClientRect();
      // Calculate the offset of the current item from the dragged item
      const offset = y - box.top - box.height / 2;

      // Check if the current item is closer than the previously closest item
      if (offset < 0 && offset > closest.offset) {
        // If the offset is negative (above the middle), update the closest item
        return { offset: offset, element: item };
      } else {
        // If not closer, keep the previous closest item
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY } // Initialize with a large negative offset
  ).element;
}

// Add event listener to reset button for page reload
document.getElementsByClassName("resetBtn")[0].addEventListener("click", () => {
  location.reload();
});
