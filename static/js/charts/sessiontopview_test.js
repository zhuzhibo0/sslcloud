var src_top_session_ydata=new Array();
var src_top_session_pointdata=new Array();
var src_top_session_sendpointdata=new Array();
var src_top_session_receavepointdata=new Array();

var dst_top_session_ydata=new Array();
var dst_top_session_pointdata=new Array();
var dst_top_session_sendpointdata=new Array();
var dst_top_session_receavepointdata=new Array();

if($("#tm").val()!=""){
                tm=$("#tm").val();
}
$(document).ready(function(){
            $("#tm").val(tm);
            self.setInterval("fresh()", 2*60000);
});
function fresh(){
	getdata();
	//draw_src_session_top();
    getdata_dst();
    //draw_dst_session_top();
}

function getdata(){
    src_top_session_ydata = [];
    src_top_session_pointdata = [];
    src_top_session_sendpointdata = [];
    src_top_session_receavepointdata = [];
	$.ajax({
            type: "get",
            async: false,
            url: "http://192.168.18.68:8000/policy/get_top_session/src_sh_nt_top_session/",
            dataType: "json",
            success: function(results){
                message = results["message"];
                t = results["time"];
                max_num = results["max"];
                //alert(t);
                var timestamp2 = Date.parse(new Date(t));
                timestamp2 = timestamp2 / 1000;
                div = document.getElementById("src_sh_nt_session_top");
                //alert(div.innerHTML);
                div.innerHTML = "";
                for(var j=0; j<message.length; j++){
                    src_top_session_ydata = [];
                    src_top_session_pointdata = [];
                    for(var i=0; i<message[j].length; i++)
                    {
                        one = message[j][i];
                        src_top_session_ydata.push(one["address"]);
                        src_top_session_pointdata.push((one["count"]));
                        //src_top_session_sendpointdata.push(one["send_count"]/1000);
                        //src_top_session_receavepointdata.push(one["receave_count"]/1000);
                    }
                    var child_div = document.createElement("div");
                    child_div_name = "src_sh_nt_session_top_"+j.toString();
                    child_div.setAttribute("id",child_div_name);
                    child_div.setAttribute("style","height:300px");
                    div.appendChild(child_div);
                    var newDate = new Date();
                    timestamp3 = timestamp2 - j*2*60;
                    newDate.setTime(timestamp3 * 1000);
                    //alert(timestamp3);
                    str_t = newDate.toLocaleString().replace(/:\d{1,2}$/,'');
                    draw_src_session_top(str_t,max_num,child_div_name,src_top_session_ydata,src_top_session_pointdata,"src_sh_nt");
                }
				
			},
			error: function(errorMsg){
                        alert(errorMsg);
                    }
		});
        $.ajax({
            type: "get",
            async: false,
            url: "http://192.168.18.68:8000/policy/get_top_session/dst_sh_nt_top_session/",
            dataType: "json",
            success: function(results){
                message = results["message"];
                t = results["time"];
                max_num = results["max"];
                //alert(t);
                var timestamp2 = Date.parse(new Date(t));
                timestamp2 = timestamp2 / 1000;
                div = document.getElementById("dst_sh_nt_session_top");
                div.innerHTML = "";
                for(var j=0; j<message.length; j++){
                    src_top_session_ydata = [];
                    src_top_session_pointdata = [];
                    for(var i=0; i<message[j].length; i++)
                    {
                        one = message[j][i];
                        src_top_session_ydata.push(one["address"]);
                        src_top_session_pointdata.push((one["count"]));
                        //src_top_session_sendpointdata.push(one["send_count"]/1000);
                        //src_top_session_receavepointdata.push(one["receave_count"]/1000);
                    }
                    var child_div = document.createElement("div");
                    child_div_name = "dst_sh_nt_session_top_"+j.toString();
                    child_div.setAttribute("id",child_div_name);
                    child_div.setAttribute("style","height:300px");
                    div.appendChild(child_div);
                    var newDate = new Date();
                    timestamp3 = timestamp2 - j*2*60;
                    newDate.setTime(timestamp3 * 1000);
                    //alert(timestamp3);
                    str_t = newDate.toLocaleString().replace(/:\d{1,2}$/,'');
                    draw_src_session_top(str_t,max_num,child_div_name,src_top_session_ydata,src_top_session_pointdata,"dst_sh_nt");
                }

            },
            error: function(errorMsg){
                        alert(errorMsg);
                    }
        });
			
}
function getdata_dst(){
    dst_top_session_ydata = [];
    dst_top_session_pointdata = [];
    dst_top_session_sendpointdata = [];
    dst_top_session_receavepointdata = [];
    $.ajax({
        type: "get",
        async: false,
        url: "http://192.168.18.68:8000/policy/get_top_session/src_nt_sh_top_session/",
        dataType: "json",
        success: function(results){
            message = results["message"];
            t = results["time"];
            max_num = results["max"];
            var timestamp2 = Date.parse(new Date(t));
            timestamp2 = timestamp2 / 1000;
            div = document.getElementById("src_nt_sh_session_top");
            div.innerHTML = "";
            max_session = 0;
            for(var j=0; j<message.length; j++){
                dst_top_session_ydata = [];
                dst_top_session_pointdata = [];
                first_mem = message[j][0];
                //if(max_session<first_mem["count"])
                //    max_session = first_mem["count"];
                for(var i=0; i<message[j].length; i++)
                {
                    one = message[j][i];
                    dst_top_session_ydata.push(one["address"]);
                    dst_top_session_pointdata.push((one["count"]));
                    //dst_top_session_sendpointdata.push(one["send_count"]/1000);
                    //dst_top_session_receavepointdata.push(one["receave_count"]/1000);
                }
                var child_div = document.createElement("div");
                child_div_name = "src_nt_sh_session_top_"+j.toString();
                child_div.setAttribute("id",child_div_name);
                child_div.setAttribute("style","height:300px");
                div.appendChild(child_div);
                var newDate = new Date();
                timestamp3 = timestamp2 - j*2*60;
                newDate.setTime(timestamp3 * 1000);
                //alert(timestamp3);
                str_t = newDate.toLocaleString().replace(/:\d{1,2}$/,'');
                //alert(max_num);
                draw_dst_session_top(str_t,max_num,child_div_name,dst_top_session_ydata,dst_top_session_pointdata,"src_nt_sh");

            }
            //alert(max_num);
        },
        error: function(errorMsg){
            alert(errorMsg);
        }
    });
    $.ajax({
        type: "get",
        async: false,
        url: "http://192.168.18.68:8000/policy/get_top_session/dst_nt_sh_top_session/",
        dataType: "json",
        success: function(results){
            message = results["message"];
            t = results["time"];
            max_num = results["max"];
            var timestamp2 = Date.parse(new Date(t));
            timestamp2 = timestamp2 / 1000;
            div = document.getElementById("dst_nt_sh_session_top");
            div.innerHTML = "";
            max_session = 0;
            for(var j=0; j<message.length; j++){
                dst_top_session_ydata = [];
                dst_top_session_pointdata = [];
                first_mem = message[j][0];
                //if(max_session<first_mem["count"])
                //    max_session = first_mem["count"];
                for(var i=0; i<message[j].length; i++)
                {
                    one = message[j][i];
                    dst_top_session_ydata.push(one["address"]);
                    dst_top_session_pointdata.push((one["count"]));
                    //dst_top_session_sendpointdata.push(one["send_count"]/1000);
                    //dst_top_session_receavepointdata.push(one["receave_count"]/1000);
                }
                var child_div = document.createElement("div");
                child_div_name = "dst_nt_sh_session_top_"+j.toString();
                child_div.setAttribute("id",child_div_name);
                child_div.setAttribute("style","height:300px");
                div.appendChild(child_div);
                var newDate = new Date();
                timestamp3 = timestamp2 - j*2*60;
                newDate.setTime(timestamp3 * 1000);
                //alert(timestamp3);
                str_t = newDate.toLocaleString().replace(/:\d{1,2}$/,'');
                //alert(max_num);
                draw_dst_session_top(str_t,max_num,child_div_name,dst_top_session_ydata,dst_top_session_pointdata,"dst_nt_sh");

            }
            //alert(max_num);
        },
        error: function(errorMsg){
            alert(errorMsg);
        }
    });
}
function eConsole(param) {
    var ip=param.name;
    var value=param.value;
    if(ip.indexOf('10.2.')==0 || ip.indexOf('10.3.')==0)
        link="http://qate.qa.nt.ctripcorp.com/vmDetail/?ip="+ip;
    else
	    link="http://odb.sh.ctripcorp.com/search?keywords="+ip;
	window.open(link);
}



function draw_src_session_top(index,max_num,child_div_name,src_top_session_ydata,src_top_session_pointdata,type){
    //minute = index*2;
    if(type == "src_sh_nt"){
        title_str = "基于源的连接数";
        sub_title_str = "上海到南通测试";
    }
    else
    {
        title_str = "基于目标的连接数";
        sub_title_str = "上海到南通测试";
    }
	var myChart = echarts.init(document.getElementById(child_div_name));
	var options={
                        title : {
                                text: title_str+'('+index+')',
                                //subtext: title_str+'('+index+')',
                                //subtextStyle:{color:'#404040'}
                        },
                        tooltip : {
                            trigger: 'axis',
                            //formatter: '{a0}:{c0}<br />{a1}: {c1}<br />{a2}: {c2}',
                            formatter: function(params, ticket, callback){
                                            //alert(params.length);
                                            p = params.reverse();
                                            str = '';
                                            for(var i=0;i<p.length;i++){
                                                a = params[i].seriesName;
                                                c = Math.abs(params[i].value);
                                                str = str+a+':'+c.toString()+'<br>';
                                            }
                                            return str;
                                        }
                        },
                        grid:{
                            x:100,
                            x2:60
                             },
                        toolbox: {
                            show : true,
                            feature : {
                                    mark:false
                                }
                        },
                        /*legend: {
                            //selectedMode:'single',
                            //selected:{
                            //},
                            //data:['Session数','发送字节数(KB)','接收字节数(KB)']
                            data:['Session数']
                        },*/
                        calculable: true,
                        xAxis: [
                            {
                                type: 'value',
                                //axisLabel: {formatter: '{value} M'},
                                axisLabel: {formatter: function(value,index){return (Math.abs(value))}},
                                splitArea: {show: true},
                                max:max_num
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                position: 'left',
                                data: src_top_session_ydata
                            }
                        ],
                        series : [
                            /*{
                                name:'接收字节数(KB)',
                                type:'bar',
                                data:src_top_session_receavepointdata
                            },
                            {
                                name:'发送字节数(KB)',
                                type:'bar',
                                data:src_top_session_sendpointdata
                            },*/
                            {
                                name:'Session数',
                                type:'bar',
                                itemStyle:{
                                    normal: {color: '#0FA5A5'}
                                },
                                data:src_top_session_pointdata
                            }
						]
                    };
	myChart.hideLoading();
    myChart.setOption(options);
	myChart.on(echarts.config.EVENT.CLICK, eConsole);
}

function draw_dst_session_top(index,max_session,child_div_name,src_top_session_ydata,src_top_session_pointdata,type){
    //minute = index*2;
    if(type == "src_nt_sh"){
        title_str = "基于源的连接数";
        sub_title_str = "南通测试到上海";
    }
    else{
        title_str = "基于目标的连接数";
        sub_title_str = '南通测试&rarr;上海';
    }
    var myChart = echarts.init(document.getElementById(child_div_name));
    var options={
                        title : {
                                text: title_str+'('+index+')',
                                //subtext: title_str+'('+index+')',
                                //subtextStyle:{color:'#404040'}
                        },
                        tooltip : {
                            trigger: 'axis',
                            //formatter: '{a0}:{c0}<br />{a1}: {c1}<br />{a2}: {c2}',
                            formatter: function(params, ticket, callback){
                                            //alert(params.length);
                                            p = params.reverse();
                                            str = '';
                                            for(var i=0;i<p.length;i++){
                                                a = params[i].seriesName;
                                                c = Math.abs(params[i].value);
                                                str = str+a+':'+c.toString()+'<br>';
                                            }
                                            return str;
                                        }
                        },
                        grid:{
                            x:100,
                            x2:60
                             },
                        toolbox: {
                            show : true,
                            feature : {
                                    mark:false
                                }
                        },
                        /*legend: {
                            data:['Session数']
                            //data:['Session数','发送字节数(KB)','接收字节数(KB)']
                        },*/
                        calculable: true,
                        xAxis: [
                            {
                                type: 'value',
                                //axisLabel: {formatter: '{value} M'},
                                axisLabel: {formatter: function(value,index){return (Math.abs(value))}},
                                splitArea: {show: true},
                                max:max_num
                            }
                        ],
                        yAxis: [
                            {
                                type: 'category',
                                data: dst_top_session_ydata
                            }
                        ],
                        series : [
                            /*{
                                name:'接收字节数(KB)',
                                type:'bar',
                                data:dst_top_session_receavepointdata
                            },
                            {
                                name:'发送字节数(KB)',
                                type:'bar',
                                data:dst_top_session_sendpointdata
                            },*/
                            {
                                name:'Session数',
                                type:'bar',
                                itemStyle:{
                                    normal: {color: '#0FA5A5'}
                                },
                                data:dst_top_session_pointdata
                            }
                        ]
                    };
    myChart.hideLoading();
    myChart.setOption(options);
    myChart.on(echarts.config.EVENT.CLICK, eConsole);
}



getdata();
//draw_src_session_top();

getdata_dst();
//draw_dst_session_top();
