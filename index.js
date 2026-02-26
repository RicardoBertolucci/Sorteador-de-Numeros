const form = document.getElementById("number-form");
const quantityOfNumbers = document.getElementById("quantity");
const startNumber = document.getElementById("startNumber");
const endNumber = document.getElementById("endNumber");
const repeatNumber = document.querySelector(".form__switch-input");
const statusMessage = document.getElementById("statusMessage");
const btnSubmit = document.querySelector(".form__button-primary");

form.addEventListener("submit", (e) => {
  //O submit acontece na TAG form e não no botão
  e.preventDefault();

  // Válida se os campos estão vazios ou não
  const emptyFields = (hasEmpty) => {
    statusMessage.textContent = "";
    if (!emptyFields(hasEmpty)) {
      statusMessage.setAttribute("role", "alert");
      statusMessage.textContent =
        "Erro - Todos os campos precisam ser preenchidos!";

      setTimeout(function () {
        statusMessage.textContent = "";
        statusMessage.setAttribute("role", "status");
      }, 3000);

      return false;
    } else {
      statusMessage.setAttribute("role", "status");
      return true;
    }
  };

  // Capturo os valores dos inputs
  let values = {
    inputQuantity: quantityOfNumbers.value,
    inputStart: startNumber.value,
    inputEnd: endNumber.value,
  };

  const hasEmpty =
    values.inputQuantity === "" ||
    values.inputStart === "" ||
    values.inputEnd === "";

  emptyFields(hasEmpty);
});
