addEventListener("DOMContentLoaded", e=>{
    
    (d=>{ // SLIDER
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
            cantCards= Math.floor(cardsWidth / 285);
            const last= cantCards+first;

            for(let i=0; i<$casasCards.length; i++){
                if(i >= first && i < last){
                    left= cardsWidth / cantCards * (i - first) + (cardsWidth % 285 / (cantCards * 2)) - 25;
                    $casasCards[i].style.left= `${left}px`;
                } else{
                    $casasCards[i].style.left= 'calc(-15% - 280px)';
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

    })(document, window);
});

