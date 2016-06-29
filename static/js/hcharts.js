    var jq=jQuery.noConflict();
    var datalist=new Array();
    function getpic(Id){
        var s1 =document.getElementById(Id).value;
        GetHighcharts(s1)
    };
    jq(document).ready(function(){
        var s1=jq('#test').val();
        var s2=jq('#data1').val();
        var s=s2.split(';');
        for (i=0;i<s.length;i++){
            datalist.push(s[i])
        }
        if (s1){
        GetHighcharts(s1)
        }
        jq('#tags').autocomplete({
            source: datalist
        });
    });
    function GetHighcharts(s1){
    var s=s1.split('|')[0]
    var path = "/flow/json/?json="+s;
    var msg=s1.split('|')
    jq("#textarea1").val("内网IP: "+msg[1]+"\n联通出口IP: "+msg[3]+"\n电信出口IP: "+msg[2]+"\n移动出口IP: "+msg[4]+"\n域名: "+msg[5]);
    jq.getJSON(path, function(result) {
        var data = result.data;
        var vars = new Array(),
                dataLength = data.length;
                for (i=0;i<12;i++){
                    vars[i] = new Array();
                }
        var tag=0;
        for (i = 0; i < dataLength; i++) {
                if (msg[2]=='null'){
                for (j=4;j<8;j++){
                vars[j].push([
                    data[i][0],
                    data[i][j-3]
                ])
                }
                }
                else{
                for ( j=0;j<8;j++){
                vars[j].push([
                data[i][0],
                data[i][j+1] 
                ])
                }
                if (msg[4]!='null'){
                try{
                    for (k=8;k<12;k++){
                        vars[k].push([
                            data[i][0],
                            data[i][k+1]
                        ]);
                        tag=1
                        }
                }
                catch (e){
                    continue
                }
                }
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
