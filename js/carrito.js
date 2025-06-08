// Recuperar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guardar carrito en localStorage
const guardarCarrito = () => localStorage.setItem("carrito", JSON.stringify(carrito));

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-carrito");

    if (!lista || !totalElemento) return;

    lista.innerHTML = carrito.map(item => `
        <li>${item.nombre} - $${item.precio.toLocaleString('es-CO')}</li>
    `).join('');

    totalElemento.textContent = `$${carrito.reduce((acc, item) => acc + item.precio, 0).toLocaleString('es-CO')}`;

    guardarCarrito();
}

// Vaciar el carrito completamente
document.getElementById('vaciarCarrito').addEventListener('click', () => {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarCarrito();
    alert('El carrito ha sido vaciado.');
        });

// Enviar pedido por WhatsApp
function enviarWhatsApp() {
    const numeroWhatsApp = "573017116153";
    const mensaje = `Hola, quiero comprar:\n${
        carrito.map(item => `- ${item.nombre} ($${item.precio.toLocaleString('es-CO')})`).join('\n') 
    }\nTotal: $${carrito.reduce((acc, item) => acc + item.precio, 0).toLocaleString('es-CO')}`;

    window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`, "_blank");
}

// Cargar carrito al inicio y mantener cantidad de productos
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarCarrito(); // Esto asegura que los productos y el contador se mantengan al regresar a la página
    initMap(); // Inicializar Google Maps al cargar la página
});