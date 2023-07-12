    
    //CREACION DEL CARRITO EN EL MODAL CONTAINER
    const presentarCarrito = () => {
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header"
        modalHeader.innerHTML = `
                <h1 class="modal-header-title">Carrito.</h1>
        `;
        modalContainer.append(modalHeader);

        //CREAMOS EL CARRITO
        const modalbutton = document.createElement("h1");
        modalbutton.innerText = "x";
        modalbutton.className = "modal-header-button";

        modalbutton.addEventListener("click", () => {
            modalContainer.style.display = "none";
        });

        modalHeader.append(modalbutton);
        
        //NUTRIMOS EN MODAL CONTAINER CON LOS ELEMENTOS AGREGADOS
        carrito.forEach((product) =>{
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3> ${product.nombre}</h3>
            <p>$ ${product.precio}</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❌</span>
        `;

        modalContainer.append(carritoContent);

        //SACANDO PRODUCTOS DEL MODAL CONTAINER (REFS IGUALES)
        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", () => {
            if (product.cantidad !== 1) {
                product.cantidad --;
            }
            saveLocal();
            presentarCarrito();
        });

        //SUMANDO UN ELEMENTO AL MODAL CONTAINER (REFS IGUALES)
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
                product.cantidad ++;
                saveLocal();
                presentarCarrito();
        });
        //ELIMINAR OBJETO DEL CARRITO
        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });

    });
    
    //OBTENIENDO EL TOTAL DEL CARITO
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div");
    totalCompra.className = "total-content";
    totalCompra.innerHTML = `total a pagar: $${total}`;
    modalContainer.append(totalCompra);
}; 

verCarrito.addEventListener("click", presentarCarrito);

    //ELIMINAR PRODUCTO DEL CARRITO
    const eliminarProducto = (id) => {
        const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    presentarCarrito();
};

//CREAMOS EL CONTADOR DEL CARRITO
const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength" , JSON.stringify (carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();



