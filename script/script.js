// Global Variables:
let NumberOfQuestions = 10;
let SIGN = 0;
let FirstNumber = 1;
let SecondNumber = 1;
let ExpectedAnswer = 1;

function getRandomInt(min = 0, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSign() {
  if (SIGN == 0) return "\u002B";
  if (SIGN == 1) return "\u2212";
  if (SIGN == 2) return "\u00D7";
  if (SIGN == 3) return "\u2052";
  return "+";
}

function getHeading() {
  if (SIGN == 0) return "Addition";
  if (SIGN == 1) return "Subtraction";
  if (SIGN == 2) return "Multiplication";
  if (SIGN == 3) return "Division";
  return "+";
}

function setNumbers() {
  if (SIGN == 0) {
    FirstNumber = getRandomInt();
    SecondNumber = getRandomInt();
    ExpectedAnswer = FirstNumber + SecondNumber;
  }
  if (SIGN == 1) {
    FirstNumber = getRandomInt();
    SecondNumber = getRandomInt(0, FirstNumber);
    ExpectedAnswer = FirstNumber - SecondNumber;
  }
  if (SIGN == 2) {
    FirstNumber = getRandomInt();
    SecondNumber = getRandomInt(0, 10);
    ExpectedAnswer = FirstNumber * SecondNumber;
  }
  if (SIGN == 3) {
    SecondNumber = getRandomInt(2, 10);
    ExpectedAnswer = getRandomInt(1, 10);
    FirstNumber = SecondNumber * ExpectedAnswer;
  }
}

function generateTable(table) {
  let thead = table.createTHead();
  thead.innerHTML = "";

  for (let i = 0; i < NumberOfQuestions; ++i) {
    let row = thead.insertRow();

    setNumbers();

    let cell = row.insertCell();
    let text = document.createTextNode(i + 1 + ")");
    cell.appendChild(text);

    cell = row.insertCell();
    text = document.createTextNode(FirstNumber);
    cell.appendChild(text);

    cell = row.insertCell();
    text = document.createTextNode(getSign());
    cell.appendChild(text);

    cell = row.insertCell();
    text = document.createTextNode(SecondNumber);
    cell.appendChild(text);

    cell = row.insertCell();
    text = document.createTextNode("=");
    cell.appendChild(text);

    cell = row.insertCell();
    let input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Type your answer";
    input.className = "form-control";
    input.ExpectedAnswer = ExpectedAnswer;
    cell.appendChild(input);
  }
}

function validate() {
  console.log("Validating form");
  let table = document.querySelector("table");
  for (var i = 0; i < NumberOfQuestions; i++) {
    let actualAnswer = parseInt(table.rows[i].cells[5].children[0].value);
    let expectedAnswer = parseInt(
      table.rows[i].cells[5].children[0].ExpectedAnswer
    );

    if (actualAnswer == expectedAnswer) {
      table.rows[i].cells[5].children[0].classList.add("is-valid");
    } else {
      table.rows[i].cells[5].children[0].classList.add("is-invalid");
    }
    table.rows[i].cells[5].children[0].disabled = true;
  }
  document.getElementById("submit").disabled = true;
}

function setActiveNavBar() {
  document.getElementById("add").classList.remove("active");
  document.getElementById("sub").classList.remove("active");
  document.getElementById("mul").classList.remove("active");
  document.getElementById("div").classList.remove("active");

  if (SIGN == 0) document.getElementById("add").classList.add("active");
  if (SIGN == 1) document.getElementById("sub").classList.add("active");
  if (SIGN == 2) document.getElementById("mul").classList.add("active");
  if (SIGN == 3) document.getElementById("div").classList.add("active");
}

function init(sign = 0) {
  SIGN = sign;
  jumbotronHeading = document.getElementById("jumbotronHeading");
  if (jumbotronHeading != null) {
    jumbotronHeading.innerHTML = getHeading();
  }

  table = document.querySelector("table");
  generateTable(table);
  document.getElementById("submit").disabled = false;
  setActiveNavBar();
}

function reset() {
  init(SIGN);
}

function replaceClass(className, filename) {
  console.log(className);
  console.log(filename);
  const nav = document.querySelector(className);
  fetch(filename)
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      nav.innerHTML = data;
    });
}

replaceClass(".mynavbar", "/html/navbar.html");
replaceClass(".myjumbotron", "/html/jumbotron.html");
replaceClass(".myform", "/html/form.html");

init(0);
