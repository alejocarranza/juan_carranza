window.addEventListener("DOMContentLoaded", ()=>{

    ((d)=>{ // navbar compu
        // Autimatizo que al tocar el li se realiza la accion del a interior (submenu en +800px)
        $submenu= d.getElementsByClassName("submenu__item");

        for(let i=0; i < $submenu.length; i++){
            $submenu[i].addEventListener("click", e=>{
                location.href= $submenu[i].firstElementChild.getAttribute("href");
            });
        };
    })(document);
        
    ((d)=>{ // navbar celu
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

    })(document);
    
});

