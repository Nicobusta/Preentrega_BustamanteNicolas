const almoadones = [{
    codigo:1,
    nombre:"Pana",
    cantidad:6,
    precio:5600,
},{
    codigo:2,
    nombre:"Caribe",
    cantidad:8,
    precio:6300,
},{
    codigo:3,
    nombre:"Tusor Beige",
    cantidad:7,
    precio:6300,
},{
    codigo:4,
    nombre:"Tusor Marrón",
    cantidad:3,
    precio:6300,
}];

const contenedores=[{
    codigo:5,
    nombre:"Amarrillo Caribe",
    cantidad:2,
    precio:5600,
},{
    codigo:6,
    nombre:"Arpillera",
    cantidad:5,
    precio:5600,
},{
    codigo:7,
    nombre:"Tusor Beige",
    cantidad:5,
    precio:6300,
}];

const macetas=[{
    codigo:8,
    nombre:"Cemento",
    cantidad:12,
    precio:900,
},{
    codigo:9,
    nombre:"Hombrecito PET",
    cantidad:3,
    precio:800,
},{
    codigo:10,
    nombre:"Robert",
    cantidad:3,
    precio:1700,
},{
    codigo:11,
    nombre:"Cuenco de Madera",
    cantidad:2,
    precio:900,
}];

/* const carrito=[];

let categoria=parseInt(prompt("Escriba el numero de la categoria que desea comprar" + "\n 1- Almódones \n 2- Contenedores \n 3- Macetas"));



if(categoria<=0){
    alert("el numero ingresado debe ser mayor a 0");
}else if(!isNaN(categoria)){
    let listado="";
    let count=0;
    let opcion=0;
    switch(categoria){
        case 1:
             almoadones.forEach(element => {
                count++;
                listado=listado + count + ". " + element.nombre + " $" + element.precio + "\n";
            });

            opcion=parseInt(prompt("Escriba el numero de la categoria que desea comprar" + "\n" + listado));

            
            carrito.push(almoadones[opcion-1]);
            
            break;
        case 2:
            contenedores.forEach(element => {
                count++;
                listado=listado + count + ". " + element.nombre + " $" + element.precio + "\n";
            });

            opcion=parseInt(prompt("Escriba el numero de la categoria que desea comprar" + "\n" + listado));

           
            carrito.push(contenedores[opcion-1]);
            break;
        case 3:
            macetas.forEach(element => {
                count++;
                listado=listado + count + ". " + element.nombre + " $" + element.precio + "\n";
            });

            opcion=parseInt(prompt("Escriba el numero de la categoria que desea comprar" + "\n" + listado));

           
            carrito.push(macetas[opcion-1]);
            break;
    }

}else{
    alert("Solo se admiten los numeros 1, 2 y 3");
}

console.log(carrito); */


const carrito = [];

const producto = [
    { nombre: "Almódones", productos: almoadones },
    { nombre: "Contenedores", productos: contenedores },
    { nombre: "Macetas", productos: macetas }
];

while (true) {
    const categoriaSeleccionada = parseInt(prompt("Escriba el numero de la categoria que desea comprar" + "\n 1- Almódones \n 2- Contenedores \n 3- Macetas \n oprima 8 para salir de la compra"));

    if (categoriaSeleccionada === 8) {
        break;
    }
    
    if (categoriaSeleccionada <= 0) {
        alert("El numero ingresado debe ser mayor a 0");
    } else if (!isNaN(categoriaSeleccionada)) {
        const categoria = producto[categoriaSeleccionada - 1];
    
        if (categoria) {
            let listado = "";
            categoria.productos.forEach((element, index) => {
                const count = index + 1;
                listado += count + ". " + element.nombre + " $" + element.precio + "\n";
            });
    
            const opcion = parseInt(prompt("Escriba el numero del producto que desea comprar" + "\n" + listado));
    
            if (opcion >= 1 && opcion <= categoria.productos.length) {
                carrito.push(categoria.productos[opcion - 1]);
            } else {
                alert("Opción inválida");
            }
        } else {
            alert("Opción de categoría inválida");
        }
    } else {
        alert("Solo se admiten los números 1, 2 y 3");
    }


}

if (carrito.length === 0) {
    alert("No hay productos en el carrito");
}else{


let compra="";
carrito.forEach((element, index) => {
        const count = index + 1;
        compra += count + ". " + element.nombre + " $" + element.precio + "\n";
});

let total=carrito.reduce((total, element) => total + element.precio, 0);
alert("Usted esta por compra:" + "\n" + compra + "\n Su total es de: $" + total); 
}
//reduce para sumar el total