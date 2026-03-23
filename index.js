const form = document.getElementById("number-form");
const quantityOfNumbers = document.getElementById("quantity");
const startNumber = document.getElementById("startNumber");
const endNumber = document.getElementById("endNumber");
const repeatNumber = document.getElementById("noRepeat");
const statusMessage = document.getElementById("statusMessage");
const btnSubmit = document.querySelector(".form__button-primary");

const uniqueNumbers = (quantity, min, max) => {
  const result = [];
  let number;

  min = Math.ceil(min);
  max = Math.floor(max);

  while (result.length < quantity) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;

    let exists = false;

    for (let j = 0; j < result.length; j++) {
      if (number === result[j]) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      result.push(number);
    }
  }

  return result;
};

const sortedNumbers = (quantity, min, max) => {
  const result = [];

  let number;

  min = Math.ceil(min);
  max = Math.floor(max);

  for (let i = 0; i < quantity; i++) {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
    result.push(number);
  }

  return result;
};

form.addEventListener("submit", (e) => {
  // O submit acontece na TAG form e não no botão
  e.preventDefault();

  // Válida se os campos estão vazios ou não
  const emptyFields = (hasEmpty) => {
    statusMessage.textContent = "";

    if (hasEmpty) {
      statusMessage.setAttribute("role", "alert");
      statusMessage.textContent =
        "Erro - Todos os campos precisam ser preenchidos!";

      setTimeout(function () {
        statusMessage.textContent = "";
        statusMessage.setAttribute("role", "status");
      }, 3000);

      return false;
    }

    statusMessage.setAttribute("role", "status");
    return true;
  };

  // Capturo os valores dos inputs
  const values = {
    inputQuantity: quantityOfNumbers.value,
    inputStart: startNumber.value,
    inputEnd: endNumber.value,
  };

  const hasEmpty =
    values.inputQuantity === "" ||
    values.inputStart === "" ||
    values.inputEnd === "";

  // Se tem campo vazio emptyFields(hasEmpty) retorne
  if (!emptyFields(hasEmpty)) return;

  // Vaidando se o vaor digitado é mesmo um número e se ele é inteiro
  const stringForNumber = (data) => {
    const array = Object.values(data);

    for (let i = 0; i < array.length; i++) {
      array[i] = Number(array[i]);

      if (Number.isNaN(array[i])) {
        statusMessage.setAttribute("role", "alert");
        statusMessage.textContent = "Insira um número válido";
        return false;
      }

      if (!Number.isInteger(array[i])) {
        statusMessage.setAttribute("role", "alert");
        statusMessage.textContent = "Insira um número inteiro";
        return false;
      }
    }

    statusMessage.setAttribute("role", "status");
    return true;
  };

  // Se numberAndInteger for falso retorne
  if (!stringForNumber(values)) return;

  // Validando se o máximo é maior que o mínimo
  const maxAndMin = (numbers) => {
    const array = Object.values(numbers);

    const lowestValue = array[1];
    const highestValue = array[2];

    if (highestValue <= lowestValue) {
      statusMessage.setAttribute("role", "alert");
      statusMessage.textContent =
        "O valor máximo deve ser maior que o valor mínimo";
      return false;
    }

    return true;
  };

  //
  if (!maxAndMin(values)) return;

  const quantityInterval = (noRepeat) => {
    if (!noRepeat) return true;

    const array = Object.values(values);

    const quantity = array[0];
    const minNumber = array[1];
    const maxNumber = array[2];

    const possibleNumbers = maxNumber - (minNumber - 1);

    if (quantity > possibleNumbers) {
      statusMessage.setAttribute("role", "alert");
      statusMessage.textContent =
        "Não possui quantidade suficiente de números para o sorteio";
      return false;
    }

    return true;
  };

  const noRepeat = repeatNumber.checked;

  if (!quantityInterval(noRepeat)) return;

  const quantityNumbers = Number(values.inputQuantity);
  const minNumber = Number(values.inputStart);
  const maxNumber = Number(values.inputEnd);
  let resultNumbers = [];

  if (noRepeat) {
    resultNumbers = uniqueNumbers(quantityNumbers, minNumber, maxNumber);
  } else {
    resultNumbers = sortedNumbers(quantityNumbers, minNumber, maxNumber);
  }

  console.log(resultNumbers);
  // Preciso criar a exibição dos números na DOM
});
