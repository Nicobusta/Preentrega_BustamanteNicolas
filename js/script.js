const almohadones = [{
    codigo:1,
    nombre:"Pana",
    imagen:"almohadon1.jpg",
    cantidad:6,
    precio:5600,
},{
    codigo:2,
    nombre:"Caribe",
    imagen:"almohadon1.jpg",
    cantidad:8,
    precio:6300,
},{
    codigo:4,
    nombre:"Tusor Marrón",
    imagen:"almohadon1.jpg",
    cantidad:3,
    precio:6300,
}];

const contenedores=[{
    codigo:5,
    nombre:"Amarrillo Caribe",
    imagen:"contenedor.jpg",
    cantidad:2,
    precio:5600,
},{
    codigo:6,
    nombre:"Arpillera",
    imagen:"contenedor.jpg",
    cantidad:5,
    precio:5600,
},{
    codigo:7,
    nombre:"Tusor Beige",
    imagen:"contenedor.jpg",
    cantidad:5,
    precio:6300,
}];

const macetas=[{
    codigo:8,
    nombre:"Cemento",
    imagen:"macetas.jpg",
    cantidad:12,
    precio:900,
},{
    codigo:9,
    nombre:"Hombrecito PET",
    imagen:"macetas.jpg",
    cantidad:3,
    precio:800,
},{
    codigo:10,
    nombre:"Robert",
    imagen:"macetas.jpg",
    cantidad:3,
    precio:1700,
},{
    codigo:11,
    nombre:"Cuenco de Madera",
    imagen:"macetas.jpg",
    cantidad:2,
    precio:900,
}];

const producto = [
    { nombre: "Almódones", productos: almohadones },
    { nombre: "Contenedores", productos: contenedores },
    { nombre: "Macetas", productos: macetas }
];


/* obtener carrito del localStorage y llenado del sidebar */
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cuerpoCarrito=document.getElementById("carrito");

const llenarCarrito=(arr,html)=>{
    arr.forEach((element)=>{
        let precio=element.precio*element.cantidad;
        html.innerHTML += `
        <div class="producto mb-3 d-flex justify-content-between align-items-center">
            <img class="col-3" src="../assets/productos/${element.imagen}">
            <div class="col-5">
                <h4>${element.nombre}</h4>
                <div class="d-flex">
                    <div class="modificarCant" id="restar" onClick="restarCant(${element.codigo})"><h5>-</h5></div>
                    <input type="text" name="cantidad" id="cantidad" readonly value="${element.cantidad}">
                    <div class="modificarCant" id="sumar" onClick="sumarCant(${element.codigo})"><h5>+</h5></div>
                </div>
            </div>
            <div class=" d-flex flex-column align-items-end">
                <button type="button" name="eliminar" id="eliminar" onClick="eliminarProducto(${element.codigo})">
                    <svg class="mb-1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="trash">
                        <path d="M31,8c0-1.654-1.346-3-3-3h-4.382l-1.724-3.447C21.725,1.214,21.379,1,21,1H11c-0.379,0-0.725,0.214-0.895,0.553L8.382,5H4C2.346,5,1,6.346,1,8c0,1.302,0.839,2.402,2,2.816V28c0,1.654,1.346,3,3,3h20c1.654,0,3-1.346,3-3V10.816C30.161,10.402,31,9.302,31,8z M11.618,3h8.764l1,2H10.618L11.618,3z M27,28c0,0.551-0.448,1-1,1H6c-0.552,0-1-0.449-1-1V11h22V28z M28,9H4C3.448,9,3,8.551,3,8s0.448-1,1-1h24c0.552,0,1,0.449,1,1S28.552,9,28,9z"></path><path d="M16 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C15 26.552 15.447 27 16 27zM22 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C21 26.552 21.447 27 22 27zM10 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C9 26.552 9.447 27 10 27z"></path>
                    </svg>
                </button>
                <h4 class="mt-3">${precio}</h4>
            </div>
        </div>
        `;  
    })  
}

const total=(arr,html)=>{
    let sumatoria=arr.reduce((total, element) => total + element.precio*element.cantidad, 0);
    html.innerHTML += `
            <h3>Total: $${sumatoria}</h3>
            <button class="w-100" type="button" name="pagar" id="btnPagar" onClick="pagar()">Pagar</button>
            `; 
}


if(carrito.length === 0){
    cuerpoCarrito.innerHTML += `
        <p>
            No hay productos en el carrito
        </p>
        `;
}else{
    llenarCarrito(carrito,cuerpoCarrito);
    total(carrito,cuerpoCarrito);
} 

/************  llenado pagina productos ***************/
const main__productos=document.getElementById("main__productos");
let todosProductos=[];	

producto.forEach((element)=>{
    element.productos.forEach((elem) => {
        todosProductos.push(elem);
    })
})


const llenarMain=(arr)=>{
    arr.forEach((elem) => {
        main__productos.innerHTML += `
        <section class="producto col-5 col-lg-3 m-2 my-lg-3 mx-lg-2 d-flex flex-column align-items-center">
            <img src="../assets/productos/${elem.imagen}">
            <h3 class="nombre">${elem.nombre}</h3>
            <h3><b>$${elem.precio}</b></h3>
            <button type="button" name="comprar" class="btnComprar">Comprar</button>
        </section>
        `;
    })
}

/* ***********filtrado de productos mostrados *************/
let mostrar="todos";
    
switch (mostrar) {
    case "almohadones":
        llenarMain(almohadones);
        break;
    case "contenedores":
        llenarMain(contenedores);
        break;
    case "macetas":
        llenarMain(macetas);
        break;
    case "todos":
        llenarMain(todosProductos);
        break;
}  


/************  boton comprar ***************/
const comprar=document.querySelectorAll(".btnComprar");
const encontrarProducto=document.querySelectorAll(".producto .nombre");
const obtenerLS=()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
const actualizarLS=()=>{
    obtenerLS();
    cuerpoCarrito.innerHTML = "";
    llenarCarrito(carrito,cuerpoCarrito);
    total(carrito,cuerpoCarrito);
}

comprar.forEach((element,index) => { 
    element.addEventListener("click",()=>{
        let buscado=encontrarProducto[index].innerHTML;

        todosProductos.forEach((elem) => {
                if (elem.nombre === buscado ) {
            
                    const filtrado = filtrarproducto(carrito, buscado);
                    if(filtrado.length === 0){
                        elem.cantidad=1;
                        carrito.push(elem);
                        actualizarLS();
                    }else{
                        carrito.forEach((element) => {
                            if (element.nombre === buscado) {
                                element.cantidad++;
                                JSON.parse(localStorage.getItem("carrito"));
                                actualizarLS();
                            }
                        })
                    }
                   
                }
        });
    });
});  

/************  boton eliminar carrito ***************/
function eliminarProducto(elem){

    carrito.forEach((element,index) => {
        if(element.codigo === elem){
            carrito.splice(index,1);
            actualizarLS();
        }
    })

    if(carrito.length === 0){
        cuerpoCarrito.innerHTML = "";
        cuerpoCarrito.innerHTML += `
            <p>
                No hay productos en el carrito
            </p>
            `;
    }
    
}


/************  buscador de productos ***************/
const buscador=document.getElementById("buscador");

function filtrarproducto(arr, filtro) {

    const filtroEnMinusculas = filtro.toLowerCase();

    const filtrado = arr.filter((el) => {
        const nombreEnMinusculas = el.nombre.toLowerCase();
      return nombreEnMinusculas.includes(filtroEnMinusculas);
    });

    return filtrado;
  }

  buscador.addEventListener("input", (e) => {
    const filtro = e.target.value;
    const filtrado = filtrarproducto(todosProductos, filtro);
    main__productos.innerHTML = "";
    if(filtrado.length === 0){
      main__productos.innerHTML = `<h2>No se encontraron productos</h2>`
    }else{
        llenarMain(filtrado);
    }
  })

  /* ************  cambio en cantidad ************** */

 function restarCant(elem){
    carrito.forEach((element) => {
        if(element.codigo === elem){
            if(element.cantidad>1){
                element.cantidad--;
                actualizarLS();
            }
        }
    })
   
 }
 function sumarCant(elem){
    carrito.forEach((element) => {
        if(element.codigo === elem){  
            element.cantidad++;
            actualizarLS();
        }
    })
 }

  /* ************  cambio en cantidad ************** */

  function pagar(){
    
    localStorage.removeItem("carrito");
    cuerpoCarrito.innerHTML = "";
    cuerpoCarrito.innerHTML += `
        <p>
            No hay productos en el carrito
        </p>
        `;
    alert("Gracias por su compra");
    
  }