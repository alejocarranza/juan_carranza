function showImages(option) {
    document.querySelectorAll('.house-images').forEach(elem => {
        elem.style.display = 'none';
    });
    document.querySelector(`#${option}`).style.display = 'flex';
};

document.querySelectorAll('#house-options-images h3').forEach(elem => {
    elem.addEventListener('click', () => {
        document.querySelectorAll('#house-options-images h3').forEach(elem => {
            elem.classList.remove('house-options-active');
        });
        elem.classList.add('house-options-active');
        showImages(elem.textContent.toLowerCase());
    });
});

showImages('exteriores');

const houseOptions = document.querySelector("#house-options-images");
const houseImages = document.querySelectorAll(".house-images");

houseOptions.addEventListener("click", function(event) {
  if (event.target.tagName === "H3") {
    const activeImage = document.querySelector(".house-images.active");
    if (activeImage) {
      activeImage.classList.remove("active");
    }
    const targetImage = document.querySelector(`#${event.target.innerText.toLowerCase()}`);
    targetImage.classList.add("active");
  }
});