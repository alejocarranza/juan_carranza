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
    

    // Hago el slider responsive
});