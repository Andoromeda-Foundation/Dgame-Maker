// resize
window.onload=onPageResize;
window.onresize=onPageResize;
function onPageResize(){
    var w = document.documentElement.clientWidth;
    var resizeArr = ["title","bodybg","kx","kx2","projectList","canvasBuilder","underworldbg","roadmap","recite","contact","underworld"];
    if(w<1300){
        for(var i in resizeArr){
            document.getElementById(resizeArr[i]).style.width = "1300px";
        }
    }
    else{
        for(var i in resizeArr){
            document.getElementById(resizeArr[i]).style.width = "100%";
        }
    }
}
// effect
var bgOpacity = 1.0;
var bgOpacityD = -0.001;
var tokenAngle = 0;
setInterval(function(){
    bgOpacity+=bgOpacityD;
    if(bgOpacity<=0.3||bgOpacity>=1){
        bgOpacityD*=-1;
    }
    $("bodybg").style.opacity = bgOpacity;
    $("dgmTokenImg").style.opacity = (1-bgOpacity)*0.3 + 0.05;
    $("dgmTokenImg").style.transform = "rotate("+tokenAngle+"deg)";
    tokenAngle+=0.05;
},0)