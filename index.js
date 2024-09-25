let container = document.getElementById("container");
let createButton = document.getElementById("create");

let server = "https://reqres.in/api/users?page=2";
let dataArray = [];

// function getData() {
//   let request = fetch(server);

//   request
//     .then((response) => {
//       let jsonResponsePromise = response.json();

//       jsonResponsePromise
//         .then((json) => {
//           dataArray = json.data;
//           createElement(dataArray);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

async function getData() {
  try {
    let request = await fetch(server);
    let json = await request.json();

    dataArray = json.data;
    // console.log(dataArray);
    createElement(dataArray);
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", getData);

// || && ??

// ?? -> it would check for null or undefined
// if the left value is from one of the above things,  return the right value
// or the left

createButton.addEventListener("click", function () {
  let name = prompt("What should be the name?") ?? "default name";
  let emailInput = prompt("What should be the email?") ?? "default email";

  let newObject = {
    first_name: name,
    email: emailInput,
  };

  //   Object.first_name

  dataArray.push(newObject);

  createElement(dataArray);
});

function deleteFunction(event) {
  let currentId = event.target.id; // index value of the array (dataArray)

  let newArray = dataArray.filter((element, index) => {
    if (index == currentId) {
      return false; // not add that element to the newly created array
    } else {
      return true; // it is added to it
    }
  });

  dataArray = newArray;
  createElement(dataArray);
}

function updateFunction(event) {
  let value = prompt("What to update in name?");
  //   let value2 = prompt("What to update in email?");

  let currentId = event.target.id; // index value of the array (dataArray)

  console.log(currentId);

  let newArray = dataArray.map((element, index) => {
    // if the element matches
    if (index == currentId) {
      if (value != null) {
        element.first_name = value;
        // element.email = value2;
      } else {
        element.first_name += " 1";
      }
    }

    return element;
  });

  console.log(newArray);
  dataArray = newArray;
  createElement(dataArray);
}

function createElement(inputArray) {
  //   inputArray = [{}, {}, {}];

  container.innerHTML = ""; // reset or make it empty

  inputArray.forEach(function callback(currentElement, index) {
    let userContainer = document.createElement("div");
    userContainer.style.border = "1px solid black";
    userContainer.style.marginBottom = "2rem";

    // <h1>Michael</h1>
    let nameElement = document.createElement("h2");
    nameElement.innerText = currentElement.first_name;

    let emailElement = document.createElement("h3");
    emailElement.innerText = currentElement.email;

    let updateElement = document.createElement("button");
    updateElement.setAttribute("id", index);
    updateElement.innerText = "Update " + (index + 1);
    updateElement.addEventListener("click", updateFunction);

    let deleteElement = document.createElement("button");
    deleteElement.setAttribute("id", index); // uniquely identify and delete from the array
    deleteElement.innerText = "Delete " + (index + 1);
    deleteElement.addEventListener("click", deleteFunction);

    userContainer.append(
      nameElement,
      emailElement,
      updateElement,
      deleteElement
    );
    container.appendChild(userContainer);
  });
}
