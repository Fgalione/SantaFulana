const cardsDiv = document.querySelector("#cards");
const carritoDiv = document.querySelector(".carrito");
const carouselDiv = document.querySelector(".carouselExampleFade");
const modalDiv = document.querySelector("#modalInsert");
const modalcarrito = document.querySelector("modalcarrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // operador logico OR

const homeDiv = document.querySelector("#home");

window.onload = cargarHome();
window.onload = newslatter();

const getData = async () => {
    const response = await fetch("https://fakestoreapi.com/products/category/women's clothing");
    const data = await response.json();
    return data;
}
// ***************************************************
//llamado a los botones

btnProductos.addEventListener('click', async () => {
    productos = await getData();
    crearCards();
})

btnCarrito.addEventListener('click', () => {
    cardsDiv.innerHTML = "";
    mostrarCarrito()
})

btnHome.addEventListener("click", () => {
    cargarHome();
})

// ***************************************************
//Funciones
//cargando Sweetalert de News Letter
function newslatter() {

    Swal.fire({
        title: '<strong>News!</strong>',
        icon: 'info',
        html:
        `<form action="#" method="post">
            <p>Subscríbete a nuestro Newsletter.</p>
            <input type="email" name="email" placeholder="Ingreda tu mail" required>
        </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'👍 Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:'👎',
        cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Pronto te enviaremos nuestras novedades!',
                showConfirmButton: false,
                timer: 1800
        })
    }
})
}

//Funcion para la carga del banner de inicio
function cargarHome() {
    carritoDiv.innerHTML = "";
    cardsDiv.innerHTML = "";
    document.querySelector("#carouselExampleFade").innerHTML = `
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="./images/img_1.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./images/img_2.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./images/img_3.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./images/img_4.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./images/img_5.png" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./images/img_6.png" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>`;
}


//Funcion para la carga de las cart
function crearCards() {
    productos.forEach(producto => {
        document.querySelector(".carousel").innerHTML = "";

        carritoDiv.innerHTML = "";
        cardsDiv.innerHTML += `
            <div class="col">
                <div class="card shadow-sm">
                    <img src="${producto.image}" class="bd-placeholder-img card-img-top" width="150px" height="380" ></img>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-primary">${producto.title}</h5>
                    <p class="card-text">u$s ${producto.price}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn m-1 btn-secondary btn-outline-white" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btnModal${producto.id}">Ver Producto</button>
                            <button type="button" class="btn m-1 btn-primary btn-outline-white" id="btnAgregar${producto.id}">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>`

    })
    mostrarModal();
    agregarFuncionAlBoton();
}

function mostrarModal() {
    productos.forEach(element => {
        document.querySelector(`#btnModal${element.id}`).addEventListener("click", () => {
            modalDiv.innerHTML = "";
            modalDiv.innerHTML += `
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${element.title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img src="${element.image}" class="card-img-top" alt="...">
                        <p class="description text-darck">${element.description}</p>
                        <h3>Price</h3>
                        <p class="card-text text-primary">u$s ${element.price}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>`;
            // agregarFuncionAlBoton();
        })
    })
}

function agregarAlCarrito(producto) {
    let existe = carrito.some(prod => prod.id === producto.id);
    if (existe === false) {
        producto.cantidad = 1;
        carrito.push(producto);
    } else {
        let prodFind = carrito.find(prod => prod.id === producto.id)
        prodFind.cantidad++;
    }
}

function agregarFuncionAlBoton() {
    productos.forEach(prod => {
        document.querySelector(`#btnAgregar${prod.id}`) ?.addEventListener("click", () => { // se agregó ?
            agregarAlCarrito(prod);
        })
    })
}


//Función para visualizar carrito
function mostrarCarrito() {
    let total = 0;
    document.querySelector("#carouselExampleFade").innerHTML = "";
    carritoDiv.innerHTML = "";
    carritoDiv.innerHTML += `
        <table class="table table-hover table-borderless" id="tabla">
            <thead>
                <tr>
                    <th style="width:50%;">Nombre</th>
                    <th style="width:8%;">Imagen</th>
                    <th style="width:8%;">Cantidad</th>
                    <th style="width:8%;">Precio</th>
                    <th style="width:8%;">SubTotal</th>
                    <th style="width:8%;"> - </th>
                    <th style="width:8%;"> + </th>
                    <th style="width:25%;">Quitar</th>
                </tr>
            </thead>
        </table>`;
    carrito.forEach(prod => {
        let subtotal = Number((prod.price).toFixed(0) * prod.cantidad);

        document.getElementById("tabla").innerHTML += `
        <tbody>
            <tr >
                <th style="width:50%;">${prod.title}</th>
                <th style="width:8%;"><img src="${prod.image}" class="litleCard-img-top" style="height:60px" alt="..."></th>
                <th style="width:8%;">${prod.cantidad}</th>
                <th style="width:8%;">$ ${(prod.price).toFixed(0)}</th>
                <th style="width:8%;">$ ${subtotal.toFixed(0)}</th>
                <th style="width:8%;"><button type="button"  class="btn btn-danger" id="btnQuitar${prod.id}"> - </button></th>
                <th style="width:8%;"><button type="button" class="btn btn-success" id="btnSumar${prod.id}"> + </button></th>
                <th style="width:25%;"><button type="button" class="btn btn-danger" id="btnBorrar${prod.id}">Borrar Producto</button></th>
            </tr>
        <tbody>`
        total = total + subtotal;

    })
    document.getElementById("tabla").innerHTML += `
            <tr>
                <th style="width:50%;>El total de la compra es: </th>
                <th style="width:8%;"></th>
                <th style="width:8%;"></th>
                <th style="width:8%;"></th>
                <th style="width:8%;"></th>
                <th style="width:8%;">$ ${total}</th>
                <th style="width:8%;"></th>
                <th style="width:25%;"></th>
            </tr>`
    localStorage.setItem("carrito", JSON.stringify(carrito))
    restarProducto();
    sumarProducto();
    borrarProducto();
}

function borrarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#btnBorrar${producto.id}`).addEventListener("click", () => {
            let indice = carrito.findIndex(element => element.id === producto.id);
            Swal.fire({
                title: 'Estás seguro que quieres eliminar este producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#0ede0a',
                confirmButtonText: 'Si, quitarlo!😞',
                cancelButtonText: 'NO!!, me lo quedo!🎁'
            }).then((result) => {
                if (result.isConfirmed) {
                    carrito.splice(indice, 1);
                    mostrarCarrito();
                    Swal.fire(
                        'Eliminado!',
                        'El producto fue quitado del carrito',
                        'success'
                    )
                }
            })
        });
    })
}

function restarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#btnQuitar${producto.id}`).addEventListener("click", () => {
            let indice = carrito.findIndex(element => element.id === producto.id);
            (producto.cantidad > 1) ? producto.cantidad--: carrito.splice(indice, 1);
            mostrarCarrito()
        })
    })
}

function sumarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#btnSumar${producto.id}`).addEventListener("click", () => {
            producto.cantidad++;
            mostrarCarrito();
        })
    })
}
mostrarModal();
mostrarCarrito();
crearCards();