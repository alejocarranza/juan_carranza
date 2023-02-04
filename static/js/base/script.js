document.addEventListener("DOMContentLoaded", ()=>{

    (d=>{ // navbar compu
        // Autimatizo que al tocar el li se realiza la accion del a interior (submenu en +800px)
        $submenu= d.getElementsByClassName("submenu__item");

        for(let i=0; i < $submenu.length; i++){
            $submenu[i].addEventListener("click", e=>{
                location.href= $submenu[i].firstElementChild.getAttribute("href");
            });
        };
    })(document);
        
    (d=>{ // navbar celu
        // Lógica para ver cuando se ejecutan los eventos responsive
        const btnsMenu= function(){
            if (innerWidth<= 800){
                cont++;
                if(cont==1) {
                    const $boton= d.getElementById("btn-menu");
                    $boton.addEventListener("click", funcionalidadBtnMenu);

                    setTimeout(()=>{
                        const $botonSubmenu= d.getElementsByClassName("submenu-btn")[0],
                            $img = d.getElementById("down");
                        $botonSubmenu.addEventListener("click", funcionalidadBtnSubmenu);
                        $img.addEventListener("click", funcionalidadBtnSubmenu);
                    }, 0);
                };
            }else{
                cont=0;
                const $boton= d.getElementById("btn-menu");
                $boton.removeEventListener("click", funcionalidadBtnMenu); 
            };
        };

        let cont= 0;
        addEventListener("resize", btnsMenu);
        addEventListener("load", btnsMenu);

        // Hago el funcionamiento del navbar responsive
        const funcionalidadBtnMenu= ()=>{
            const $menu= d.getElementsByClassName("menu")[0],
                $contacto= d.getElementsByClassName("cta")[0];

            $menu.classList.toggle("show");
            $contacto.classList.toggle("show");
        };

        // Hago el funcionamiento del submenu del navbar responsive
        const funcionalidadBtnSubmenu= ()=>{
            // Cuidado! la variable es solo el a no el li
            const $submenu= d.getElementsByClassName("submenu")[0],
                $contacto= d.getElementsByClassName("cta")[0];

            $submenu.classList.toggle("flex");
            $submenu.classList.toggle("show");
            $contacto.classList.toggle("downer");

        };
        funcionalidadBtnSubmenu();

        // Al tocar el "li" se manda al "a" interior
        setTimeout(()=>{
            const $menu= d.getElementsByClassName("menu")[0];

            const mandarLink= $li=>{
                location.href= $li.firstElementChild.getAttribute("href");
            };

            $menu.children[0].addEventListener("click", ()=> mandarLink($menu.children[0]));
            $menu.children[2].addEventListener("click", ()=> mandarLink($menu.children[2]));
        }, 0)
    })(document);
    
    (d=>{ // Si te moves dentro de la misma pagina hace un efecto de transicion
        d.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
              d.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
              });
            });
          });
    })(document);

    ((d, w)=>{ // Transicion al aparecer en pantalla
        
        var elements = d.querySelectorAll('body > *');
        elements.forEach(function(element) {
            var rect = element.getBoundingClientRect();
            if (rect.top < w.innerHeight) {
                element.style.transition = 'opacity 1s ease-in-out';
                element.style.opacity = 1;
            } else {
                element.style.opacity = 0;
                element.style.transition = 'opacity 1s ease-in-out';
                w.addEventListener('scroll', function() {
                    rect = element.getBoundingClientRect();
                    if (rect.top < w.innerHeight) {
                        element.style.opacity = 1;
                    };
                });
            };
        });
          
    })(document, window);
});

