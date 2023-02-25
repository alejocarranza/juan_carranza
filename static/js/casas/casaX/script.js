const d= document;

function showImages(option) {
  d.querySelectorAll('.house-images').forEach(elem => {
    elem.style.display = 'none';
  });
  d.querySelector(`#${option}`).style.display = 'flex';
};

d.querySelectorAll('#house-options-images h3').forEach(elem => {
  elem.addEventListener('click', () => {
    d.querySelectorAll('#house-options-images h3').forEach(elem => {
      elem.classList.remove('house-options-active');
    });
    elem.classList.add('house-options-active');
    showImages(elem.textContent.toLowerCase());
  });
});

showImages('planos');

const houseOptions = d.querySelector("#house-options-images");
const houseImages = d.querySelectorAll(".house-images");

houseOptions.addEventListener("click", function(event) {
  if (event.target.tagName === "H3") {
    const activeImage = d.querySelector(".house-images.active");
    if (activeImage) {
      activeImage.classList.remove("active");
    }
    const targetImage = d.querySelector(`#${event.target.innerText.toLowerCase()}`);
    targetImage.classList.add("active");
  }
});


// slider

const $last= d.getElementById("sa-last"),
  $first= d.getElementById("sa-first");

const slide= function($last, $first, side){
  const $actual= d.getElementsByClassName("sa-active")[0];
      
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

function startInterval(callback, interval) {
  return setInterval(callback, interval);
};

function stopInterval(intervalId) {
  clearInterval(intervalId);
};

let slideInterval;
const callback = function (entry){
  if(entry[0].isIntersecting){
    slideInterval = startInterval(function () {
      slide($last, $first, "forward");
    }, 3500);    
  } else{
    stopInterval(slideInterval);
  };
};

const observer= new IntersectionObserver(callback, {threshold: 0.1,});
observer.observe(d.getElementById("avances-slider"));

