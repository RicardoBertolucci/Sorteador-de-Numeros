const form = document.getElementById("number-form");
const quantityOfNumbers = document.getElementById("quantity");
const startNumber = document.getElementById("startNumber");
const endNumber = document.getElementById("endNumber");
const repeatNumber = document.getElementById("noRepeat");
const statusMessage = document.getElementById("statusMessage");
const btnSubmit = document.querySelector(".form__button-primary");
const divResult = document.querySelector(".number-generator__result");
const resultSortNumbers = document.querySelector(".result__sort-numbers");
const buttonText = document.querySelector(".button-text");
let countResult = document.querySelector(".contador");
let contador = 1;

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
    const lowestValue = Number(numbers.inputStart);
    const highestValue = Number(numbers.inputEnd);

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

  const createDivNumber = (num) => {
    const span = document.createElement("span");
    span.classList.add("result__numbers");
    span.textContent = num;
    return span;
  };

  if (resultNumbers.length) {
    if (divResult.classList.contains("is-hidden")) {
      form.style.display = "none";
      divResult.classList.remove("is-hidden");
    }

    countResult.innerHTML = contador;
    contador++;

    btnSubmit.style.display = "none";

    resultSortNumbers.innerHTML = "";

    resultSortNumbers.scrollLeft = 0;

    for (let i = 0; i < resultNumbers.length; i++) {
      let value = createDivNumber(resultNumbers[i]);

      setTimeout(() => {
        resultSortNumbers.append(value);

        requestAnimationFrame(() => {
          value.classList.add("show");
        });

        resultSortNumbers.scrollTo({
          left: resultSortNumbers.scrollWidth,
          behavior: "smooth",
        });

        if (i === resultNumbers.length - 1) {
          
          
          btnSubmit.style.display = "inline-flex";
          
          buttonText.textContent = "Sortear Novamente";
        }
      }, i * 1000);
    }
  }
});
