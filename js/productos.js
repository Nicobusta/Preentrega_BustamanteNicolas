/************  llenado pagina productos ***************/
const main__productos=document.getElementById("main__productos");

const llenarMain=(arr)=>{
    arr.forEach((elem) => {
        const {imagen,precio,nombre}=elem
        main__productos.innerHTML += `
        <section class="producto col-5 col-lg-3 m-2 my-lg-3 mx-lg-2 d-flex flex-column align-items-center">
            <img src="../assets/productos/${imagen}">
            <h3 class="nombre">${nombre}</h3>
            <h3><b>$${precio}</b></h3>
            <button type="button" name="comprar" class="btnComprar">Comprar</button>
        </section>
        `;
    })
}

/************  buscador de productos ***************/
const buscador=document.getElementById("buscador");
const btnVerMas = document.getElementById("ver__mas");
function filtrarproducto(arr, filtro) {

    const filtroEnMinusculas = filtro.toLowerCase();

    const filtrado = arr.filter((el) => {
        const{nombre}=el
        const nombreEnMinusculas = nombre.toLowerCase();
      return nombreEnMinusculas.includes(filtroEnMinusculas);
    });

return filtrado;
}

const getMostrarSS=()=>{
    return sessionStorage.getItem("mostrar");
}

const removerMostrar=()=>{
    sessionStorage.removeItem("mostrar");
}

const verMas=()=>{
  main__productos.innerHTML += `
        <section class="ver__mas col-12 text-center">
          <a href="../pages/productos.html" class="ver__mas">Ver todos</a>
        </section>
        `;
}

let mostrar=getMostrarSS();

fetch('../bd/data.json')
  .then(response => response.json())
  .then(data => {
    const { almohadones, contenedores, macetas } = data;
    let productos;

    switch (mostrar) {
      case "almohadones":
        verMas();
        productos = almohadones;

        break;
      case "contenedores":
        verMas();
        productos = contenedores;
        break;
      case "macetas":
        verMas();
        productos = macetas;
        break;
      default:
        productos = almohadones.concat(contenedores, macetas);
        break;
    }

    
    llenarMain(productos);
    
/* ***********filtrado de productos mostrados *************/
    buscador.addEventListener("input", (e) => {
    
        const filtro = e.target.value;
        const filtrado = filtrarproducto(productos, filtro);
        main__productos.innerHTML = "";
    
        filtrado.length === 0 ? main__productos.innerHTML = `<h2>No se encontraron productos</h2>` : llenarMain(filtrado);
    })


  })
  .then(() => {
    removerMostrar();
  })

const search=document.getElementById("search");
search.addEventListener("click",()=>{
    const visible=buscador.style.display;
    visible==="block" ? buscador.style.display="none" : buscador.style.display="block";
})

