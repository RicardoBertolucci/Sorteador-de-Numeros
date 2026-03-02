const form = document.getElementById("number-form");
const quantityOfNumbers = document.getElementById("quantity");
const startNumber = document.getElementById("startNumber");
const endNumber = document.getElementById("endNumber");
const repeatNumber = document.querySelector(".form__switch-input");
const statusMessage = document.getElementById("statusMessage");
const btnSubmit = document.querySelector(".form__button-primary");

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

  if (!emptyFields(hasEmpty)) return;

  // Validando se o valor é um dado do tipo number, inteiro e máximo e mínimo
  const maxAndMin = (data) => {
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
        statusMessage.textContent = "Insira um número válido";
        return false;
      }
    }

    statusMessage.setAttribute("role", "status");
    return true;
  };

  if (!maxAndMin(values)) return;
});
