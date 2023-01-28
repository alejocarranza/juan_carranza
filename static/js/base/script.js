// ((d, w)=>{
//     // Funcion para el menu hamburguesa
//     const $btnContacto= d.getElementById("btn-contacto"),
//         $nav= d.getElementById("nav"),
//         $btnMenu= d.getElementById("hamburguesa");

//     $btnMenu.style.setProperty("cursor", "pointer");
//     $btnMenu.addEventListener('click', e=>{
//         if($btnMenu.getAttribute("data-touched")=="false"){
//             $nav.style.setProperty("left", "0");
//             $nav.style.setProperty("right", "0");
//             $btnContacto.style.setProperty("left", "0");
//             $btnContacto.style.setProperty("right", "0");

//             $btnMenu.setAttribute("data-touched", "true");
//         } else{
//             $nav.style.setProperty("left", "auto");
//             $nav.style.setProperty("right", "100vw");
//             $btnContacto.style.setProperty("left", "auto");
//             $btnContacto.style.setProperty("right", "100vw");

//             $btnMenu.setAttribute("data-touched", "false");
//         };
//     });
// })(document, window);

// ((d,w)=>{
//     // Funcion para hover en "casas"
//     const $casas= d.getElementById("nav-casas"),
//         $ul= d.getElementById("nav-ul-casas");

//     $casas.addEventListener("mouseover", e=>{
//         $ul.style.setProperty("display", "flex");
//     });
//     $casas.addEventListener("mouseout", e=>{
//         $ul.style.setProperty("display", "none");
//     });
//     $ul.addEventListener("mouseover", e=>{
//         $ul.style.setProperty("display", "flex");
//     });
//     $ul.addEventListener("mouseout", e=>{
//         $ul.style.setProperty("display", "none");
//     });

// })(document, window);
window.addEventListener("DOMContentLoaded", ()=>{


    const d= document,
        $submenu= d.getElementsByClassName("submenu__item");

    for(let i=0; i < $submenu.length; i++){
        $submenu[i].addEventListener("click", e=>{
            location.href= $submenu[i].firstElementChild.getAttribute("href");
        });
    };


});

