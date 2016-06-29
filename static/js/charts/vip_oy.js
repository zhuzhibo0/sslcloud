function myrefresh()
{
    window.location.reload();
}
setTimeout('myrefresh()',180000)

var jq=jQuery.noConflict();
    function GetHighcharts(s){
    var path = "/flow/json/?lb=oy&json="+s;
        jq.getJSON(path, function(result) {
                var data = result.data;
                var vars = new Array(),
                dataLength = data.length;
                for (i=0;i<12;i++){
                    vars[i] = new Array();
                }
                var tag=0;
                for (i = 0; i < dataLength; i++) {
                for ( j=0;j<12;j++){
                vars[j].push([
                                data[i][0],
                                data[i][j+1] 
                ])
                }
        }
                jq('#'+s).highcharts('StockChart', {
                        credits:{
                            enabled:false
                            },
                        chart: {
                            type:'line',
                            zoomType:'x'
                            },
                         plotOptions: {
                            line :{
                                lineWidth:1
                                }
                                },
                        legend:{
                            enabled: true
                        },
                        rangeSelector : {
                                buttons : [{
                                        type : 'hour',
                                        count : 1,
                                        text : '1h'
                                }, 
                                {
                                        type : 'hour',
                                        count : 3,
                                        text : '3h'
                                }, 
                                {
                                        type : 'hour',
                                        count : 6,
                                        text : '6h'
                                }, {
                                        type : 'hour',
                                        count : 12,
                                        text : '12h'
                                },{
                                        type : 'day',
                                        count : 1,
                                        text : '1D'
                                },{
                                        type: 'day',
                                        count:3,
                                        text:'3D'
                                },
                                {
                                        type : 'all',
                                        count : 1,
                                        text : 'All'
                                }],
                                selected : 4,
                        },

                    title: {
                        text: s+'流量曲线图'
                    },

                    yAxis: [{
                        title: {
                            text: 'bps'
                        },
                        height: 200,
                                lineWidth: 1,
                        min:0,
                    }, {
                        title: {
                            text: 'pps'
                        },
                        top: 300,
                        height: 200,
                        offset: 0,
                        lineWidth: 1,
                        min:0
                    }],
                    
                    series: [
                        {
                                name : '联通bps-OUT',
                                data : vars[5],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                color: "red",
                        },{
                                name : '电信bps-OUT',
                                data : vars[1],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                color : "purple",
                        },
                        {
                                name : '联通bps-IN',
                                data : vars[4],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                color: "blue",
                        },{
                                name : '电信bps-IN',
                                data : vars[0],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                color: "green",
                        },{
                                name : '联通pps-OUT',
                                data : vars[7],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                yAxis: 1,
                                color:"red",
                    },{
                                name : '电信pps-OUT',
                                data : vars[3],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                yAxis: 1,       
                                color: "purple",
                    },{
                                name : '联通pps-IN',
                                data : vars[6],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                yAxis: 1,       
                                color: "blue",
                    },{
                                name : '电信pps-IN',
                                data : vars[2],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                yAxis: 1,       
                                color: "green",
            },
                        {
                                name : '移动bps-OUT',
                                data : vars[9],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                color : "black",
                        },{
                                name : '移动bps-IN',
                                data : vars[8],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                color: "brown",
                        },{
                                name : '移动pps-OUT',
                                data : vars[11],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                yAxis: 1,       
                                color: "black",
                    },{
                                name : '移动pps-IN',
                                data : vars[10],
                                tooltip: {
                                        valueDecimals: 2
                                },
                                yAxis: 1,       
                                color: "brown",
            }
                        
            ]
                });
        });
};
GetHighcharts('VS_Piao');
GetHighcharts('VIP_Huodong');
GetHighcharts('VS_Car');
GetHighcharts('VS_Beta-tbooking');
GetHighcharts('CS_Flights');
GetHighcharts('CS_Flights_ws');
GetHighcharts('VIP_Tbooking');
