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

        // El botón de contacto al tocar el submenu se baja de una manera relativa a la cantidad de casas
        function crearDowner() {
            const cantCasas= d.querySelectorAll(".submenu__item").length,
                topValue= `calc(${cantCasas * 34}px + ${cantCasas}em + 230px + 1px)`;

            let stylesheet = document.styleSheets[0],
                rules = stylesheet.cssRules || stylesheet.rules,
                nuevaRegla = `.downer {
                    transition: all 0s !important; 
                    top: ${topValue} !important; 
                }`;
            if (stylesheet.insertRule) {
              stylesheet.insertRule(nuevaRegla, rules.length);
            } else {
              stylesheet.addRule(nuevaRegla);
            };
          };
          crearDowner();
    })(document);

    ((d,w)=>{ // Scroll to top
        let showed = false;
        const $scrollTop= d.getElementById("scroll-top");

        w.addEventListener("scroll", ()=>{
            if(w.scrollY>= 500 && !showed){
                $scrollTop.style.setProperty("opacity", "1");
                $scrollTop.style.setProperty("visibility", "visible");
                $scrollTop.style.setProperty("transform", "translateY(0px)");
                showed= true;
            } else if (w.scrollY<=500 && showed){
                $scrollTop.style.setProperty("opacity", "0");
                $scrollTop.style.setProperty("visibility", "hidden");
                $scrollTop.style.setProperty("transform", "translateY(30px)");
                showed= false;
            };
        });

        $scrollTop.addEventListener("click", e=>{
            w.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        });
    })(document, window);

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

    ((d, w)=>{ // El header se queda fijo al bajar
        setTimeout(()=>{
            const $header= d.querySelector('header');
            let fixed;
            w.addEventListener("scroll", ()=>{
                if(w.scrollY>= 200 && !fixed){
                    $header.style.setProperty('position', 'fixed');
                    $header.style.setProperty('transform', 'translateY(-80px)');
                    setTimeout(()=>{
                        $header.style.setProperty('transition', 'all .7s ease');
                        $header.style.setProperty('transform', 'translateY(0px)');
                    }, 50);
                    fixed= true;
                } else if(w.scrollY<=200 && fixed){
                    $header.style.setProperty('transition', 'all 0s ease');
                    $header.style.setProperty('transform', 'translateY(0px)');
                    $header.style.setProperty('position', 'relative');
                    fixed= false;
                };
            });
        }, 0);
    })(document, window);

    ((d, w)=>{ // Efectos al aparecer en pantalla
        function setTransition(el, duration, type){
            el.style.setProperty("transition", `all ${duration} ${type}`);
        };

        setTimeout(()=>{ // Efecto de la página de contacto
            const $contact= d.getElementById("contact"),
                $cLeft= d.getElementById("c-left"),
                $cRight= d.getElementById("form-contact");

            setTransition($cLeft, "1s", "ease");
            setTransition($cRight , "1s", "ease");

            function showEffectContact(){
                $cLeft.style.setProperty('transform', 'translateX(0px)');
                $cRight.style.setProperty('transform', 'translateX(0px)');

                $cLeft.style.setProperty('opacity', '1');
                $cRight.style.setProperty('opacity', '1');
            };

            function dissapearContact(){
                $cLeft.style.setProperty('transform', 'translateX(-80px)');
                $cRight.style.setProperty('transform', 'translateX(80px)');

                $cLeft.style.setProperty('opacity', '0');
                $cRight.style.setProperty('opacity', '0');
            };

            const effectContact = function (entry){
                if(entry[0].isIntersecting){
                    showEffectContact();
                } else{
                    dissapearContact();
                };
            };
        
            const observer= new IntersectionObserver(effectContact, {threshold: 0.3,});
            observer.observe($contact);
        
            d.addEventListener("visibilitychange", e=>{
                if(d.visibilityState === 'visible'){
                    showEffectContact();
                } else{
                    dissapearContact();
                };
            });
        }, 0);

        setTimeout(()=>{ // Efecto del footer
            const $footer= d.getElementById("f-first"),
                $footerSons= $footer.children;

            for (let i of $footerSons){
                setTransition(i, "1s", "ease");
            };

            function showEffectFooter(){
                for (let i of $footerSons){
                    i.style.setProperty('transform', 'translateY(0px)');
                    i.style.setProperty('opacity', '1');
                };
            };

            function dissapearFooter(){
                for (let i of $footerSons){
                    i.style.setProperty('transform', 'translateY(-70px)');
                    i.style.setProperty('opacity', '0');
                };
            };

            const effectFooter = function (entry){
                if(entry[0].isIntersecting){
                    showEffectFooter();
                } else{
                    dissapearFooter();
                };
            };
        
            const observer= new IntersectionObserver(effectFooter, {threshold: 0.3,});
            observer.observe($footer);
        
            d.addEventListener("visibilitychange", e=>{
                if(d.visibilityState === 'visible'){
                    showEffectFooter();
                } else{
                    dissapearFooter();
                };
            });
        }, 0);
    })(document, window);
});

