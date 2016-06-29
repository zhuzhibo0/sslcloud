var jq=jQuery.noConflict();
function GetHighcharts(name,tag){
    jq.getJSON("/flow/api?action=get_charts&idc=JinQiao&vs_name=CS_Hotels",function(result) {
    alert(result);
    var data = result.data;
    var vars = new Array(),
    dataLength = data.length;
    for (i=0;i<8;i++){
        vars[i] = new Array();
    }
    for (i=0; i<dataLength; i++) {
        for (j=0;j<8;j++){
            vars[j].push([
                data[i][0],
                data[i][j+1]
                ])
            }
    }
    jq('#container').highcharts('StockChart', {
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
                    text: name+'流量曲线图'
        },

        yAxis: [{
            title: {
                text: 'bps'
            },
            lineWidth: 1,
            min:0,
        }],
        
        series: [
        {
            name : '联通bps-OUT',
            data : vars[5],
            color: "red",
        },{
            name : '电信bps-OUT',
            data : vars[1],
            color : "purple",
        },
        {
            name : '联通bps-IN',
            data : vars[4],
            color: "blue",
        },{
            name : '电信bps-IN',
            data : vars[0],
            color: "green",
        }
        ]
    });
});
}; 
GetHighcharts('CS_Hotels','JinQiao');
