$(window).on("load", () => {
    $port.hideLoading();
});
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

$(window).on("scroll load resize", () => {
    let mainHeight = $(".port-main__wrap").outerHeight();
    let scrTop = $(document).scrollTop();
    let $navBar = $(".navbar");
    if(scrTop >= mainHeight) {
        $navBar.addClass("changed");
    }
    else {
        $navBar.removeClass("changed");
    }
});

let $port = {
    postAlign : (num) => {
        /* 포스트 summary 정렬 관련 */
        let heightArray = [];
        let $targetElm = ".box-align__list > li:nth-of-type(";
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
        $(".box-align__list").css("height", maxHeight + 20 + "px");
    },
    directLink : function(url) {
        window.open(url);
    },
    hideLoading : function() {
        setTimeout(function(){
            let loadingWrap = $(".port-loading__wrap");
            let mainHeight = $(".port-main__wrap").height();
            loadingWrap.height(mainHeight);
            window.top.scrollTo(0,0);
            setTimeout(function(){
                loadingWrap.fadeOut(300);
            },500);
            setTimeout(function(){
                $(".port-main__box").css("opacity","1");
                $("body").addClass("scrollable");
            },1000);
        },500);
    }
};