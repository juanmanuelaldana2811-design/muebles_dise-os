// ============================================
// CATÁLOGO + FILTROS + WHATSAPP (Muebles y Diseños)
// Usa CONFIG (definido en config.js)
// ============================================

const WHATSAPP = `https://wa.me/${CONFIG.whatsapp}`;

const products = [
  {
    name: "Escritorio Nido",
    category: "oficina",
    tag: "Más pedido",
    price: "Cotizar",
    description: "Una estación de trabajo que se adapta a tus días y a tu espacio.",
    image: "assets/escritorio-nido.jpg"
  },
  {
    name: "Clóset Raíz",
    category: "hogar",
    tag: "A medida",
    price: "Desde $1.200.000",
    description: "Orden pensado para guardar más, sin quitarle aire a tu habitación.",
    image: "assets/closet-raiz.jpg"
  },
  {
    name: "Librero Abierto",
    category: "organizacion",
    tag: "Nuevo",
    price: "Cotizar",
    description: "Tus libros, objetos y recuerdos también merecen un lugar bonito.",
    image: "assets/librero-abierto.jpg"
  }
];

const productGrid = document.querySelector("#product-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const toast = document.querySelector("#toast");
const whatsappContact = document.querySelector("#whatsapp-contact");
const telefonoVisible = document.querySelector("#telefono-visible");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

function setupWhatsappContact() {
  const message = encodeURIComponent(CONFIG.mensajeDefault);
  whatsappContact.href = `${WHATSAPP}?text=${message}`;
  if (telefonoVisible) telefonoVisible.textContent = CONFIG.telefonoVisible;
}

function productCard(product) {
  const message = encodeURIComponent(
    `Hola ${CONFIG.empresa}, quiero cotizar el ${product.name}.`
  );
  return `
    <article class="product-card">
      <div class="product-image">
        <span class="product-badge">${product.tag}</span>
        <div class="product-visual" aria-hidden="true">
          <img src="${product.image}" alt="${product.name}" loading="lazy"
               onerror="this.style.display='none'" />
          <span class="img-fallback">Imagen</span>
        </div>
      </div>
      <div class="product-info">
        <div class="product-top">
          <h3>${product.name}</h3>
          <span class="product-price">${product.price}</span>
        </div>
        <p>${product.description}</p>
        <a class="product-action" href="${WHATSAPP}?text=${message}" target="_blank" rel="noreferrer">
          Consultar pieza <span>↗</span>
        </a>
      </div>
    </article>`;
}

function renderProducts(filter = "todos") {
  const visibleProducts =
    filter === "todos"
      ? products
      : products.filter((product) => product.category === filter);
  productGrid.innerHTML = visibleProducts.map(productCard).join("");
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderProducts(button.dataset.filter);
  });
});

document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", () => {
    const destination = document.querySelector(link.getAttribute("href"));
    if (destination && link.getAttribute("href") !== "#inicio") {
      showToast("Te llevamos a la sección indicada");
    }
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
setupWhatsappContact();
renderProducts();