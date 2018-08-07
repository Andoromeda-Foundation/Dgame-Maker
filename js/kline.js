/**
 * Created by Dawn on 2018-08-03.
 */


function kLine(xData,yData) {
    var o = document.getElementById("kId");
    var height = document.documentElement.clientHeight;
    height -= 100;
    height = 592;
    o.style.height= height+"px";
    o.style.width= "800px";

    this.chart = echarts.init(o,'macarons');

    var option = {
        tooltip : {
            trigger: 'axis',
            formatter: function (params) {// 开盘，收盘，最低，最高
                var res = params[0].seriesName + ' ' + params[0].name;
                res += '<br/>  开盘 : ' + params[0].value[1] + '  最高 : ' + params[0].value[4];
                res += '<br/>  收盘 : ' + params[0].value[2] + '  最低 : ' + params[0].value[3];
                return res;
            }
        },
     /*   legend: {
            data:['上证指数']
        },*/
     /*       toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataZoom : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
       dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end : 50
        },*/
        xAxis : [
            {
                type : 'category',
                boundaryGap : true,
                axisTick: {onGap:false},
                splitLine: {show:false},
                data :xData
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                boundaryGap: [0.01, 0.01]
            }
        ],
        series : [
            {
                 // value:[0,0,0,0],
                name:'日期',
                type:'k',
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        color: 'red',           // 阳线填充颜色
                        color0: 'lightgreen',   // 阴线填充颜色
                        lineStyle: {
                            width: 2,
                            color: 'orange',    // 阳线边框颜色
                            color0: 'green'     // 阴线边框颜色
                        }
                    },
                    emphasis: {
                        color: 'black',         // 阳线填充颜色
                        color0: 'white'         // 阴线填充颜色
                    }
                },
                data:yData
                ,
             /*   markPoint : {
                    symbol: 'star',
                    //symbolSize:20,
                    itemStyle:{
                        normal:{label:{position:'top'}}
                    },
                    data : [
                        {name : '最高', value : 2444.8, xAxis: '2013/2/18', yAxis: 2466}
                    ]
                }*/
            }
        ]
    };
    this.chart.setOption(option);
}

function FormTime(time) {
    if(time){
        var times=time.split("T");
        time = times[0];
        return time;
    }else {
        return "";
    }
}
