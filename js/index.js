$(window).on("load", () => {
    $port.hideLoading();
    setTimeout(function(){
        $(".port-main .animate-slide").addClass("animated");
    },2000);
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

    if(scrTop >= 500) {
        $(".port-about__list .animate-stick").addClass("animated");
    }
    if(scrTop >= 1200) {
        $(".port-works .animate-skew").addClass("animated");
    }
    if(scrTop >= 2550) {
        $(".port-skill .animate-drop").addClass("animated");
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
            $(".animated").removeClass("animated");
            setTimeout(function(){
                loadingWrap.fadeOut(300);
            },300);
            setTimeout(function(){
                $(".port-main__box").css("opacity","1");
                $("body.home-body").addClass("scrollable");
            },1000);

            $(".port-main__back.gobong").addClass('active');
        },500);
    }
};