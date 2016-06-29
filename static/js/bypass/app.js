function get_time(fw_name)
{
    var time="";
    $.ajax({
        type: 'post',
        async: false,
        url: '/changepasswd/api/get_change_time/',
        contentType: "application/json; charset=utf-8",
        data: '{"fwname":"'+fw_name+'"}',
        dataType: "json",
	success: function(results){
                time=results["message"];
        },
	error: function(errorMsg){
                alert(errorMsg);
        }
    });
    return time;
}
function get_name(fw_type)
{
    var name="";
    $.ajax({
        type: 'post',
        async: false,
        url: '/changepasswd/api/get_firewall_name/',
        contentType: "application/json; charset=utf-8",
        data: '{"fwtype":"'+fw_type+'"}',
        dataType: "json",
        success: function(results){
                name=results["message"];
        },
        error: function(errorMsg){
                alert(errorMsg);
        }
    });
    return name;
}
function infotable()
{
    //alert(fw_type);
    var data = new Array();
    test = ["ft","ft1"];
    //test = get_name(fw_type);
    var test_data = new Array();
    for(var i=0;i<test.length;i++)
    {
	//time = get_time(test[i]);
	test_data.push([test[i],'switch1','22','switch2','23','<input id="edit'+test[i]+'" class="btn btn-default" type="button" value="bypass" onclick="button_click_bypass(event)"/> <input id="his'+test[i]+'" class="btn btn-default" type="button" value="rollback" onclick="button_click_rollback(event)"/>']);
    }
    data = test_data;
    var oTable=$('.fTable').dataTable({
	/*"aoColumnDefs": [{
	    "bSortable": false,
	    "aTargets": [0]
	}],*/
	//"bSmart":false,
	//"bAutoWidth": true,
	"bDestroy": true,
	"bPaginate": true,
	"aaData": data,
	"aoColumns": [
		{"sWidth": "15%"},
		{"sWidth": "15%"},
		{"sWidth": "15%"},
		{"sWidth": "15%"},
                {"sWidth": "15%"},
                {"sWidth": "25%"}
	],
	/*"colums" : [
	    {"data":"防火墙"},
            {"data":"最近修改时间"},
            {"data":"操作"}
	]*/
                           
    });
}
function button_click_bypass(event)
{
    //alert($(this).val());
    var bypassname = $(event.target).parent().prevAll().eq(1).text();
    var switch1 = $(event.target).parent().prevAll().eq(2).text();
    var port1 = $(event.target).parent().prevAll().eq(3).text();
    var switch2 = $(event.target).parent().prevAll().eq(4).text();
    var port2 = $(event.target).parent().prevAll().eq(5).text();
    //event.target.css("color","FF3300");
    //alert(event.target.id);
    //result_status = "成功";
    //if(result_status == "成功"){
    //	document.getElementById(event.target.id).value=result_status;
    //	document.getElementById(event.target.id).disabled = true;
    //}
	
    //alert(fw_name);
    result_status = bypass(bypassname,switch1,port1,switch2,port2);
    if(result_status == "成功"){
        document.getElementById(event.target.id).value=result_status;
        document.getElementById(event.target.id).disabled = true;
    }
    //document.getElementById(event.target.id).value=result_status;
    //pre_result=result_str;
    //alert(pre_result);
    //document.getElementById("result").innerHTML=pre_result;
    //$('#result_content').show();
}


function bypass(bypassname,switch1,port1,switch2,port2)
{
    var result_status="";
    var img = $("#progressImgage"); 
    var mask = $("#maskOfProgressImage");
    url='/bypass/api/bypass/';
    $.ajax({
	type: 'post',
	async: false,
	url: url,
	contentType: "application/json; charset=utf-8",
	data: '{"bypassname":"'+bypassname+'","switch1":"'+switch1+'","port1":"'+port1+'","switch2":"'+switch2+'","port2":"'+port2+'"}',
	dataType: "json",
	beforeSend:function(xhr){
	    img.show().css({ 
		"position": "fixed",
		"top": "40%", 
		"left": "45%", 
		"margin-top": function () { return -1 * img.height(); }, 
		"margin-left": function () { return -1 * img.width(); } 
	    }); 
	    mask.show().css("opacity", "0.1");
	},
	success: function(results){
		result_str=results["info"];
		//document.getElementById("result").innerHTML=result_str;
		//$('#result_content').show();
		result_status = results["status"];
		alert(result_status);
	},
	complete:function(xhr){ 
		img.hide(); 
		mask.hide(); 

	},
	error: function(errorMsg){
                alert(errorMsg);
        }
    });
    return result_status;
}
function button_click_rollback(event)
{
    var bypassname=$(event.target).parent().prevAll().eq(1).text();
    var switch1 = $(event.target).parent().prevAll().eq(2).text();
    var port1 = $(event.target).parent().prevAll().eq(3).text();
    var switch2 = $(event.target).parent().prevAll().eq(4).text();
    var port2 = $(event.target).parent().prevAll().eq(5).text();
    result_status = rollback(bypassname,switch1,port1,switch2,port2)
    if(result_status == "成功"){
        document.getElementById(event.target.id).value=result_status;
        document.getElementById(event.target.id).disabled = true;
    }
}
function rollback(bypassname,switch1,port1,switch2,port2)
{
    var result_status="";
    var img = $("#progressImgage");
    var mask = $("#maskOfProgressImage");
    $.ajax({
	type: 'post',
	async: false,
	url: '/bypass/api/rollback/',
	contentType: "application/json; charset=utf-8",
	data: '{"bypassname":"'+bypassname+'","switch1":"'+switch1+'","port1":"'+port1+'","switch2":"'+switch2+'","port2":"'+port2+'"}',
	dataType: "json",
	beforeSend:function(xhr){
            img.show().css({
                "position": "fixed",
                "top": "40%",
                "left": "45%",
                "margin-top": function () { return -1 * img.height(); },
                "margin-left": function () { return -1 * img.width(); }
            });
            mask.show().css("opacity", "0.1");
        },
        success: function(results){
		    result_str=results["info"];
		    result_status = results["status"];
                    alert(result_status);
        },
        complete:function(xhr){
                img.hide();
                mask.hide();

        },
        error: function(errorMsg){
                alert(errorMsg);
        }	
    });
    return result_status
}
