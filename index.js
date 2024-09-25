let container = document.getElementById("container");

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
    updateElement.innerText = "Update";

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
