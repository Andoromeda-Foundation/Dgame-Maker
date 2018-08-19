
console.info(getBeforeHour(24))
console.log(getBeforeHour(0))
console.log(getBeforeMinute(60))
console.log(getBeforeMinute(0))
var kApi="http://dasdaq-webapi.chinacloudsites.cn/api/Candlestick/dgm?Interval=12h&Begin="+getBeforeDate(30)+"T00:00:00Z&End="+getBeforeDate(0)+"T23:59:59Z";
function btnFun(flag){
    var inval = "12h";
    var begin = getBeforeDate(30)+"T00:00:00Z";
    var end = getBeforeDate(0)+"T24:00:00Z"
    jQuery('.toggle-button-item').removeClass('active');
    if (flag === "m") {
        jQuery('#perMin').addClass('active');
        inval = "1m";
        begin = getBeforeHour(3)
        end = getBeforeHour(2)
    } else if (flag === "h") {
        jQuery('#perHour').addClass('active');
        inval = "1h";
        begin = getBeforeDate(1)+"T00:00:00Z";
        end = getBeforeDate(0)+"T24:00:00Z";
    } else {
        jQuery('#perDay').addClass('active');
        inval = "1d";
        begin = getBeforeDate(30)+"T00:00:00Z";
        end = getBeforeDate(0)+"T24:00:00Z"
    }
    kApi="http://dasdaq-webapi.chinacloudsites.cn/api/Candlestick/dgm?Interval="+inval+"&Begin="+begin+"&End="+end;
//        getData(kApi)   product
    kLine(flag);//mock
}
kLine("m"); //mock
//    getData(kApi);  product
function getData(kApi) {
    jQuery.getJSON(kApi,function (data) {
//       console.log(data)
        if(data){
            if(data.code=="200"){
                data = data.data.values;
                var dt=[];
                for(var i=0;i<data.length;i++){
//                    var item=[data[i].time.replace("T"," ").replace("Z",""),data[i].opening,data[i].closing,data[i].min,data[i].max] // 开盘，收盘，最低，最高
                    var item=[data[i].time,data[i].opening,data[i].closing,data[i].min,data[i].max]
                    dt.push(item);
                }
                kLine(dt);
            }else {
                alert("Service error")
            }

        }else {
            alert("Contract the manager")
        }
    })
}
var interval= 60
setInterval(()=>getData(),1000*interval);
function $(n){return document.getElementById(n);}
function onbuy(){
    var v = parseFloat($("buyTokenInput").value);
    if (v) {
        var recommendAddressArr = window.location.href.split("?")
        recommendAddress = recommendAddressArr[1]?recommendAddressArr[1]:Pay.myAddress;
        Pay.buy(recommendAddress,v, new Callback(function () {
            alert("购买成功");
        }, this));
    }
    else{
        $("buyTokenInput").focus();
    }
}
function onsell(){
    var v = parseFloat($("sellTokenInput").value);
    if (v) {
        var b = new BigNumber(v);
        b = b.multipliedBy(10e17);
        Pay.sell(b.toString(), new Callback(function () {
            alert("卖出成功");
        }, this))
    }
    else{
        $("sellTokenInput").focus();
    }
}
function searchTest(){
    if(!Pay.myAddress){
        $("myToken").innerHTML = "";
        return;
    }
    Pay.callFunc("balanceOf",new Callback(function (token) {
        $("myToken").innerHTML = "(Token:"+Pay.toToken(token)+")";
        $("myTokenDiv").innerHTML = Pay.toToken(token);
        setTimeout(searchTest,1000);
    }, this),[Pay.myAddress]);
}
// web3
Pay.init(new Callback(function (myAccount) {
    console.log(myAccount);
    if(myAccount){
        $("myAddress").innerHTML = Pay.myAddress.substr(0,8)+"..."+Pay.myAddress.substr(36);
        $("myToken").innerHTML = "(Token:查询中)";
        $("myTokenDiv").innerHTML = "--";
        $("myRecommendSpan").innerHTML = window.location.href.split("?")[0] + "?" + myAccount;
        $("myTransactionRecord").href = "https://kovan.etherscan.io/address/"+myAccount;
        openUI("myMsg");
        searchTest();
    }
    else{
        $("myAddress").innerHTML = "未登录";
        $("myToken").innerHTML = "";
        $("myTokenDiv").innerHTML = "--";
        $("myRecommendSpan").innerHTML = "--";
        $("myTransactionRecord").href = "";
        openUI("noLoginBox");
    }
}, this));

function getPrice(){
    Pay.callFunc("buyPrice", new Callback(function (r) {
        $("priceSpan").innerHTML = Pay.toToken(r,8);
        setTimeout(getPrice,5000);
    }, this));

}
try {
    getPrice();
    var isFristGetMyDividend = true;
    Pay.callFunc("myDividends", new Callback(function (r) {
        var v = Pay.toToken(r,8);
        if(v!="0.00000000" || !isFristGetMyDividend) {
            $("myDividendDiv").innerHTML = Pay.toToken(r, 8);
        }
        isFristGetMyDividend = false;
        setTimeout(getMyDividend,5000);
    }, this),[true]);
} catch (ex) {
    console.warn(ex.toString());
}


function withdraw(){
    if(!Pay.myAddress)return;
    Pay.callFunc("withdraw", new Callback(function (r) {
        alert("提现请求成功!");
    }, this));
}

var easyToI;
function easyTo(toY){
    if(easyToI)clearInterval(easyToI);
    easyToI = setInterval(function(){
        var curY = getScroll();
        setScroll(curY + parseInt(toY-curY)/10);
        if(Math.abs(parseInt(toY-curY))<=10){
            setScroll(toY);
//                document.documentElement.scrollTop = toY;
            clearInterval(easyToI);
        }
    },0);
}
function getScroll(){
    return document.documentElement.scrollTop == 0?document.body.scrollTop:document.documentElement.scrollTop;
}
function setScroll(n){
    document.documentElement.scrollTop = document.body.scrollTop =  n;
}
// user
function openUI(ui){
    var arr = ["myMsg","buyBox","sellBox","helpBox","noLoginBox"];
    for(var i in arr){
        $(arr[i]).style.display = "none";
    }
    $(ui).style.display = "block";
    if(ui=="buyBox") $("buyTokenInput").focus();
    if(ui=="sellBox") $("sellTokenInput").focus();
}
function back(){
    openUI("myMsg");
}