const d= document;

addEventListener("DOMContentLoaded", ()=>{
  setTimeout(()=>{     // Hago responsive la imágen principal.
    function getDimesions(widthScreen){
      let width= (widthScreen*588)/1242;
      let heigth= width*0.75;
      return([width, heigth]);
    };

    function resizeImage(dimensions){
      const $img1= d.getElementById("casa-right");
      let width, height;
      if(window.innerWidth> 750){
        width= `${dimensions[0].toString()}px`;
        height= `${dimensions[1].toString()}px`;
        $img1.style.setProperty("width", width);
        $img1.style.setProperty("height", height);
        $img1.style.setProperty("position", "relative");
      }else{
        width= window.innerWidth * 0.7;
        height= width*0.75;
        $img1.style.setProperty("width", `${width}px`);
        $img1.style.setProperty("height", `${height}px`);
        $img1.style.setProperty("position", "relative");  
      }
    };
    addEventListener("resize", ()=>{
      resizeImage(getDimesions(window.innerWidth));
   });
   resizeImage(getDimesions(window.innerWidth));
  }, 10)
  
  // No se que hace
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

  // mas info
  const $btn_mas= d.querySelectorAll(".house-info");

  function change_text($descripcion, $btn_clicked){
    $btn_clicked.style.display= "none";
    $descripcion.textContent= $descripcion.getAttribute("data-text");
  };
  
  $btn_mas.forEach($btn=>{
    $btn.addEventListener("click", ()=>{change_text($btn.previousElementSibling, $btn)})
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


  // EFECTOS AL APARECER EN PANTALLA
  function setTransition(el, duration, type){
    el.style.setProperty("transition", `all ${duration} ${type}`);
  };

  setTimeout(()=>{ // EFECTO DE LA HOUSE DESCRIPTION
    const $houseDescriptionLeft= d.querySelectorAll(".description-left"),
      $houseDescriptionRight= d.querySelectorAll(".description-right"),
      $houseDescription= d.getElementById("house-description");

    function showEffectHD(){
      if(window.innerWidth>950){
        $houseDescriptionLeft.forEach($left=>{
          $left.style.setProperty("transform", "translateX(0px)");
        });
        $houseDescriptionRight.forEach($right=>{
          $right.style.setProperty("transform", "translateX(0px)");
        });
      };
      $houseDescriptionLeft.forEach($left=>{
        $left.style.setProperty("opacity", "1");
      });
      $houseDescriptionRight.forEach($right=>{
        $right.style.setProperty("opacity", "1");
      });
    };  

    function dissapearHD(){
      if(window.innerWidth>950){
        $houseDescriptionLeft.forEach($left=>{
          $left.style.setProperty("transform", "translateX(-100px)");
        });
        $houseDescriptionRight.forEach($right=>{
          $right.style.setProperty("transform", "translateX(100px)");
        });
      };
      $houseDescriptionLeft.forEach($left=>{
        $left.style.setProperty("opacity", "0");
      });
      $houseDescriptionRight.forEach($right=>{
        $right.style.setProperty("opacity", "0");
      });
    };

    const effectHD = function (entry){
      if(entry[0].isIntersecting){
          showEffectHD();
      } else{
          dissapearHD();
      };
    };

    const observer= new IntersectionObserver(effectHD, {threshold: 0.2,});
    observer.observe($houseDescription);

    d.addEventListener("visibilitychange", e=>{
      if(d.visibilityState === 'visible'){
          showEffectHD();
      } else{
          dissapearHD();
      };
    });
  }, 0);

  setTimeout(()=>{ // EFECTO DE LAS HOUSE OPTIONS
    const $houseOptions= d.getElementById("house-options-images"),
      $houseOptionsChildrens= $houseOptions.children;

    for(let i of $houseOptionsChildrens){
      setTransition(i, "1s", "ease");
    };
    function showEffectHO(){
      for(let i of $houseOptionsChildrens){
        i.style.setProperty("transform", "translateY(0)");
        i.style.setProperty("opacity", "1");
        i.style.setProperty("visibility", "visible");
      };
    };

    function dissapearHO(){
      for(let i of $houseOptionsChildrens){
        i.style.setProperty("transform", "translateY(50px)");
        i.style.setProperty("opacity", "0");
        i.style.setProperty("visibility", "hidden");
      };
    };

    const effectHO = function (entry){
      if(entry[0].isIntersecting){
          showEffectHO();
      } else{
          dissapearHO();
      };
    };

    const observer= new IntersectionObserver(effectHO, {threshold: 1,});
    observer.observe($houseOptions);

    d.addEventListener("visibilitychange", e=>{
      if(d.visibilityState === 'visible'){
          showEffectHO();
      } else{
          dissapearHO();
      };
    });
  }, 0);
});
