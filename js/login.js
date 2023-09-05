/* ********************* registro usuario ***************************** */
const inputUser = document.querySelector("#username"),
  inputPass = document.querySelector("#password"),
  check = document.querySelector("#recordar"),
  formulario = document.querySelector("#form__login");

  
function guardar(valor) {
    const user = { usuario: inputUser.value, pass: inputPass.value };
    
    valor === "localStorage" &&
      localStorage.setItem("user", JSON.stringify(user));
    valor === "sessionStorage" &&
      sessionStorage.setItem("user", JSON.stringify(user));
  }
  
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    check.checked ? guardar("localStorage") : guardar("sessionStorage");
  });