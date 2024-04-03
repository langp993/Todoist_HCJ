// import "./main.css";

// function myFunction() {
//   document.getElementById("demo").innerHTML = "Paragraph changed.";
// }

console.log("hello");

///!SECTION TO DO LIST APP

// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function () {
//     var div = this.parentElement;
//     div.style.display = "none";
//   };
// }

// // Add a "checked" symbol when clicking on a list item
// var list = document.querySelector("ul");
// list.addEventListener(
//   "click",
//   function (ev) {
//     if (ev.target.tagName === "LI") {
//       ev.target.classList.toggle("checked");
//     }
//   },
//   false
// );

// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === "") {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function () {
//       var div = this.parentElement;
//       div.style.display = "none";
//     };
//   }
// }

///!SECTION CHATGPT TODOLIST

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

// Function to add a new todo
function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const locationInput = document.getElementById("locationInput");
  const activeList = document.getElementById("activeList");

  // Get the value from the input field
  const todoText = todoInput.value.trim();
  const locationText = locationInput.value.trim();

  // If the input is not empty
  if (todoText !== "" && locationText !== "") {
    // Create a new list item
    const listItem = document.createElement("li");

    // Create a span element for the todo text
    const todoSpan = document.createElement("span");
    todoSpan.textContent = todoText;

    // Create a span element for the location text
    const locationSpan = document.createElement("span");
    locationSpan.textContent = locationText;

    // Create a button for deleting the todo
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";

    // Set styles for positioning the delete button
    deleteButton.style.marginLeft = "auto"; // Pushes the button to the right
    deleteButton.style.border = "none"; // Removes default button border

    deleteButton.onclick = function () {
      listItem.parentElement.removeChild(listItem);
    };

    // // Create a button for adding subtask
    // const subtaskButton = document.createElement("button");
    // subtaskButton.textContent = "+";

    // // Set styles for positioning the subtask button
    // subtaskButton.style.marginLeft = "5px"; // Add margin to the left of the subtask button
    // subtaskButton.style.border = "none"; // Removes default button border

    // subtaskButton.onclick = function () {
    //   const subtaskText = prompt("Enter subtask:");
    //   if (subtaskText) {
    //     const subtaskListItem = document.createElement("li");
    //     const subtaskSpan = document.createElement("span");
    //     subtaskSpan.textContent = subtaskText;
    //     subtaskListItem.appendChild(subtaskSpan);
    //     listItem.appendChild(subtaskListItem);
    //   }
    // };

    // Append the todo text, delete button, and subtask button to the list item
    listItem.appendChild(todoSpan);
    listItem.appendChild(document.createElement("br")); // Add line break
    listItem.appendChild(locationSpan);
    listItem.appendChild(deleteButton);
    // listItem.appendChild(subtaskButton);

    // Add event listener to toggle line-through and move to completed list on click
    listItem.addEventListener("click", function () {
      if (activeList.contains(listItem)) {
        activeList.removeChild(listItem);
        completedList.appendChild(listItem);
      } else {
        completedList.removeChild(listItem);
        activeList.appendChild(listItem);
      }
      listItem.classList.toggle("completed");
    });

    // Add the list item to the active list
    activeList.appendChild(listItem);

    // Clear the input fields
    todoInput.value = "";
    locationInput.value = "";
  }
}

// Function to show active list
function showActive() {
  const activeList = document.getElementById("activeList");
  const completedList = document.getElementById("completedList");

  activeList.style.display = "block";
  completedList.style.display = "none";
}

// Function to show completed list
function showCompleted() {
  const activeList = document.getElementById("activeList");
  const completedList = document.getElementById("completedList");

  activeList.style.display = "none";
  completedList.style.display = "block";
}

////////!SECTION RAUL CODE

//write a function that takes an array of colors as parameter, and print every color in the console

// function getColors(colorArray) {
//   console.log("colors", colorArray);
//   for (i = 0; i < colorArray.length; i++) {
//     console.log(colorArray[i]);
//   }
// }
// getColors(["yellow", "green"]);
// // var Colors = ["yellow", "purple"];
// // getColors();

function printColors(colorsArray) {
  console.log("colorsArray", colorsArray);
  for (i = 0; i < colorsArray.length; i++) {
    console.log(colorsArray[i]);
  }
}
var colors = ["blue", "orange"];
var colors2 = ["purple", "red"];
printColors(colors);
printColors(colors2);
printColors(2);

//1st write \funtion
//2. send an array to the function
//3. write a loop
//4. print out every color

function myFunction(colors) {
  //   console.log("function works");
  console.log("colors", colors);
  //   for (let i = 0; i < colors.length; i++) {
  //     console.log(colors[i]);
  //   }
}

myFunction(["white", "blue"]);

// Define Julia's age
var juliaAge = 32;

// Define your age
var yourAge = 31; // Replace YOUR_AGE with your actual age

// Calculate age difference
var ageDiff = yourAge - juliaAge;

// Print the age difference
console.log("Your age difference with Julia is:", ageDiff);

////////!SECTION Execrcise 4

if (yourAge <= 21) {
  console.log("your younger");
} else {
  console.log("your older");
}

////////!SECTION Execrcise 5

// Compare your age with Julia's age
if (yourAge > juliaAge) {
  console.log("Julia is younger than you");
} else if (yourAge < juliaAge) {
  console.log("Julia is older than you");
} else {
  console.log("You have the same age as Julia");
}

////////!SECTION Javascript Arrays Exercise 6

// Array containing all the names
const classNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Emily",
  "MentorA",
  "MentorB",
];

// Print the first element
console.log("First element:", classNames[0]);

// Print the last element
console.log("Last element:", classNames[classNames.length - 1]);

// Print all elements using a for loop
console.log("All elements:");
for (let i = 0; i < classNames.length; i++) {
  console.log(classNames[i]);
}

////////!SECTION Looping over an Array Exercise 8

// Array containing ages of students
var ages = [20, 22, 25, 18, 21, 19, 24];

// Initialize a variable to store the sum
let sum = 0;

// Iterate through the array and accumulate the sum
for (let i = 0; i < ages.length; i++) {
  sum += ages[i];
}

// Print the sum
console.log("The sum of all ages is:", sum);

////////!SECTION DOM Manipulation Exercise 27

// Define a function to list favorite bands
function myBandList() {
  // Array of favorite bands
  var bands = [
    "Led Zeppelin",
    "The Beatles",
    "Pink Floyd",
    "Queen",
    "The Rolling Stones",
  ];

  // Get the ul element by its ID
  var bandList = document.getElementById("band-list");

  // Loop through the array of bands
  for (var i = 0; i < bands.length; i++) {
    // Create a new list item
    var listItem = document.createElement("li");

    // Set the text content of the list item to the current band
    listItem.textContent = bands[i];

    // Append the list item to the unordered list
    bandList.appendChild(listItem);
  }
}

// Call the function to list favorite bands
myBandList();
