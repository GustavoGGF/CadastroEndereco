const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressinput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neightborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInput = document.querySelectorAll("[data-input]");
const fadeElement = document.querySelector("#fade");
const TextLB = document.querySelector("#Text-LB");

const closeBtn = document.querySelector("#close-message");

// Validando CEP

cepInput.addEventListener("keypress", (e) => {
  const onlyNumber = /[0-9]/;
  const key = String.fromCharCode(e.keyCode);

  if (!onlyNumber.test(key)) {
    e.preventDefault();
    return;
  }
});

// Evento que adquire o endereço
cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;

  if (inputValue.length === 8) {
    getAddress(inputValue);
  }
});

// Pega endereço da API
const getAddress = async (cep) => {
  toggleLoader();

  cepInput.blur();

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

  const response = await fetch(apiUrl);

  const data = await response.json();

  //   Mostar erro e resetar formulario
  if (data.erro === true) {
    if (!addressinput.hasAttribute("disabled")) {
      toggleDisabled();
    }
    addressForm.reset();
    toggleMessage("Cep inválido, tente novamente");
    toggleLoader();
    addressinput.value = "";
    return;
  }

  if (addressinput.value == "") {
    toggleDisabled();
  }

  addressinput.value = data.logradouro;
  cityInput.value = data.localidade;
  neightborhoodInput.value = data.bairro;
  regionInput.value = data.uf;

  TextLB.classList.toggle("TextLB");

  toggleLoader();
};

// adicionar ou remover o disabled
const toggleDisabled = () => {
  if (regionInput.hasAttribute("disabled")) {
    formInput.forEach((input) => {
      regionInput.removeAttribute("disabled");
      input.removeAttribute("disabled");
    });
  } else {
    formInput.forEach((input) => {
      input.setAttribute("disabled", "disabled");
      regionInput.setAttribute("disabled", "disabled");
    });
  }
};

// Mostrar ou oculstar
const toggleLoader = () => {
  const loaderElement = document.querySelector("#loader");

  fadeElement.classList.toggle("hide");
  loaderElement.classList.toggle("hide");
  fadeElement.classList.toggle("ZInd");
  loaderElement.classList.toggle("ZInd");
};

// Mostrar ou ocultar a menssagem
const toggleMessage = (msg) => {
  const messageElement = document.querySelector("#message");
  const messageElementText = document.querySelector("#message p");

  messageElementText.innerHTML = msg;

  fadeElement.classList.toggle("hide");
  messageElement.classList.toggle("hide");
  fadeElement.classList.toggle("ZInd");
  messageElement.classList.toggle("ZInd");
};

// Fechar a mensagem
closeBtn.addEventListener("click", () => toggleMessage());

// Cadastrar
addressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  toggleLoader();

  setTimeout(() => {
    toggleLoader();

    toggleMessage("Endereço salvo com sucesso!!!");

    addressForm.reset();

    toggleDisabled();
  }, 1500);
});
