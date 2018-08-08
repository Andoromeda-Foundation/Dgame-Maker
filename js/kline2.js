
var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';




function kLine(data0) {
    var o = document.getElementById("kId");
    var height = document.documentElement.clientHeight;
    height -= 100;
    height = 592;
    o.style.height= height+"px";
    o.style.width= "800px";

    this.chart = echarts.init(o,'macarons');

     data0 = splitData(data0)
// 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)

    function splitData(rawData) {
        var categoryData = [];
        var values = []
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }



    option = {
        /*title: {
            text: '上证指数',
            left: 0
        },*/
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: ['hour', 'day'],
            textStyle:{
                color:'#fff'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: data0.categoryData,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                y: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                // name: '日期',
                type: 'candlestick',
                data: data0.values,
                itemStyle: {
                    normal: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    }
                },
              /*  markPoint: {
                    label: {
                        normal: {
                            formatter: function (param) {
                                return param != null ? Math.round(param.value) : '';
                            }
                        }
                    },
                    data: [
                        {
                            name: 'XX标点',
                            coord: ['2013/5/31', 2300],
                            value: 2300,
                            itemStyle: {
                                normal: {color: 'rgb(41,60,85)'}
                            }
                        },
                        {
                            name: 'highest value',
                            type: 'max',
                            valueDim: 'highest'
                        },
                        {
                            name: 'lowest value',
                            type: 'min',
                            valueDim: 'lowest'
                        },
                        {
                            name: 'average value on close',
                            type: 'average',
                            valueDim: 'close'
                        }
                    ],
                    tooltip: {
                        formatter: function (param) {
                            return param.name + '<br>' + (param.data.coord || '');
                        }
                    }
                },*/
              /*  markLine: {
                    symbol: ['none', 'none'],
                    data: [
                        [
                            {
                                name: 'from lowest to highest',
                                type: 'min',
                                valueDim: 'lowest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            },
                            {
                                type: 'max',
                                valueDim: 'highest',
                                symbol: 'circle',
                                symbolSize: 10,
                                label: {
                                    normal: {show: false},
                                    emphasis: {show: false}
                                }
                            }
                        ],
                        {
                            name: 'min line on close',
                            type: 'min',
                            valueDim: 'close'
                        },
                        {
                            name: 'max line on close',
                            type: 'max',
                            valueDim: 'close'
                        }
                    ]
                }*/
            },
           /* {
                name: 'hour',
                type: 'line',
                data: calculateMA(1),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'day',
                type: 'line',
                data: calculateMA(24),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },*/
           /* {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
            {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },*/

        ]
    };





    this.chart.setOption(option);
}
function getBeforeDate(n) {
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon = d.getMonth() + 1;
    var day = d.getDate();
    if(day <= n) {
        if(mon > 1) {
            mon = mon - 1;
        } else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
}

function getBeforeHour(n) {
    var currDate = new Date();
    var beforehour=currDate.getTime()-n*60*60*1000;
    var date=new Date(beforehour)
    return date.toISOString()
}

function getBeforeMinute(n) {
    var currDate = new Date();
    var beforehour=currDate.getTime()-n*60*1000;
    var date=new Date(beforehour)
    return date.toISOString()
}

var byTime = [365*24*60*60*1000,24*60*60*1000,60*60*1000,60*1000,1000];
var unit = ["年","天","小时","分钟","秒钟"];
function str(atime) {

    var ct = new Date().getTime - atime.getTime();
    if (ct < 0) {
        return "瞎糊闹！"
    }

    var sb = [];
    for (var i = 0; i < byTime.length; i++) {
        if (ct < byTime[i]) {
            continue;
        }
        var temp = Math.floor(ct / byTime[i]);
        ct = ct % byTime[i];
        if (temp > 0) {
            sb.push(temp + unit[i]);
        }


        /*一下控制最多输出几个时间单位：
         一个时间单位如：N分钟前
         两个时间单位如：M分钟N秒前
         三个时间单位如：M年N分钟X秒前
         以此类推
         */
        if (sb.length >= 1) {
            break;
        }
    }
    document.write(sb.join("") + "前");
}