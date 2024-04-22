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
              // todoSpan.textContent = todoText;
              todoSpan.textContent = `Todo: ${todoText}`;
              // todoSpan.textContent = `${todoText} (${placeStatusText})`;

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
              addressSpan.style.fontWeight = "bold"; // Make the text bold

              // Create logo elements
              // const todoLogo = document.createElement("img");
              // todoLogo.src = "images/todoicon.png"; // Set the source of the todo logo image
              // todoLogo.alt = "Todo Logo"; // Set alt text for accessibility
              // todoLogo.style.width = "26px"; // Match the font size of the text
              // todoLogo.style.height = "26px"; // Match the font size of the text
              // todoLogo.style.float = "left"; // Position the logo on the left
              // todoLogo.style.marginRight = "5px"; // Adjust margin as needed

              // const locationLogo = document.createElement("img");
              // locationLogo.src = "images/locationicon.png"; // Set the source of the location logo image
              // locationLogo.alt = "Location Logo"; // Set alt text for accessibility
              // locationLogo.style.width = "26px"; // Match the font size of the text
              // locationLogo.style.height = "26px"; // Match the font size of the text
              // locationLogo.style.float = "left"; // Position the logo on the left
              // locationLogo.style.marginRight = "5px"; // Adjust margin as needed

              // Append the logos to their respective spans
              // todoSpan.appendChild(todoLogo);
              // addressSpan.appendChild(locationLogo);

              // // Create a span element for the due date and time
              // const dueDateTimeSpan = document.createElement("span");
              // dueDateTimeSpan.textContent = `Due Date & Time: ${dueDate} ${dueTime}`;
              // listItem.appendChild(dueDateTimeSpan);

              // // Apply styles directly using the style property
              // dueDateTimeSpan.style.backgroundColor = "yellow";
              // dueDateTimeSpan.style.padding = "0px";
              // dueDateTimeSpan.style.margin = "0px";
              // dueDateTimeSpan.style.width = "70%";

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
              openingHoursSpan.style.margin = "5px 0px";
              openingHoursSpan.style.width = "100%";

              // Append the opening hours span to the div
              openingHoursDiv.appendChild(openingHoursSpan);

              // Append the div to the list item
              listItem.appendChild(openingHoursDiv);

              // Create a button for showing/hiding opening hours
              const hoursButton = document.createElement("button");
              hoursButton.textContent = "Show/Hide Open Hours";
              // hoursButton.style.backgroundColor = "green";
              hoursButton.style.width = "100%";
              // hoursButton.style.display = "flex";
              // hoursButton.style.flexDirection = "row";
              hoursButton.style.margin = "5px 0px";

              hoursButton.onclick = function () {
                openingHoursSpan.style.display =
                  openingHoursSpan.style.display === "none" ? "block" : "none";
              };

              // Create a button for calling the place
              const callButton = document.createElement("button");
              callButton.textContent = "Call Place";
              // callButton.style.backgroundColor = "orange";
              callButton.style.width = "100%";
              // callButton.style.marginRight = "5px"; // Add right margin to create space between buttons
              // callButton.style.display = "flex";
              // callButton.style.flexDirection = "row";
              callButton.style.margin = "0px";

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
              // directionsButton.style.backgroundColor = "orange";
              directionsButton.style.width = "100%";
              // directionsButton.style.display = "flex";
              // directionsButton.style.flexDirection = "row";
              directionsButton.style.margin = "5px 0px";

              directionsButton.onclick = function () {
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                    encodeURIComponent(formattedAddress)
                );
              };

              // Create a div to contain the buttons
              const buttonsDiv = document.createElement("div");
              // buttonsDiv.style.display = "flex"; // Set display to flex to lay out children in a row
              // buttonsDiv.style.marginTop = "10px"; // Add top margin to the buttons container
              // You can also assign a class name to the element
              // buttonsDiv.className = "my-button-container";
              // buttonsDiv.classList.add("my-button-container");
              // Apply styles directly to the element

              // buttonsDiv.style.backgroundColor = "pink";
              // buttonsDiv.style.color = "black";
              // buttonsDiv.style.paddingTop = "10px";
              // buttonsDiv.style.margin = "50px";
              // buttonsDiv.style.height = "150px";

              // Append buttons to the div
              buttonsDiv.appendChild(hoursButton);
              buttonsDiv.appendChild(callButton);
              buttonsDiv.appendChild(directionsButton);

              // Append the buttonsDiv to the listItem
              listItem.appendChild(buttonsDiv);

              // // Append the div to the document body or any other container element
              // document.body.appendChild(buttonsDiv);

              // // Find the UL element where you want to append the buttonsDiv
              // const ulElement = document.getElementById("todoList");

              // // Append the buttonsDiv to the UL element
              // ulElement.appendChild(buttonsDiv);

              // // Create a span element for the place status
              // const statusSpan = document.createElement("span");
              // statusSpan.textContent = "Status: " + placeStatusText;
              // // Apply green color for "Open" status
              // statusSpan.style.color =
              //   placeStatusText === "Open"
              //     ? "green"
              //     : placeStatusText === "Closed"
              //     ? "red"
              //     : "inherit";

              // // Apply styles directly using the style property
              // statusSpan.style.backgroundColor = "white";
              // statusSpan.style.padding = "10px";
              // statusSpan.style.margin = "0px";
              // statusSpan.style.width = "70%";

              // Create a button for deleting the todo
              const deleteButton = document.createElement("button");
              deleteButton.textContent = "DELETE ❌";
              // deleteButton.className = "deleteButton"; // Add CSS class to the button

              deleteButton.style.backgroundColor = "grey";
              // deleteButton.style.position = "absolute";
              deleteButton.style.top = "0"; // Align to the top of the parent element
              deleteButton.style.right = "0"; // Align to the right of the parent element
              deleteButton.style.margin = "5px 0px 0px 0px"; // Add margin to create space between the button and the edges
              deleteButton.style.width = "100%";
              // deleteButton.style.height = "40px";

              deleteButton.onclick = function () {
                listItem.parentElement.removeChild(listItem);
                removeMarker(formattedAddress);
              };

              // // Create a button for adding subtask
              const subtaskButton = document.createElement("button");
              subtaskButton.textContent = "Add Subtask +";
              subtaskButton.className = "subtask-button"; // Add CSS class to the button
              subtaskButton.style.width = "100%";

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
              // listItem.appendChild(locationSpan);
              listItem.appendChild(addressSpan);
              // listItem.appendChild(document.createElement("br"));
              // listItem.appendChild(statusSpan);
              // listItem.appendChild(document.createElement("br"));
              // listItem.appendChild(dueDateTimeSpan);
              listItem.appendChild(document.createElement("br")); // Add line break
              listItem.appendChild(openingHoursSpan);
              listItem.appendChild(hoursButton);
              listItem.appendChild(document.createElement("br")); // Add line break
              listItem.appendChild(callButton); // Add call button
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(directionsButton);
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(subtaskButton);
              listItem.appendChild(document.createElement("br")); // Add line break // Add line break
              listItem.appendChild(deleteButton);

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
