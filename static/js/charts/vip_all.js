function myrefresh()
{
    window.location.reload();
}
setTimeout('myrefresh()',60000)

var jq=jQuery.noConflict();    
function GetHighcharts(s,t,path){
    jq.getJSON(path, function(result) {
        var data = result.data;
        var vars = new Array(),
                dataLength = data.length;
                for (i=0;i<12;i++){
                    vars[i] = new Array();
                }
        for (i = 0; i < dataLength; i++) {
                for ( j=0;j<12;j++){
                vars[j].push([
                data[i][0],
                data[i][j+1] 
                ])
                }
        }
        jq('#0'+s).highcharts('StockChart', {
        credits:{enabled:false},
        chart: {type:'line',zoomType:'x'},
        plotOptions: {line :{lineWidth:3}},
        legend:{enabled: true},
        rangeSelector : {
            buttons : [
            {type : 'hour',count : 1,text : '1h'}, 
            {type : 'hour',count : 3,text : '3h'}, 
            {type : 'hour',count : 6,text : '6h'}, 
            {type : 'hour',count : 12,text : '12h'},
            {type : 'day',count : 1,text : '1D'},
            {type: 'day',count:3,text:'3D'},
            {type : 'all',count : 1,text : 'All'}],
            selected : 4,
        },
        title: {text: t+'联通流量总曲线图'},
        yAxis: [{title: {text: 'bps'},height: 200,lineWidth: 1,min:0,}, 
                {title: {text: 'pps'},top: 300,height: 200,offset: 0,lineWidth: 1,min:0}],
        series: [
        {name : '联通bps-OUT',data : vars[1],tooltip: {valueDecimals: 2},color: "red",},
        {name : '联通bps-IN',data : vars[0],tooltip: {valueDecimals: 2},color: "purple",},
        {name : '联通pps-OUT',data : vars[3],tooltip: {valueDecimals: 2},yAxis: 1,color: "blue",},
        {name : '联通pps-IN',data : vars[2],tooltip: {valueDecimals: 2},yAxis: 1,color: "green",}
        ],
        plotOptions :{
            series:{
                point:{
                    events : {
                        click: function() {
                            window.open('http://nsda.ops.ctripcorp.com/flow/vipdetail/?idc='+s+'&tag=unicom&time='+this.x)
                        }
                    }
                }
            }
        }
        });
        jq('#1'+s).highcharts('StockChart', {
        credits:{enabled:false},
        chart: {type:'line',zoomType:'x'},
        plotOptions: {line :{lineWidth:3}},
        legend:{enabled: true},
        rangeSelector : {
            buttons : [
            {type : 'hour',count : 1,text : '1h'}, 
            {type : 'hour',count : 3,text : '3h'}, 
            {type : 'hour',count : 6,text : '6h'}, 
            {type : 'hour',count : 12,text : '12h'},
            {type : 'day',count : 1,text : '1D'},
            {type: 'day',count:3,text:'3D'},
            {type : 'all',count : 1,text : 'All'}],
            selected : 4,
        },
        title: {text: t+'电信流量总曲线图'},
        yAxis: [{title: {text: 'bps'},height: 200,lineWidth: 1,min:0,}, 
                {title: {text: 'pps'},top: 300,height: 200,offset: 0,lineWidth: 1,min:0}],
        series: [
        {name : '电信bps-OUT',data : vars[5],tooltip: {valueDecimals: 2},color: "red",},
        {name : '电信bps-IN',data : vars[4],tooltip: {valueDecimals: 2},color: "purple",},
        {name : '电信pps-OUT',data : vars[7],tooltip: {valueDecimals: 2},yAxis: 1,color: "blue",},
        {name : '电信pps-IN',data : vars[6],tooltip: {valueDecimals: 2},yAxis: 1,color: "green",}
        ],
        plotOptions :{
            series:{
                point:{
                    events : {
                        click: function() {
                            window.open('http://nsda.ops.ctripcorp.com/flow/vipdetail/?idc='+s+'&tag=telecom&time='+this.x)
                        }
                    }
                }
            }
        }
        });
        jq('#2'+s).highcharts('StockChart', {
        credits:{enabled:false},
        chart: {type:'line',zoomType:'x'},
        plotOptions: {line :{lineWidth:3}},
        legend:{enabled: true},
        rangeSelector : {
            buttons : [
            {type : 'hour',count : 1,text : '1h'}, 
            {type : 'hour',count : 3,text : '3h'}, 
            {type : 'hour',count : 6,text : '6h'}, 
            {type : 'hour',count : 12,text : '12h'},
            {type : 'day',count : 1,text : '1D'},
            {type: 'day',count:3,text:'3D'},
            {type : 'all',count : 1,text : 'All'}],
            selected : 4,
        },
        title: {text: t+'移动流量总曲线图'},
        yAxis: [{title: {text: 'bps'},height: 200,lineWidth: 1,min:0,}, 
                {title: {text: 'pps'},top: 300,height: 200,offset: 0,lineWidth: 1,min:0}],
        series: [
        {name : '移动bps-OUT',data : vars[9],tooltip: {valueDecimals: 2},color: "red",},
        {name : '移动bps-IN',data : vars[8],tooltip: {valueDecimals: 2},color: "purple",},
        {name : '移动pps-OUT',data : vars[11],tooltip: {valueDecimals: 2},yAxis: 1,color: "blue",},
        {name : '移动pps-IN',data : vars[10],tooltip: {valueDecimals: 2},yAxis: 1,color: "green",}
        ],
        plotOptions :{
            series:{
                point:{
                    events : {
                        click: function() {
                            window.open('http://nsda.ops.ctripcorp.com/flow/vipdetail/?idc='+s+'&tag=mobile&time='+this.x)
                        }
                    }
                }
            }
        }
        });
        // create the chart
});
};
GetHighcharts('JinQiao','金桥',"/flow/alljson");
GetHighcharts('OuYang','欧阳',"/flow/alljson_oy");

