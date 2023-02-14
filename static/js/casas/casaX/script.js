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

showImages('planos');

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


// slider

const $last= document.getElementById("sa-last"),
  $first= document.getElementById("sa-first");

const slide= function($last, $first, side){
  const $actual= document.getElementsByClassName("sa-active")[0];
      
  $actual.classList.toggle("sa-active");

  if(side=="forward"){
    if ($actual === $last) {
      $first.classList.toggle("sa-active");
    } else {
      $actual.nextElementSibling.classList.toggle("sa-active");
    };
  }else{
    if ($actual === $first) {
      $last.classList.toggle("sa-active");
    } else {
      $actual.previousElementSibling.classList.toggle("sa-active");
    };
  };
};

// document.addEventListener("DOMContentLoaded", e=>{
//   setTimeout(()=>{
//     let intervalActive= false;
  
//     const observer = new IntersectionObserver(entries=> {
//       // if (entry.isIntersecting && !(intervalActive)){
//       //   
//       // } else if (!(entry.isIntersecting) && interval){
//       //   interval.remove();
//       // };
//       entries.forEach(entry=>{
//         if (entry.isIntersecting){
//           let interval= setInterval(() => {
//             slide($last, $first, "forward");
//           }, 4000);
//           intervalActive= true;
//         };
        
//         console.log(intervalActive);
//         if(intervalActive){
//           clearInterval(interval);
//           intervalActive= false;
//         };
//       });
//     });
  
//     console.log(document.getElementById("avances-slider"))
//     observer.observe(document.getElementById("avances-slider"))
//   }, 0);  
// });

// Seleccionamos el elemento que queremos observar
// const element = document.getElementById("avances-slider");

// // Definimos el observer
// const observer = new IntersectionObserver(function (entries) {
//   // Entries es un arreglo con los elementos observados
//   entries.forEach(function (entry) {
//     // Si el elemento está en pantalla
//     if (entry.isIntersecting) {
//       // Agregamos el setInterval
//       const intervalId = setInterval(function () {
//         // Aquí escribimos el código que queremos que se ejecute cada intervalo
//       }, 1000);

//       // Guardamos el id del interval para poder eliminarlo más tarde
//       entry.target.intervalId = intervalId;

//       // Detenemos el observer para este elemento
//       observer.unobserve(entry.target);
//     }
//   });
// });

// // Iniciamos el observer para el elemento seleccionado
// observer.observe(element);

// // Para eliminar el setInterval cuando el elemento ya no está en pantalla, podemos agregar un event listener para el evento "slide"
// element.addEventListener("slide", function () {
//   // Si el elemento ya no está en pantalla
//   if (!element.intervalId) {
//     return;
//   }

//   // Eliminamos el setInterval
//   clearInterval(element.intervalId);
//   element.intervalId = null;

//   // Re-iniciamos el observer para el elemento
//   observer.observe(element);
// });