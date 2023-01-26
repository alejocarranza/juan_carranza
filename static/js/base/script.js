((d, w)=>{
    const navbar= function(){
        if(w.innerWidth<= "660"){
            const $btnContacto= d.getElementById("btn-contacto"),
                $nav= d.getElementById("nav"),
                $btnMenu= d.getElementById("hamburguesa");

            $btnMenu.style.setProperty("cursor", "pointer");

            $btnMenu.addEventListener('click', e=>{
                if($btnMenu.getAttribute("data-touched")=="false"){
                    $nav.style.setProperty("left", "0");
                    $nav.style.setProperty("right", "0");
                    $btnContacto.style.setProperty("left", "0");
                    $btnContacto.style.setProperty("right", "0");

                    $btnMenu.setAttribute("data-touched", "true");
                } else{
                    $nav.style.setProperty("left", "auto");
                    $nav.style.setProperty("right", "100vw");
                    $btnContacto.style.setProperty("left", "auto");
                    $btnContacto.style.setProperty("right", "100vw");

                    $btnMenu.setAttribute("data-touched", "false");
                };
            });
        };
    };
    w.addEventListener('resize', navbar);
    w.addEventListener('load', navbar);

})(document, window);