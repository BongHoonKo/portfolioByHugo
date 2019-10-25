$(window).on("load resize", () => {
    let winWidth = window.innerWidth;
    if(winWidth <= 1199) {
        setTimeout(function(){
            $port.postAlign(2);
        },200);
    }
    else {
        setTimeout(function(){
            $port.postAlign(3);
        },200);
    }
});

let $port = {
    postAlign : (num) => {
        /* 포스트 summary 정렬 관련 */
        let heightArray = [];
        let $targetElm = ".port-works__list > li:nth-of-type(";
        for (let i = 0; i < num ; i++) {
            let $box = $($targetElm + num +"n+" + i + ")");
            let boxTarget = $targetElm + num +"n+" + i + ")";
            if( i === 0 ) {
                $box = $($targetElm + num +"n)");
                boxTarget = $targetElm + num +"n)";
            }
            let boxHeight = $box.eq(0).outerHeight();
            for (let n = 1; n < $box.length; n++) {
                    let prevHeight = 0;
                    $box.eq(n).prevAll(boxTarget).each(function () {
                    prevHeight += $(this).outerHeight();
                });
                $box.eq(n).css("top", prevHeight + "px");
                boxHeight += $box.eq(n).outerHeight();
            }
            $box.eq(0).css("top", 0);
            heightArray.push(boxHeight);
        }
        let maxHeight = Math.max.apply(null, heightArray);
        $(".port-works__list").css("height", maxHeight + 20 + "px");
    }
};