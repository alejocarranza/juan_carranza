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

        setInterval(() => {
            slide($last, $first, "forward");
        }, 6000);

        setTimeout(() => {
            const $aLeft= d.getElementById("a-left"),
                $aRight= d.getElementById("a-right");
            $aLeft.addEventListener("click", ()=>{
                slide($last, $first, "back");
            });
            $aRight.addEventListener("click", ()=>{
                slide($last, $first, "forward");
            });
        }, 0);

    })(document);
    
    // CASAS DEL HOME
    ((d, w)=>{
        // Siempre muestra la cantidad necesaria de imagenes en pantalla (si entran 3, muestra 3. si entran 4, 4. Etc.)
        function showOnlyNecessary(){
            const $casasCards= d.getElementsByClassName("home-casa-card"),
                cardsWidth= w.innerWidth * 85 / 100,
                cantCards= Math.floor(cardsWidth / 285);
            
            let left;

            for(let i=0; i<$casasCards.length; i++){
                if(i < cantCards){
                    left= cardsWidth / cantCards * i + (cardsWidth % 285 / (cantCards * 2)) - 25;
                    $casasCards[i].style.left= `${left}px`;
                } else{
                    $casasCards[i].style.left= 'calc(-15% - 280px)';
                };
            };
        };
        setTimeout(()=>{
            showOnlyNecessary();
        }, 0);
        w.addEventListener('resize', e=>{
            showOnlyNecessary();
        });
        
        // Funcionalidad a las flechas
        const $aLeft= d.getElementById("hc-left"),
            $aRight= d.getElementById("hc-right");

        function moveRight(){
            console.log("derecha");
        };
        function moveLeft(){
            console.log("izquierda");
        };

        $aRight.addEventListener("click", e=>{
            moveRight();
        });
        $aLeft.addEventListener("click", e=>{
            moveLeft();
        });

    })(document, window);
});

