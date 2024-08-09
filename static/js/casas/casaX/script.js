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
  
  // House options
  function changeActive(actual, next){
    actual.style.display = 'none';  
    next.style.display = 'block'; 
    setTimeout(()=>{
      actual.classList.toggle("image-active");
      next.classList.toggle("image-active");
    }, 10);
  };

  function showContImage(elem, which){
    let data_class= elem.getAttribute("data-class");
    d.querySelectorAll('#house-options-images h3').forEach(el => {
      el.classList.remove('house-options-active');
    });
    elem.classList.add('house-options-active');
    const $first_img= d.getElementById(`${which}-${data_class}-image`),
      $previous_active= d.querySelector(".image-active");
    changeActive($previous_active, $first_img);
  };

  d.querySelectorAll('#house-options-images h3').forEach(elem => {
    elem.addEventListener('click', () => {  
      showContImage(elem, "first");
    });
  });

  function showImage(action, actual, container){
    function getNextContainer(actual_cont, action){
      let next_cont, elem;
      if (action=="right"){
        next_cont= actual_cont.nextElementSibling;
      }else{
        next_cont= actual_cont.previousElementSibling;
      };

      if(next_cont.classList.contains("house-images")){
        elem= d.getElementById(`house-option-${next_cont.getAttribute("id")}`);
        if(action=="right"){
          showContImage(elem, "first");
        }else{
          showContImage(elem, "last");
        };
      }else{
        if(action=="right"){
          elem= d.getElementById(`house-option-exteriores`);
          showContImage(elem, "first");
        }else{
          elem= d.getElementById(`house-option-planos`);
          showContImage(elem, "first");
        };
      }
    };

    let next;
    if(action=="left"){
      if(actual.previousElementSibling){
        next= actual.previousElementSibling;
        changeActive(actual, next);
      }else{
        getNextContainer(container, "left");
      };
    }else{
      if(actual.nextElementSibling){
        next= actual.nextElementSibling;
        changeActive(actual, next);
      }else{
        getNextContainer(container, "right");
      };
    };
  };

  const $left_arrow= d.getElementById("hc-left"),
    $right_arrow= d.getElementById("hc-right");
  function callShowImage(action){
    const $actual= d.querySelector(".image-active"),
      $container= $actual.parentElement;

    showImage(action, $actual, $container);
  };
  $left_arrow.addEventListener("click", ()=>{callShowImage("left")});
  $right_arrow.addEventListener("click", ()=>{callShowImage("right")});
  

  /*function showImages(option) {
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
  });*/

  // mas info
  const $btn_mas= d.querySelectorAll(".house-info");

  function change_text($descripcion, $btn_clicked){
    $btn_clicked.style.display= "none";
    $descripcion.textContent= $descripcion.getAttribute("data-text");
  };
  
  $btn_mas.forEach($btn=>{
    $btn.addEventListener("click", ()=>{change_text($btn.previousElementSibling, $btn)})
  });

  // EFECTOS AL APARECER EN PANTALLA
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

    function showEffectHO(){
      for(let i of $houseOptionsChildrens){
        i.style.setProperty("transform", "translateY(0)");
        i.style.setProperty("opacity", "1");
        i.style.setProperty("visibility", "visible");
      };
    };

    function dissapearHO(){
      for(let i of $houseOptionsChildrens){
        i.style.setProperty("transform", "translateY(30px)");
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

    const observer= new IntersectionObserver(effectHO, {threshold: 0.4,});
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
