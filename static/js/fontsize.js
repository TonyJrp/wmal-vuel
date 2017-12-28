(function(){
    htmlsize();
    window.onresize = function() {
        htmlsize();
    }

    function htmlsize() {
        var x = 750 / 100;
        var width = document.body.clientWidth;
        var fsize = width / x;
        if(fsize < 40) {
            fsize = 40;
        }
        document.querySelector('html').style.fontSize = fsize + "px";
        document.querySelector('body').style.fontSize = fsize + "px";
    }
})()