///!SECTION (CGP) TODOLIST

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
  const dueDateInput = document.getElementById("dueDateInput");
  const dueTimeInput = document.getElementById("dueTimeInput");
  const activeList = document.getElementById("todoList");

  // Get the value from the input field
  const todoText = todoInput.value.trim();
  const locationText = locationInput.value.trim();
  const dueDate = dueDateInput.value;
  const dueTime = dueTimeInput.value;

  // // If the input is not empty
  // if (todoText !== "" && locationText !== "") {
  //   // Use Geocoding service to convert address to coordinates
  //   const geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ address: locationText }, function (results, status) {
  //     if (status === google.maps.GeocoderStatus.OK && results[0]) {
  //       const lat = results[0].geometry.location.lat();
  //       const lng = results[0].geometry.location.lng();

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

              // Create a span element for the todo text
              const todoSpan = document.createElement("span");
              todoSpan.textContent = todoText;

              // // Create a span element for the location text
              // const locationSpan = document.createElement("span");
              // // locationSpan.textContent = locationText;
              // locationSpan.textContent = `Location: (${lat}, ${lng})`;

              // // Create a span element for the location address
              // const addressSpan = document.createElement("span");
              // addressSpan.textContent = "Location: " + formattedAddress;

              // Create a span element for the due date and time
              const dueDateTimeSpan = document.createElement("span");
              dueDateTimeSpan.textContent = `Due Date & Time: ${dueDate} ${dueTime}`;
              listItem.appendChild(dueDateTimeSpan);

              // Create a span element for the location details (name and address)
              const placeName = placeResult.name; // Get the name of the place
              const addressSpan = document.createElement("span");
              addressSpan.textContent = `Location: ${placeName}, ${formattedAddress}`;
              // Append the location span to the list item
              listItem.appendChild(addressSpan);

              // Create a span element for the opening hours
              const openingHoursSpan = document.createElement("span");
              openingHoursSpan.textContent =
                "Opening Hours: " +
                (openingHours
                  ? openingHours.weekday_text.join(", ")
                  : "Not available");
              openingHoursSpan.style.display = "none"; // Initially hide opening hours

              // Create a div to contain the buttons
              const buttonsDiv = document.createElement("div");
              buttonsDiv.id = "google-button-container"; // Adding an ID to the div

              // Create a button for showing/hiding opening hours
              const hoursButton = document.createElement("button");
              hoursButton.textContent = "Show/Hide Hours";
              hoursButton.onclick = function () {
                openingHoursSpan.style.display =
                  openingHoursSpan.style.display === "none" ? "block" : "none";
              };

              // Create a button for calling the place
              const callButton = document.createElement("button");
              callButton.textContent = "Call Place";
              callButton.onclick = function () {
                if (phoneNumber) {
                  window.open(`tel:${phoneNumber}`); // Open phone app with place's phone number
                } else {
                  alert("Phone number not available for this place.");
                }
              };

              // Create a button for getting directions
              const directionsButton = document.createElement("button");
              directionsButton.textContent = "Get Directions";
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

              // Append the div to the document body or any other container element
              document.body.appendChild(buttonsDiv);

              // Create a span element for the place status
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
              deleteButton.textContent = "❌";

              // Set styles for positioning the delete button
              // deleteButton.style.marginLeft = "auto"; // Pushes the button to the right
              // deleteButton.style.border = "none"; // Removes default button border

              // deleteButton.onclick = function () {
              //   listItem.parentElement.removeChild(listItem);
              //   removeMarker(lat, lng);
              // };

              deleteButton.onclick = function () {
                listItem.parentElement.removeChild(listItem);
                removeMarker(formattedAddress);
              };

              // // Create a button for adding subtask
              const subtaskButton = document.createElement("button");
              subtaskButton.textContent = "+";
              subtaskButton.className = "subtask-button"; // Add CSS class to the button

              // Set styles for positioning the subtask button
              // subtaskButton.style.marginLeft = "5px"; // Add margin to the left of the subtask button
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
              //     maxWidth: 400,
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
              // listItem.appendChild(locationSpan);
              listItem.appendChild(addressSpan);
              listItem.appendChild(document.createElement("br"));
              listItem.appendChild(statusSpan);
              listItem.appendChild(document.createElement("br"));
              listItem.appendChild(dueDateTimeSpan);
              listItem.appendChild(document.createElement("br")); // Add line break
              listItem.appendChild(openingHoursSpan);
              listItem.appendChild(hoursButton);
              listItem.appendChild(document.createElement("br")); // Add line break
              listItem.appendChild(callButton); // Add call button
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(directionsButton);
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(deleteButton);
              listItem.appendChild(subtaskButton);

              // Add event listener to toggle line-through and move to completed list on click
              listItem.addEventListener("click", function (event) {
                // Check if the clicked element is not a subtask item
                if (
                  !event.target.closest(".subtask-button") &&
                  event.target !== hoursButton &&
                  event.target !== callButton &&
                  event.target !== directionsButton
                ) {
                  if (activeList.contains(listItem)) {
                    activeList.removeChild(listItem);
                    completedList.appendChild(listItem);
                  } else {
                    completedList.removeChild(listItem);
                    activeList.appendChild(listItem);
                  }
                  listItem.classList.toggle("completed");
                }
              });

              // Add the list item to the active list
              activeList.appendChild(listItem);

              // Clear the input fields
              todoInput.value = "";
              locationInput.value = "";
              dueDateInput.value = "";
              dueTimeInput.value = "";

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
                alert(`Reminder: Task "${todoText}" is already overdue!`);
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
  const groupList = document.getElementById("groupList");
  // const groupParagraph = document.getElementById("groupParagraph");

  todoList.style.display = "block";
  completedList.style.display = "none";
  groupList.style.display = "block";
  // groupParagraph.style.display = "none";

  //Board Display details
  createTask.style.display = "block";
}

// Function to show completed list
function showCompleted() {
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  const groupList = document.getElementById("groupList");

  //Unordered List Display details
  todoList.style.display = "none";
  completedList.style.display = "block";
  groupList.style.display = "block";

  //Board Display details //
  createTask.style.display = "block";
}

// Function to show completed list
function switchToListGroup() {
  const todoList = document.getElementById("todoList");
  const completedList = document.getElementById("completedList");
  const groupList = document.getElementById("groupList");
  const createTask = document.getElementById("createTask");

  // const groupParagraph = document.getElementById("groupParagraph");

  //Unordered List Display details
  todoList.style.display = "none";
  completedList.style.display = "none";
  groupList.style.display = "block";
  // groupParagraph.style.display = "block";

  //Board Display details //
  createTask.style.display = "none";
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
