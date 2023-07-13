//CONSTRUCCION DEL DINAMISMO DE NUESTRO SITIO WEB
const misProductos = document.getElementById("misProductos");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async () => {
    const response =  await fetch("data.json");
    const data = await response.json();

    //CREAMOS LAS CARTAS DE LOS PRODUCTOS A PARTIR DEL DOM
data.forEach((product) => {
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
    
    //AGREGAMOS SWEETALERT POR CADA PRODUCTO AGREGADO
    Swal.fire({
        title: 'Fabuloso!!',
        text: `Agregaste ${product.nombre} al carrito `,
        imageUrl: product.img,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: product.nombre,
      })

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
    
        console.log(carrito);
        console.log(carrito.length);
        carritoCounter();
        saveLocal();
      }
    });
});
};
getProducts();

//FINALIZAR COMPRA
let finalizarCompra = document.getElementById('finalizarCompra');

finalizarCompra.onclick=()=>{
    carrito=[];
    localStorage.removeItem("carrito");
    carritoCounter(); //establecemos el contador en cero despues de finalizar la compra
    document.getElementById('modal-container').innerHTML='';
    document.getElementById('total').innerText = 'Total a pagar $:';
    Toastify({
        text:'Gracias por tu compra, recibiras tu paquete en las proximas 72 horas',
        duration:5000,
        gravity:'bottom',
        position:'bottom-left',
        
    }).showToast();
};


//set item
const saveLocal = () => { 
localStorage.setItem("carrito", JSON.stringify (carrito));
};



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

RedesSociales[5].style.fontSize = '20px'; 
RedesSociales[6].style.fontSize = '20px';
RedesSociales[7].style.fontSize = '20px'; 

//PREGUNTAR POR QUE SOLO ME TOMA LA POSICION 7 PARA HACER EL CAMBIO DE TAMANO DE FUENTE