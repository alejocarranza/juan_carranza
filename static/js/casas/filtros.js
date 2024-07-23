addEventListener("DOMContentLoaded", e=>{

    // CASAS DEL HOME
    ((d, w)=>{
        let f= 0,
            cardsWidth= w.innerWidth * 85 / 100,
            cantCards= Math.floor(cardsWidth / 285);
        const $casasCards= d.getElementsByClassName("home-casa-card");

        // Siempre muestra la cantidad necesaria de imagenes en pantalla (si entran 3, muestra 3. si entran 4, 4. Etc.)
        function showOnlyNecessary(first){
            let nose= 0.35;
            if (window.innerWidth<780){
                nose= 0.75;
            };
            let left;
            cardsWidth= w.innerWidth * 85 / 100;
            cantCards= Math.floor(cardsWidth / (window.innerWidth * nose));
            const last= cantCards+first;

            for(let i=0; i<$casasCards.length; i++){
                if(i >= first && i < last){
                    left= cardsWidth / cantCards * (i - first) + (cardsWidth % (window.innerWidth * nose) / (cantCards * 2)) - 30;
                    $casasCards[i].style.left= `${left}px`;
                } else{
                    $casasCards[i].style.left= 'calc(-15% - 800px)';
                };
            };
        };
        setTimeout(()=>{
            showOnlyNecessary(f);
        }, 0);
        w.addEventListener('resize', e=>{
            showOnlyNecessary(f);
        });
        
        // Funcionalidad a las flechas
        setTimeout(()=>{
            const $aLeft= d.getElementById("hc-left"),
                $aRight= d.getElementById("hc-right");

            function moveRight(){
                if(f !== $casasCards.length - cantCards && cantCards<$casasCards.length){
                    f++;
                    showOnlyNecessary(f);
                };
            };
            function moveLeft(){
                if(f != 0){
                    f--;
                    showOnlyNecessary(f);
                };
            };

            $aRight.addEventListener("click", e=>{
                moveRight();
            });
            $aLeft.addEventListener("click", e=>{
                moveLeft();
            });
        }, 0);

        // Al hacer click te manda a la url de la casa
        for(let i= 0; i < $casasCards.length; i++){
            $casasCards[i].addEventListener("click", e=> {
                open($casasCards[i].dataset.url, "_self");
            });
        };
    })(document, window);

    // BOTONES DE FILTROS
    ((d, w)=>{
        const $filtros= d.querySelectorAll(".filtro"),
            $aplicar_btn= d.getElementById("aplicar");
        let top, dataloop, total_ticked= false;
        $filtros.forEach($filtro=>{
            const $childrens= $filtro.querySelectorAll(".filtro-opcion");

            $childrens.forEach($children=>{
                dataloop= $children.getAttribute("data-loop");
                total_padding= dataloop * 8
                total_font= (dataloop-1) * 1
                top= `calc(${dataloop}em + 16px + ${total_padding}px + ${total_font}em)`;
                $children.style.top=  top;

                $children.addEventListener("click", ()=>{
                    total_ticked= 0;
                    $children.querySelector(".untick").classList.toggle("no-display");
                    $children.querySelector(".tick").classList.toggle("no-display");
                    $children.classList.toggle("selected");
                    $children.classList.toggle("child-selected")
                    $childrens.forEach($children1=>{
                        if($children1.classList.contains("selected")){
                            total_ticked+= 1;
                        };
                    });
                    if(total_ticked>= 1 && !$children.parentElement.classList.contains("selected")){
                        $children.parentElement.classList.toggle("selected");
                        $children.parentElement.classList.toggle("parent-selected")
                    } else if(total_ticked==0 && $children.parentElement.classList.contains("selected")) {
                        $children.parentElement.classList.toggle("selected");
                        $children.parentElement.classList.toggle("parent-selected")
                    };
                });
            });
        });

        $aplicar_btn.addEventListener("click", ()=>{
            const $filtros1= d.querySelectorAll(".parent-selected");
            let texto= "";

            console.log($filtros1)

            $filtros1.forEach($filtro=>{
                texto+= `-0${$filtro.getAttribute("data-filtro")}`;
                $aplicados= $filtro.querySelectorAll(".child-selected");

                $aplicados.forEach($aplicado=>{
                    texto+= `-1${$aplicado.getAttribute("id")}`;
                });
            });

            texto= [...texto].slice(1).join('');
            
            let url= $aplicar_btn.getAttribute("data-url");
            if (texto){
                url= url.replace("None", texto);
            };
            w.location.href= url;
        });

        const parametros= eval(d.getElementById("parametros").textContent);

        parametros.forEach(param=>{
            d.getElementById(param).click();
        });
    })(document, window);

    // EFECTOS AL APARECER EN PANTALLA
    ((d, w)=>{
        // EFECTO DEL HOME CASAS
        setTimeout(()=>{
            let cardsWidth= w.innerWidth * 85 / 100,
                cantCards= Math.floor(cardsWidth / 285);
                
            function getCantCards(){
                cardsWidth= w.innerWidth * 85 / 100;
                cantCards= Math.floor(cardsWidth / 285);
            };
            
            const $cards= d.querySelectorAll(".home-casa-card"),
                $homeCasas= d.getElementById("home-casas-cards");

            /*for (let i=0; i<$cards.length; i++){
                setTransition($cards[i], "1s", "ease");
            }; */

            function showEffectHC(){
                getCantCards(); 
                for (let i=0; i<$cards.length; i++){
                    setTimeout(()=>{
                        $cards[i].style.setProperty("transform", "translateY(0px)");
                        $cards[i].style.setProperty("opacity", "1");
                    }, i * 400);
                }; 
            };

            function dissapearHC(){
                getCantCards(); 
                for (let i=0; i<$cards.length; i++){
                    $cards[i].style.setProperty("transform", `translateY(35px)`);
                    $cards[i].style.setProperty("opacity", "0");
                }; 
            };

            const effectHC= function(entry){
                if(entry[0].isIntersecting){
                    showEffectHC();
                } else{
                    dissapearHC();
                };
            };

            const observer1= new IntersectionObserver(effectHC, {threshold: 0.2,});
            observer1.observe($homeCasas);

            d.addEventListener("visibilitychange", e=>{
                if(d.visibilityState === 'visible'){
                    showEffectHC();
                } else{
                    dissapearHC();
                };
            });
        }, 0);
    })(document, window);
});