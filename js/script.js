/* obtener carrito del localStorage y llenado del sidebar */
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const cuerpoCarrito=document.getElementById("carrito");

const llenarCarrito=(arr,html)=>{
    arr.forEach((element)=>{
        const {codigo,cantidad,imagen,precio,nombre}=element
        let total=precio*cantidad;
        html.innerHTML += `
        <div class="producto mb-3 d-flex justify-content-between align-items-center">
            <img class="col-3" src="../assets/productos/${imagen}">
            <div class="col-5">
                <h4>${nombre}</h4>
                <div class="d-flex">
                    <div class="modificarCant" id="restar" onClick="restarCant(${codigo})"><h5>-</h5></div>
                    <input type="text" name="cantidad" id="cantidad" readonly value="${cantidad}">
                    <div class="modificarCant" id="sumar" onClick="sumarCant(${codigo})"><h5>+</h5></div>
                </div>
            </div>
            <div class=" d-flex flex-column align-items-end">
                <button type="button" name="eliminar" id="eliminar" onClick="eliminarProducto(${codigo})">
                    <svg class="mb-1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 32 32" viewBox="0 0 32 32" id="trash">
                        <path d="M31,8c0-1.654-1.346-3-3-3h-4.382l-1.724-3.447C21.725,1.214,21.379,1,21,1H11c-0.379,0-0.725,0.214-0.895,0.553L8.382,5H4C2.346,5,1,6.346,1,8c0,1.302,0.839,2.402,2,2.816V28c0,1.654,1.346,3,3,3h20c1.654,0,3-1.346,3-3V10.816C30.161,10.402,31,9.302,31,8z M11.618,3h8.764l1,2H10.618L11.618,3z M27,28c0,0.551-0.448,1-1,1H6c-0.552,0-1-0.449-1-1V11h22V28z M28,9H4C3.448,9,3,8.551,3,8s0.448-1,1-1h24c0.552,0,1,0.449,1,1S28.552,9,28,9z"></path><path d="M16 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C15 26.552 15.447 27 16 27zM22 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C21 26.552 21.447 27 22 27zM10 27c.553 0 1-.448 1-1V14c0-.552-.447-1-1-1s-1 .448-1 1v12C9 26.552 9.447 27 10 27z"></path>
                    </svg>
                </button>
                <h4 class="mt-3">${total}</h4>
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
            const{nombre,imagen,cantidad}=elem
                if (nombre === buscado ) {
                    const filtrado = filtrarproducto(carrito, buscado);
                    if(filtrado.length === 0){
                        /* se usa elem.cantidad xq necesito modificar el valor de la cantidad para añadir al local
                        si lo dejo como objetos destructurado no lo puedo modificar por ser constante */
                        elem.cantidad=1;
                        carrito.push(elem);
                        actualizarLS();
                        
                        Swal.fire({
                            position: 'top-end',
                            imageUrl: `../assets/productos/${imagen}`,
                            imageHeight: 100,
                            imageAlt: `Compro ${nombre}`,
                            title: `${nombre}`,
                            text: 'Se añadio a su carrito',
                            showConfirmButton: false,
                            timer: 1500,
                            width:'20rem',
                          }) 
                          
                          
                    }else{

                        carrito.forEach((element) => {
                            const {nombre:carritoNom}=element
                            if (carritoNom === buscado) {
                                element.cantidad++;
                                JSON.parse(localStorage.getItem("carrito"));
                                actualizarLS();

                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    
                                  })
                                  
                                  Toast.fire({
                                    icon: 'success',
                                    title: `Anadiste otro ${nombre} al carrito`,
                                    
                                  })
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
        const {nombre, codigo}=element

        if(codigo === elem){
            Swal.fire({
                title: `¿Eliminar ${nombre}?`,
                text: "Eliminarás este producto del carrito",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#62371E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
              }).then((result) => {
                if (result.isConfirmed) {
                     
                    carrito.splice(index,1);
                    actualizarLS();

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1500,
                        
                      })
                      
                      Toast.fire({
                        icon: 'error',
                        title: `${nombre} fue eliminado`,
                        
                      })
                }
    
                if(carrito.length === 0){
                    cuerpoCarrito.innerHTML = "";
                    cuerpoCarrito.innerHTML += `
                        <p>
                            No hay productos en el carrito
                        </p>
                        `;
                }
    
              })
        }
        
    })
    
    
}

/* ************  cambio en cantidad ************** */

 function restarCant(elem){
    carrito.forEach((element) => {
        const {codigo,cantidad}=element
        if(codigo === elem){
            if(cantidad>1){
                element.cantidad--;
                actualizarLS();
            }
        }
    })
   
 }
 
 function sumarCant(elem){
    carrito.forEach((element) => {
        const {codigo}=element
        if(codigo === elem){  
            element.cantidad++;
            actualizarLS();
        }
    })
 }

/* ************ Boton pagar ************** */

  function pagar(){

    Swal.fire({
        title: `¿Desea Finalizar la Compra?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#62371E',
        cancelButtonColor: '#b09175',
        cancelButtonText: 'Seguir comprando',
        confirmButtonText: 'Pagar',
      }).then((result) => {
        if (result.isConfirmed) {
            
            localStorage.removeItem("carrito");
            cuerpoCarrito.innerHTML = "";
            cuerpoCarrito.innerHTML += `
                <p>
                    No hay productos en el carrito
                </p>
                `;

                const Toast = Swal.mixin({
                    toast: true,
                    position: 'center',
                    showConfirmButton: false,
                    timer: 1800,
                    
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: `Su compra fue realizada con exito`,
                    
                  })   
                  
        }

      })
    
  }

/* ************ link desde inicio a productos ************** */

const linkAlmohadones=document.getElementById("almohadones");
const linkContenedores=document.getElementById("contenedores");
const linkMacetas=document.getElementById("macetas");

const actualizarMostrar=(elem)=>{
    sessionStorage.setItem("mostrar",elem)
}

let rutaActual = window.location.pathname;

// Verifica la ruta para determinar la página
if (rutaActual === "/index.html") {
    linkAlmohadones.addEventListener("click",()=>{
        actualizarMostrar("almohadones");
    })
    
    linkContenedores.addEventListener("click",()=>{
        actualizarMostrar("contenedores");
    })
    
    linkMacetas.addEventListener("click",()=>{
        actualizarMostrar("macetas");
    })
}

