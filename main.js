
const productos = [
    {
        id: 1,
        nombre: "Teclado mecánico",
        precio: 45000
    },
    {
        id: 2,
        nombre: "Mouse inalámbrico",
        precio: 22000
    },
    {
        id: 3,
        nombre: "Monitor 24''",
        precio: 180000
    }
];



const formulario = document.querySelector("#formulario-producto");
const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const contenedorItems = document.querySelector("#contenedor-items");
const buscador = document.querySelector("#buscador");
const mensaje = document.querySelector("#mensaje");



function formatearPrecio(precio) {
    return precio.toLocaleString("es-AR");
}



function renderizarProductos(listaProductos) {

    contenedorItems.innerHTML = "";

    if (listaProductos.length === 0) {

        contenedorItems.innerHTML = `
            <div class="sin-productos">
                No se encontraron productos.
            </div>
        `;

        return;
    }

    listaProductos.forEach((producto) => {

        contenedorItems.innerHTML += `
            <article class="producto">

                <div>
                    <h3>${producto.nombre}</h3>
                    <p>$${formatearPrecio(producto.precio)}</p>
                </div>

                <button
                    class="btn-eliminar"
                    data-id="${producto.id}"
                >
                    Eliminar
                </button>

            </article>
        `;
    });
}



renderizarProductos(productos);



formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const precio = Number(inputPrecio.value);

    if (nombre === "" || precio <= 0) {

        mensaje.textContent = "Completá correctamente todos los campos.";
        mensaje.className = "mensaje eliminado";

        return;
    }



    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio
    };



    productos.push(nuevoProducto);



    renderizarProductos(productos);



    mensaje.textContent = `¡${nombre} fue agregado correctamente!`;
    mensaje.className = "mensaje exito";


    formulario.reset();


    // QUITAR EL MENSAJE DESPUÉS DE UNOS SEGUNDOS

    setTimeout(() => {
        mensaje.textContent = "";
    }, 3000);

});



contenedorItems.addEventListener("click", (event) => {

    if (event.target.classList.contains("btn-eliminar")) {

        const idProducto = Number(event.target.dataset.id);



        const productoEliminado = productos.find(
            (producto) => producto.id === idProducto
        );


        const indiceProducto = productos.findIndex(
            (producto) => producto.id === idProducto
        );

        productos.splice(indiceProducto, 1);


    

        renderizarProductos(productos);



        mensaje.textContent =
            `${productoEliminado.nombre} fue eliminado.`;

        mensaje.className = "mensaje eliminado";


        setTimeout(() => {
            mensaje.textContent = "";
        }, 3000);
    }

});


buscador.addEventListener("input", () => {

    const textoBuscado = buscador.value.toLowerCase().trim();


    // FILTRAR EL ARRAY

    const productosFiltrados = productos.filter((producto) => {

        return producto.nombre
            .toLowerCase()
            .includes(textoBuscado);

    });




    renderizarProductos(productosFiltrados);

});