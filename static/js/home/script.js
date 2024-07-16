addEventListener("DOMContentLoaded", e=>{
    
    // SLIDER
    (d=>{ 
        // Hago las flechas del slider
        const $last= d.getElementById("s-last"),
            $first= d.getElementById("s-first");

        const slide= function($last, $first, side){
            const $actual= d.getElementsByClassName("s-active")[0];
                
            $actual.classList.toggle("s-active");

            if(side=="forward"){
                if ($actual === $last) {
                    $first.classList.toggle("s-active");
                } else {
                    $actual.nextElementSibling.classList.toggle("s-active");
                };
            }else{
                if ($actual === $first) {
                    $last.classList.toggle("s-active");
                } else {
                    $actual.previousElementSibling.classList.toggle("s-active");
                };
            };
        };

        let slideInterval= setInterval(() => {
            slide($last, $first, "forward");
        }, 6000);

        setTimeout(() => {
            const $aLeft= d.getElementById("a-left"),
                $aRight= d.getElementById("a-right");
            $aLeft.addEventListener("click", ()=>{
                slide($last, $first, "back");
                clearInterval(slideInterval);
                slideInterval= setInterval(() => {
                    slide($last, $first, "forward");
                }, 6000);
            });
            $aRight.addEventListener("click", ()=>{
                slide($last, $first, "forward");
                clearInterval(slideInterval);
                slideInterval= setInterval(() => {
                    slide($last, $first, "forward");
                }, 6000);
            });
        }, 0);

    })(document);
    
    // CASAS DEL HOME
    ((d, w)=>{
        let f= 0,
            cardsWidth= w.innerWidth * 85 / 100,
            cantCards= Math.floor(cardsWidth / 285);
        const $casasCards= d.getElementsByClassName("home-casa-card");

        // Siempre muestra la cantidad necesaria de imagenes en pantalla (si entran 3, muestra 3. si entran 4, 4. Etc.)
        function showOnlyNecessary(first){
            let left;
            cardsWidth= w.innerWidth * 85 / 100;
            cantCards= Math.floor(cardsWidth / 330);
            const last= cantCards+first;

            for(let i=0; i<$casasCards.length; i++){
                if(i >= first && i < last){
                    left= cardsWidth / cantCards * (i - first) + (cardsWidth % 330 / (cantCards * 2)) - 25;
                    $casasCards[i].style.left= `${left}px`;
                } else{
                    $casasCards[i].style.left= 'calc(-15% - 500px)';
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
                open(`casas/${$casasCards[i].dataset.url}`, "_self");
            });
        };
    })(document, window);

    // COMO CONTACTARNOS
    (d=>{ 
        // EFECTO DE "ESCALERA"
        setTimeout(()=>{
            let $actual,
                started = false,
                stepsInterval;

            const $last= d.getElementById("c-step3");

            function hoverNextStep(){
                $previous= d.querySelector(".c-step-hovered");

                    if (!started) {
                        started=true;

                        $actual= d.getElementById("c-step1");
                        
                        $actual.style.setProperty("transform", "translateY(-16px)");
                        $actual.style.setProperty("background-color", "rgba(240, 240 , 240, 0.8)"); 
                        $actual.classList.toggle("c-step-hovered");

                        $previous.classList.toggle("c-step-hovered");
                    }else{
                        if ($previous == $last){
                            started = false;

                            $previous.style.setProperty("transform", "translateY(0px)");
                            $previous.style.setProperty("background-color", "var(--back-color-hover)");

                            clearInterval(stepsInterval);
                        }else{
                            $actual= $previous.nextElementSibling;

                            $previous.classList.toggle("c-step-hovered");
                            $actual.classList.toggle("c-step-hovered");

                            $previous.style.setProperty("transform", "translateY(0px)");
                            $previous.style.setProperty("background-color", "var(--back-color-hover)");

                            $actual.style.setProperty("transform", "translateY(-16px)");
                            $actual.style.setProperty("background-color", "rgba(235, 235 , 235, 0.8)"); 
                        };
                    };
            };

            setInterval(()=>{
                stepsInterval= setInterval(()=>{
                    hoverNextStep();
                }, 650);
            }, 7000/*Math.floor(Math.random() * (7000 - 4000)) + 4000)*/);
        }, 0);

        // EFECTO DEL BOTÓN
        setTimeout(()=>{
            let btnEfectInteval,
                arriba= false,
                counter= 0;
            const $btn= d.getElementById("c-step-btn");

            function btnEfect(){
                if (!arriba){
                    $btn.style.setProperty("transform", "translateY(-6px)");
                    arriba = true;
                } else if (counter== 2){
                    counter = 0;
                    arriba= false;
                    $btn.style.setProperty("transform", "translateY(0px)");
                    clearInterval(btnEfectInteval);
                } else{
                    $btn.style.setProperty("transform", "translateY(6px)");
                    arriba = false;
                    counter++;
                };
            };

            setInterval(()=>{
                btnEfectInteval= setInterval(()=>{
                    btnEfect();
                }, 200);
            }, 9000);
        }, 0);
    })(document);

    // EFECTOS AL APARECER EN PANTALLA
    ((d, w)=>{
        function setTransition(el, duration, type){
            el.style.setProperty("transition", `all ${duration} ${type}`);
        };

        // EFECTO DEL HOME TEXT
        setTimeout(()=>{
            const $borderTop= d.getElementById("ht-border-top"),
                $borderBottom= d.getElementById("ht-border-bottom"),
                $htTitle= d.getElementById("ht-top-title"),
                $htText= d.getElementById("ht-top-text"),
                $mainText= d.getElementById("ht-main"),
                $homeText= d.getElementById("home-text");

            setTransition($borderTop, "1s", "ease");
            setTransition($borderBottom, "1s", "ease");
            setTransition($htTitle, "2s", "ease-in");
            setTransition($htText, "2s", "ease-in");
            setTransition($mainText, "1s", "ease");
            
            function showEffectHT(){
                $borderTop.style.setProperty("transform", "translateX(0px)");
                $borderBottom.style.setProperty("transform", "translateX(0px)");
                $htTitle.style.setProperty("opacity", "1");
                $htText.style.setProperty("opacity", "1");
                $mainText.style.setProperty("transform", "translateY(0px)");
                $mainText.style.setProperty("opacity", "1");
            }; 

            function dissapearHT(){
                $borderTop.style.setProperty("transform", "translateX(-500px)");
                $borderBottom.style.setProperty("transform", "translateX(500px)");
                $htTitle.style.setProperty("opacity", "0");
                $htText.style.setProperty("opacity", "0");
                $mainText.style.setProperty("transform", "translateY(30px)");
                $mainText.style.setProperty("opacity", "0");
            };

            const effectHT = function (entry){
                if(entry[0].isIntersecting){
                    showEffectHT();
                } else{
                    dissapearHT();
                };
            };
        
            const observer= new IntersectionObserver(effectHT, {threshold: 0.3,});
            observer.observe($homeText);
        
            d.addEventListener("visibilitychange", e=>{
                if(d.visibilityState === 'visible'){
                    showEffectHT();
                } else{
                    dissapearHT();
                };
            });


        }, 0);

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

            for (let i=0; i<$cards.length; i++){
                setTransition($cards[i], "1s", "ease");
            }; 

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

        // EFECTO DE COMO CONTACTARNOS
        setTimeout(()=>{
            const $stepOne= d.getElementById("c-step1"),
                $stepTwo= d.getElementById("c-step2"),
                $stepThree= d.getElementById("c-step3"),
                $steps= d.getElementById("contact-steps"),
                $contactLink= d.getElementById("contact-link");

            setTransition($stepOne, ".8s", "ease");
            setTransition($stepTwo, ".8s", "ease");
            setTransition($stepThree, ".8s", "ease");
            setTransition($contactLink, "2s", "ease");

            function showEffectCC(){
                setTimeout(()=>{
                    $stepOne.style.setProperty("transform", "translateY(-20px)");
                    $stepOne.style.setProperty("opacity", "1");
                    $stepOne.style.setProperty("background-color", "rgba(240, 240 , 240, 0.8)");
                }, 0);
                setTimeout(()=>{
                    $stepTwo.style.setProperty("transform", "translateY(-20px)");
                    $stepTwo.style.setProperty("opacity", "1");
                    $stepTwo.style.setProperty("background-color", "rgba(240, 240 , 240, 0.8)");
                }, 200);
                setTimeout(()=>{
                    $stepThree.style.setProperty("transform", "translateY(-20px)");
                    $stepThree.style.setProperty("opacity", "1");
                    $stepThree.style.setProperty("background-color", "rgba(240, 240 , 240, 0.8)");
                }, 500);

                setTimeout(()=>{
                    $stepOne.style.setProperty("transform", "translateY(0px)");
                    $stepOne.style.setProperty("background-color", "var(--back-color-hover)");
                }, 400);
                setTimeout(()=>{
                    $stepTwo.style.setProperty("transform", "translateY(0px)");
                    $stepTwo.style.setProperty("background-color", "var(--back-color-hover)");
                }, 700);
                setTimeout(()=>{
                    $stepThree.style.setProperty("transform", "translateY(0px)");
                    $stepThree.style.setProperty("background-color", "var(--back-color-hover)");
                }, 1000);

                setTimeout(()=>{
                    $contactLink.style.setProperty("transform", "translateX(0px)");
                    $contactLink.style.setProperty("opacity", "1");
                }, 200);
            };

            function dissapearCC(){
                $stepOne.style.setProperty("transform", "translateY(60px)");
                $stepTwo.style.setProperty("transform", "translateY(60px)");
                $stepThree.style.setProperty("transform", "translateY(60px)");
                $stepOne.style.setProperty("opacity", "0");
                $stepTwo.style.setProperty("opacity", "0");
                $stepThree.style.setProperty("opacity", "0");

                $contactLink.style.setProperty("transform", "translateX(50px)");
                $contactLink.style.setProperty("opacity", "0");
            };

            const effectCC= function(entry){
                if(entry[0].isIntersecting){
                    showEffectCC();
                } else{
                    dissapearCC();
                };
            };

            const observer1= new IntersectionObserver(effectCC, {threshold: 0.2,});
            observer1.observe($steps);

            d.addEventListener("visibilitychange", e=>{
                if(d.visibilityState === 'visible'){
                    showEffectCC();
                } else{
                    dissapearCC();
                };
            });
        }, 0);

    })(document, window);
});