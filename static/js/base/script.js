window.addEventListener("DOMContentLoaded", ()=>{

    ((d)=>{
        // Autimatizo que al tocar el li se realiza la accion del a interior (submenu en +800px)
        $submenu= d.getElementsByClassName("submenu__item");

        for(let i=0; i < $submenu.length; i++){
            $submenu[i].addEventListener("click", e=>{
                location.href= $submenu[i].firstElementChild.getAttribute("href");
            });
        };
    })(document);
        
    ((d, w)=>{
        // Hago el funcionamiento del navbar responsive
        const funcionalidadBtnMenu= function(){
            const $menu= d.getElementsByClassName("menu")[0],
                $contacto= d.getElementsByClassName("cta")[0];

            $menu.classList.toggle("show");
            $contacto.classList.toggle("show");
        };
        const btnMenu= function(){
            if (w.innerWidth<= 800){
                cont++;
                if(cont==1) {
                    const $boton= d.getElementById("btn-menu");
                    $boton.addEventListener("click", funcionalidadBtnMenu);
                }
            }else{
                cont=0;
                const $boton= d.getElementById("btn-menu");
                $boton.removeEventListener("click", funcionalidadBtnMenu); 
            };
        };

        let cont= 0;
        addEventListener("resize", btnMenu);
        addEventListener("load", btnMenu);

        // Hago el funcionamiento del submenu del navbar responsive
        const btnSubmenu= function(){
            const $botonSubmenu= d.getElementsByClassName("submenu-btn")[0];
            // Cuidado! la variable es solo el a no el li
            console.log($botonSubmenu)
        };
        btnSubmenu();

    })(document, window);
    
});

