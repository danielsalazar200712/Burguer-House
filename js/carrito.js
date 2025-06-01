let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = carrito.reduce((acc, item) => acc + item.precio, 0);

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-carrito");

    lista.innerHTML = "";
    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;

        // Botón para eliminar productos
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.onclick = function () {
            eliminarDelCarrito(index);
        };

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });

    totalElemento.textContent = total;
}

function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function enviarWhatsApp() {
    let numeroWhatsApp = "573017116153";
    let mensaje = "Hola, quiero comprar:\n";

    carrito.forEach((item) => {
        mensaje += `- ${item.nombre} ($${item.precio})\n`;
    });

    mensaje += `Total: $${total}`;

    let url = `https://wa.me/${3017116153}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

actualizarCarrito();