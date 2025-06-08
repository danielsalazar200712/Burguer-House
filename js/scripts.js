var swiper1 = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

var swiper2 = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        }
    }
});

let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input) {
    input.addEventListener("change", function() {
        let id = input.value; 
        let thisSwiper = document.getElementById("swiper" + id);
        thisSwiper.swiper.update();
    });
});

// 🛒 Manejo del carrito de compras con notificación
function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));

    let notificacion = document.getElementById("notificacion");
    notificacion.textContent = `✅ ${nombre} añadido con éxito!`;
    notificacion.style.display = "block";

    setTimeout(() => {
        notificacion.style.display = "none";
    }, 2000); // Desaparece después de 2 segundos
}

// 🔢 Contador de ítems en el carrito
let cartCount = 0;
function addToCart() {
    cartCount++; // Incrementar el contador
    document.getElementById("cart-count").textContent = cartCount; // Mostrar la nueva cantidad
}
function enviarWhatsApp() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let enlaceMapa = `https://www.google.com/maps?q=${lat},${lon}`;
            let mensaje = `Hola, quiero comprar este producto. Mi ubicación es: ${enlaceMapa}`;

            let whatsappURL = `https://api.whatsapp.com/send?phone=+573017116153&text=${encodeURIComponent(mensaje)}`;

            alert("URL de WhatsApp generada:\n" + whatsappURL); // Muestra la URL antes de abrirla

            window.open(whatsappURL, "_blank");
        }, function(error) {
            alert("Error al obtener la ubicación: " + error.message);
        });
    } else {
        alert("Geolocalización no soportada en tu navegador.");
    }
}
