const misProductos = document.getElementById("misProductos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p class="price">$${product.precio}</p>

    `;

    misProductos.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () =>{

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat){
        carrito.map((prod) => {
            if(prod.id === product.id){
                prod.cantidad++;
            }
        });
    }else {
            carrito.push({
            id : product.id,
            img : product.img,
            nombre : product.nombre,
            precio : product.precio,
            cantidad : product.cantidad, 
        });
    }
        console.log(carrito);
    });
});
















































//EVENTOS DE TECLADO
//onkeyup onkeydown
let nombre = document.getElementById('nombre');
nombre.onkeyup=()=>{
    if(nombre.value.length < 3){
        console.log('Nombre de menos de 3 caracteres');
        nombre.style.color='red';
    }else{
        nombre.style.color='black';
    }
}


//evento input

let email = document.getElementById('email');
email.addEventListener('input',()=>{
    if(!email.value.includes('@') || !email.value.includes('.')){
        document.getElementById('advertisement').innerText='no olvides el @ ni el .';
    }else{
        document.getElementById('advertisement').innerText='';
    }
})

//borrar campos
function borrarCampos(){
    nombre.value = '';
    email.value = '';
}

//evento submit 

let formulario = document.getElementById('formulario');
formulario.addEventListener('submit',validar);

function validar(eve){
    if((nombre.value=='')||(email.value == '')){
        eve.preventDefault();
        alert('Ingrese nombre o email valido !');
    }
}


let RedesSociales = document.getElementsByTagName('a');
console.log(RedesSociales);

RedesSociales[5,6,7].style.fontSize = '20px';  

//PREGUNTAR POR QUE SOLO ME TOMA LA POSICION 7 PARA HACER EL CAMBIO DE TAMANO DE FUENTE