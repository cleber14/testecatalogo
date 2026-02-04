const modal = document.getElementById("productModal");
const closeBtn = document.querySelector(".close");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalWhatsapp = document.getElementById("modalWhatsapp");

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const name = card.dataset.name;
    const image = card.dataset.image;
    const description = card.dataset.description;
    const price = card.dataset.price;

    modalImage.src = image;
    modalName.textContent = name;
    modalDescription.textContent = description;
    modalPrice.textContent = price;

    modalWhatsapp.href =
      "https://wa.me/77981641508?text=" +
      encodeURIComponent(`Quero saber mais sobre o produto ${name}`);

    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});