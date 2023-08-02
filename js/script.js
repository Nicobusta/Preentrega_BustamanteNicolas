let cantidad=parseInt(prompt("ingresar cantidad de productos"));

if(cantidad<=0){
    alert("el numero ingresado debe ser mayor a 0");
}else if(!isNaN(cantidad)){
    let saldo= SumarProductos(cantidad);
    
    if(saldo == 0){
        alert("Usted pago la totalidad de su compra");
    }else{
        alert("Su saldo es de " + saldo);0
    }
}else{
    alert("Solo se admiten numeros");2
}

function SumarProductos(cant){
    let total=0;
    for (let i = 0; i < cant; i++){

        let producto=parseFloat(prompt("ingrese el precio del productos " + (i+1)));
        total=total+producto;
    }

    let pago=parseFloat(prompt("el total a pagar es de " +total+ "\ningresar el monto que desea abonar"));
    return total-pago;
}