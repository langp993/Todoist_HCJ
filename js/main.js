let map;
let markers = [];
let activeList; // Store reference to the active list

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    // center: position,
    zoom: 8,
    mapId: "c32ddbe5496cadc0",
  });

  //   // Create a marker and set its position
  // var marker = new google.maps.AdvancedMarkerElement({
  var marker = new google.maps.Marker({
    position: { lat: -34.397, lng: 150.644 },
    map: map,
    title: "Uluru",
  });

  // Initialize Google Places Autocomplete for location input field
  const locationInput = document.getElementById("locationInput");
  const autocomplete = new google.maps.places.Autocomplete(locationInput);
  autocomplete.setFields(["geometry"]);

  // Set the active list to the default "todo" list
  activeList = document.getElementById("todoList");
}

// Function to add a new todo
function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const locationInput = document.getElementById("locationInput");
  // const dueDateInput = document.getElementById("dueDateInput");
  // const dueTimeInput = document.getElementById("dueTimeInput");
  const activeList = document.getElementById("todoList");

  // Get the value from the input field
  const todoText = todoInput.value.trim();
  const locationText = locationInput.value.trim();
  // const dueDate = dueDateInput.value;
  // const dueTime = dueTimeInput.value;

  // If the input is not empty
  if (todoText !== "" && locationText !== "") {
    // Use Geocoding service to convert address to coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: locationText }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        const formattedAddress = results[0].formatted_address;

        // Use Place Details service to retrieve additional information, including opening hours
        const placeId = results[0].place_id;
        const service = new google.maps.places.PlacesService(
          document.createElement("div")
        );
        service.getDetails(
          { placeId: placeId },
          function (placeResult, placeStatus) {
            if (placeStatus === google.maps.places.PlacesServiceStatus.OK) {
              const openingHours = placeResult.opening_hours;
              const placeStatusText = getPlaceStatus(openingHours);
              const phoneNumber = placeResult.formatted_phone_number || ""; // Get phone number or empty string if not available

              // Create a new list item
              const listItem = document.createElement("li");
              // Add a class to the list item
              listItem.classList.add("todo-item");

              // Create a span element for the todo text
              const todoSpan = document.createElement("span");
              // todoSpan.textContent = todoText;
              todoSpan.textContent = `Todo: ${todoText}`;
              // todoSpan.textContent = `${todoText} (${placeStatusText})`;
              // Apply styles
              todoSpan.style.fontWeight = "bold"; // Example style
              todoSpan.style.fontSize = "25px"; // Example style
              todoSpan.style.color = "black"; // Change font color to red

              // Apply styles directly using the style property
              todoSpan.style.backgroundColor = "none";
              todoSpan.style.padding = "0px";
              todoSpan.style.width = "100%";
              todoSpan.style.margin = "0px"; // Add margin to create space between todo text and location text
              todoSpan.style.display = "block"; // Display as block element to prevent overlapping
              todoSpan.style.fontWeight = "bold"; // Make the text bold

              // Create a span element for the location details (name and address)
              const placeName = placeResult.name; // Get the name of the place
              const addressSpan = document.createElement("span");
              addressSpan.textContent = `Location: ${placeName}, ${formattedAddress}, Status: ${placeStatusText}`;
              // Append the location span to the list item
              listItem.appendChild(addressSpan);

              // Apply styles directly using the style property
              addressSpan.style.backgroundColor = "none";
              addressSpan.style.padding = "0px";
              // addressSpan.style.margin = "5px 0px";
              addressSpan.style.width = "100%";
              addressSpan.style.margin = "0px"; // Add margin to create space between todo text and location text
              addressSpan.style.display = "block"; // Display as block element to prevent overlapping
              // addressSpan.style.fontWeight = "bold"; // Make the text bold
              addressSpan.style.fontSize = "20px"; // Example style
              addressSpan.style.color = "black"; // Change font color to red
              // // Create a span element for the due date and time
              // const dueDateTimeSpan = document.createElement("span");
              // dueDateTimeSpan.textContent = `Due Date & Time: ${dueDate} ${dueTime}`;
              // listItem.appendChild(dueDateTimeSpan);

              // // Apply styles directly using the style property
              // dueDateTimeSpan.style.backgroundColor = "yellow";
              // dueDateTimeSpan.style.padding = "0px";
              // dueDateTimeSpan.style.margin = "0px";
              // dueDateTimeSpan.style.width = "70%";

              // Create a div to contain the buttons
              const buttonsDiv = document.createElement("div");
              buttonsDiv.classList.add("my-button-container");

              // Create a div to contain the opening hours span
              const openingHoursDiv = document.createElement("div");
              openingHoursDiv.style.display = "flex"; // Set display to flex
              openingHoursDiv.style.flexDirection = "column"; // Stack elements vertically
              openingHoursDiv.style.alignItems = "center"; // Center content horizontally
              // Create a span element for the opening hours
              const openingHoursSpan = document.createElement("span");
              openingHoursSpan.innerHTML =
                "Opening Hours: <br><br>" +
                (openingHours
                  ? openingHours.weekday_text.join("<br>")
                  : "Not available");
              openingHoursSpan.style.display = "none"; // Initially hide opening hours

              // Apply styles directly using the style property
              openingHoursSpan.style.backgroundColor = "lightgrey";
              openingHoursSpan.style.boxShadow =
                "0px 0px 4px rgba(0, 0, 0, 0.5)";
              // openingHoursSpan.style.borderRadius = "10px"; // Adjust the value as needed
              openingHoursSpan.style.padding = "0px";
              openingHoursDiv.style.boxSizing = "border-box";
              // openingHoursSpan.style.margin = "5px 0px";
              openingHoursSpan.style.width = "100%";

              // Append the opening hours span to the div
              openingHoursDiv.appendChild(openingHoursSpan);

              // Append the div to the list item
              listItem.appendChild(openingHoursDiv);

              // Create a button for showing/hiding opening hours
              const hoursButton = document.createElement("button");
              hoursButton.classList.add("hoursButton");

              // hoursButton.textContent = "Show/Hide Open Hours";
              hoursButton.innerHTML = `<img src="/images/stillon.jpg" alt="Show/Hide Open Hours" style="width: 40px; height: 40px;">`;
              hoursButton.style.width = "60px";
              hoursButton.style.height = "60px";

              hoursButton.onclick = function () {
                console.log("task display", openingHoursSpan.style.display);
                openingHoursSpan.style.display =
                  openingHoursSpan.style.display === "none" ? "block" : "none";
              };

              // Create a button for calling the place
              const callButton = document.createElement("button");
              // callButton.textContent = "Call Place";
              callButton.innerHTML = `<img src="/images/phonered.png" alt="Show/Hide Open Hours" style="width: 40px; height: 40px;">`;
              callButton.classList.add("callButton");

              callButton.style.width = "60px";
              callButton.style.height = "60px";

              callButton.onclick = function () {
                if (phoneNumber) {
                  window.open(`tel:${phoneNumber}`); // Open phone app with place's phone number
                } else {
                  alert("Phone number not available for this place.");
                }
              };

              // Create a button for getting directions
              const directionsButton = document.createElement("button");
              // directionsButton.textContent = "Get Directions";
              directionsButton.classList.add("directionsButton");

              directionsButton.innerHTML = `<img src="/images/directions.png" alt="Show/Hide Open Hours" style="width: 40px; height: 40px;">`;
              directionsButton.style.width = "60px";
              directionsButton.style.height = "60px";

              directionsButton.onclick = function () {
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                    encodeURIComponent(formattedAddress)
                );
              };

              // Append buttons to the div
              buttonsDiv.appendChild(hoursButton);
              buttonsDiv.appendChild(callButton);
              buttonsDiv.appendChild(directionsButton);

              // Append the buttonsDiv to the listItem
              listItem.appendChild(buttonsDiv);

              // // Create a span element for the place status
              const statusSpan = document.createElement("span");
              statusSpan.textContent = "Status: " + placeStatusText;
              // Apply green color for "Open" status
              statusSpan.style.color =
                placeStatusText === "Open"
                  ? "green"
                  : placeStatusText === "Closed"
                  ? "red"
                  : "inherit";

              // Create a button for deleting the todo
              const deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete Task";
              // deleteButton.textContent = "DELETE ❌";

              deleteButton.classList.add("deleteButton");
              deleteButton.style.backgroundColor = "red";
              // deleteButton.style.position = "absolute";
              deleteButton.style.top = "0"; // Align to the top of the parent element
              deleteButton.style.right = "0"; // Align to the right of the parent element
              deleteButton.style.height = "45px"; // Add margin to create space between the button and the edges
              deleteButton.style.margin = "20px 0px 0px 0px"; // Add margin to create space between the button and the edges
              deleteButton.style.width = "100%";
              // deleteButton.style.borderRadius = "30px"; // Change font color to red

              deleteButton.onclick = function () {
                listItem.parentElement.removeChild(listItem);
                removeMarker(formattedAddress);
              };

              // Create a button for deleting the todo
              const completeButton = document.createElement("button");
              completeButton.textContent = "Complete Task";
              completeButton.className = "complete-button"; // Add CSS class to the button

              // // Create a button for adding subtask
              const subtaskButton = document.createElement("button");
              subtaskButton.textContent = "Add Subtask +";
              subtaskButton.className = "subtask-button"; // Add CSS class to the button
              subtaskButton.style.width = "100%";
              // subtaskButton.style.borderRadius = "30px"; // Change font color to red

              // Set styles for positioning the subtask button
              subtaskButton.style.margin = "0px"; // Add margin to the left of the subtask button
              // subtaskButton.style.border = "none"; // Removes default button border

              subtaskButton.onclick = function () {
                const subtaskText = prompt("Enter subtask:");
                if (subtaskText) {
                  const subtaskListItem = document.createElement("li");
                  const subtaskSpan = document.createElement("span");
                  subtaskSpan.textContent = subtaskText;
                  subtaskListItem.appendChild(subtaskSpan);
                  subtaskListItem.classList.add("subtask"); // Add class to subtask
                  listItem.appendChild(subtaskListItem);
                }
              };

              // Get photos of the place
              // if (placeResult.photos && placeResult.photos.length > 0) {
              //   const photo = placeResult.photos[0]; // Get the first photo
              //   const photoUrl = photo.getUrl({
              //     maxWidth: 300,
              //     maxHeight: 200,
              //   });
              //   const photoImg = document.createElement("img");
              //   photoImg.src = photoUrl;
              //   photoImg.alt = "Place Photo";
              //   listItem.appendChild(photoImg);
              // } else {
              //   // If no photos available, display a placeholder image
              //   const placeholderImg = document.createElement("img");
              //   placeholderImg.src = "placeholder.jpg"; // Provide URL to placeholder image
              //   placeholderImg.alt = "Placeholder";
              //   listItem.appendChild(placeholderImg);
              // }

              // Append the todo text, delete button, and subtask button to the list item
              listItem.appendChild(todoSpan);
              listItem.appendChild(document.createElement("br")); // Add line break
              listItem.appendChild(addressSpan);
              // listItem.appendChild(document.createElement("br"));
              // listItem.appendChild(statusSpan);
              // listItem.appendChild(document.createElement("br"));
              // listItem.appendChild(dueDateTimeSpan);
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(subtaskButton);
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(deleteButton);
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(completeButton);

              completeButton.addEventListener("click", () => {
                if (activeList.contains(listItem)) {
                  activeList.removeChild(listItem);
                  completedList.appendChild(listItem);
                  completeButton.textContent = "Undo Complete Task"; // Change button text to "Uncomplete"
                } else {
                  completedList.removeChild(listItem);
                  activeList.appendChild(listItem);
                  completeButton.textContent = "Complete Task"; // Change button text back to "Completed"
                }
                listItem.classList.toggle("completed");
              });

              // Add the list item to the active list
              activeList.appendChild(listItem);

              // Clear the input fields
              todoInput.value = "";
              locationInput.value = "";
              // dueDateInput.value = "";
              // dueTimeInput.value = "";

              // Calculate time until due date and time
              const dueDateTime = new Date(`${dueDate}T${dueTime}`);
              const now = new Date();

              // Set timeout for due date and time
              if (dueDateTime > now) {
                const timeUntilDue = dueDateTime - now;
                setTimeout(function () {
                  alert(`Reminder: Task "${todoText}" is due now!`);
                }, timeUntilDue);
              } else {
                // alert(`Reminder: Task "${todoText}" is already overdue!`);
              }
            } else {
              alert("Failed to fetch place details: " + placeStatus);
            }
          }
        );
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

function getPlaceStatus(openingHours) {
  if (!openingHours || !openingHours.periods) {
    return "Not available";
  }

  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  const todayHours = openingHours.periods[dayOfWeek];
  if (!todayHours) {
    return "Not available";
  }

  if (
    todayHours.close &&
    currentTime >= todayHours.open.time &&
    currentTime < todayHours.close.time
  ) {
    return "Open";
  } else {
    return "Closed";
  }
}

// Function to show active list
function showActive() {
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  // const groupList = document.getElementById("groupList");

  const todoListHeader = document.getElementById("activeButton");
  const completedListHeader = document.getElementById("completedButton");

  todoList.style.display = "block";
  completedList.style.display = "none";
  // groupList.style.display = "block";

  //Board Display details
  createTask.style.display = "block";

  todoListHeader.classList.add("active-header");
  completedListHeader.classList.remove("active-header");
}

// Function to show completed list
function showCompleted() {
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  // const groupList = document.getElementById("groupList");

  const todoListHeader = document.getElementById("activeButton");
  const completedListHeader = document.getElementById("completedButton");

  //Unordered List Display details
  todoList.style.display = "none";
  completedList.style.display = "block";
  // groupList.style.display = "block";

  //Board Display details //
  createTask.style.display = "block";

  todoListHeader.classList.remove("active-header");
  completedListHeader.classList.add("active-header");
}

// Call showActive() when the page is loaded
window.onload = showActive;

// Function to show completed list
function switchToListGroup() {
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  // const groupList = document.getElementById("groupList");
  const createTask = document.getElementById("createTask");

  const todoListHeader = document.getElementById("activeButton");
  const completedListHeader = document.getElementById("completedButton");

  //Unordered List Display details
  todoList.style.display = "none";
  completedList.style.display = "none";
  // groupList.style.display = "block";

  //Board Display details //
  createTask.style.display = "none";

  completedListHeader.classList.add("active-header");
  todoListHeader.classList.remove("active-header");
}

// // Function to switch to "todo" list
// function switchToListTodo() {
//   activeList = document.getElementById("activeList");
// }

// // Function to switch to "group" list
// function switchToListGroup() {
//   activeList = document.getElementById("groupList");
//   // activeList.style.display = "none";
// }
