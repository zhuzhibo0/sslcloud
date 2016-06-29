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
function firetable(event)
{
    $('#result_content').hide();
    var fw_type=$(event.target).val();
    //alert(fw_type);
    var data = new Array();
    if(fw_type=="ft_novodm"){
    	var ft_data = new Array();
    	//ft_name=["FRW098FT200D","FRW099FT200D","FRW100FT200D","FRW111FT200D","FRW112FT200D"];
    	ft_name = get_name(fw_type);
    	for(var i=0;i<ft_name.length;i++)
    	{
	    time = get_time(ft_name[i]);
	    ft_data.push([ft_name[i],time,'<input id="edit'+ft_name[i]+'" class="btn btn-default" type="button" value="修改" onclick="button_click(event)"/> <input id="his'+ft_name[i]+'" class="btn btn-default" type="button" value="历史" onclick="button_click_his(event)"/>']);
    	}
	data = ft_data;
    }
    if(fw_type=="ft_vodm"){
    	//ft_vdom=["FRW088FT3700","FRW090FT3700","FRW092FT800C","FRW123FT1500","FRW135FT1500","FRW137FT1200","FRW139FT1200"];
    	ft_vdom = get_name(fw_type);
    	var ft_vdom_data=new Array();
    	for(var i=0;i<ft_vdom.length;i++)
    	{
	    time = get_time(ft_vdom[i]);
	    ft_vdom_data.push([ft_vdom[i],time,'<input id="edit'+ft_vdom[i]+'" class="btn btn-default" type="button" value="修改" onclick="button_click(event)"/> <input id="his'+ft_vdom[i]+'" class="btn btn-default" type="button" value="历史" onclick="button_click_his(event)"/>']);
    	}
	data = ft_vdom_data;
    }
    if(fw_type=="netscreen"){
    	//netscreen=["FRW004JS550","FRW005JN1000","FRW019JNSSG5","FRW039JNSSG5","FRW043JNG140","FRW057JN204B"];
    	netscreen = get_name(fw_type);
    	var netscreen_data = new Array();
    	for(var i=0;i<netscreen.length;i++)
    	{
	    time = get_time(netscreen[i]);
	    netscreen_data.push([netscreen[i],time,'<input id="edit'+netscreen[i]+'" class="btn btn-default" type="button" value="修改" onclick="button_click(event)"/> <input id="'+netscreen[i]+'" class="btn btn-default" type="button" value="历史" onclick="button_click_his(event)"/>']);
    	}
	data = netscreen_data;
    }
    if(fw_type=="junipersrx"){
    	//junipersrx=["FRW032JN3400","FRW034JN3400","FRW053JNS650","FRW064JN3600"];
    	junipersrx = get_name(fw_type);
    	var junipersrx_data = new Array();
    	for(var i=0;i<junipersrx.length;i++)
    	{
	    time = get_time(junipersrx[i]);
	    time = '该组设备使用令牌登录，只需修改ctriproot密码，请ssh登录防火墙修改';
	    junipersrx_data.push([junipersrx[i],time,'<input id="edit'+junipersrx[i]+'" class="btn btn-default" type="button" value="修改" onclick="button_click(event)"  disabled="disabled"/> <input id="his'+junipersrx[i]+'" class="btn btn-default" type="button" value="历史" onclick="button_click_his(event)"  disabled="disabled"/>']);
	    //alert("该组设备使用令牌登录，只需修改ctriproot密码，请ssh登录防火墙修改");
    	}
	data = junipersrx_data;
    }
    if(fw_type=="asa"){
    	//asa = ["FRW044CSFWSM","FRW072CS5520","FRW075CS5520","FRW076CS5520"];
    	asa = get_name(fw_type);
    	var asa_data = new Array();
    	for(var i=0;i<asa.length;i++)
    	{
	    time = get_time(asa[i]);
	    asa_data.push([asa[i],time,'<input id="edit'+asa[i]+'" class="btn btn-default" type="button" value="修改" onclick="button_click(event)"/> <input id="his'+asa[i]+'" class="btn btn-default" type="button" value="历史" onclick="button_click_his(event)"/>'])
    	}
	data = asa_data;
    }
    if(fw_type=="pa"){
    	//pa = ["FRW078PA5050"];
    	pa = get_name(fw_type);
    	var pa_data = new Array();
    	for(var i=0;i<pa.length;i++)
    	{
	    time = get_time(pa[i]);
	    pa_data.push([pa[i],time,'<input id="edit'+pa[i]+'" class="btn btn-default" type="button" value="修改" onclick="button_click(event)"/> <input id="his'+pa[i]+'" class="btn btn-default" type="button" value="历史" onclick="button_click_his(event)"/>'])
    	}
	data = pa_data;
    }
    if(fw_type=="other"){
    	//test = ["ft","ft1"];
	test = get_name(fw_type);
    	var test_data = new Array();
    	for(var i=0;i<test.length;i++)
    	{
	    time = get_time(test[i]);
	    if(test[i] == "Panorama"){
		time = '只需修改admin密码，<a href="https://192.168.93.63/php/login.php" target="_blank">请登录web界面修改密码<a/>';
	    }
	    if(test[i] == "FT analyzer"){
		time = '只需修改admin密码，<a href="https://10.9.114.22/index.htm" target="_blank">请登录web界面修改密码<a/>';
	    }
	    if(test[i] == "CCFT analyzer"){
		time = '<a href="https://192.168.136.16/index.htm" target="_blank">请登录web界面修改密码<a/>';
	    }
	    if(test[i] == "NTFT analyzer"){
                time = '<a href="https://172.28.136.33/index.htm" target="_blank">请登录web界面修改密码<a/>';
            }
	    if(test[i] == "Fortimanager"){
                time = '只需修改admin密码，<a href="https://10.9.114.21/index.htm" target="_blank">请登录web界面修改密码<a/>';
            }
	    if(test[i] == "FRW056"){
                time = '虹桥机场防火墙,请ssh登录180.169.55.193修改密码';
	    }
	    if(test[i] == "FRW083"){
                time = '国安防火墙,<a href="https://10.8.248.89/" target="_blank">请登录web界面修改密码<a/>';
	    }
	    if(test[i] == "FRW147"){
                time = '公安技侦VPN,<a href="https://10.15.244.89/cgi-bin/login.cgi" target="_blank">请登录web界面修改密码<a/>';
            }
	    if(test[i] == "IPS011"){
		time = '公安VPN,<a href="https://10.8.59.6:5443/default.html" target="_blank">请登录web界面修改密码<a/>';
	    }
	    test_data.push([test[i],time,'<input id="edit'+test[i]+'" class="btn btn-default" type="button" value="修改" onclick="button_click(event)" disabled="disabled"/> <input id="his'+test[i]+'" class="btn btn-default" type="button" value="历史" onclick="button_click_his(event)" disabled="disabled"/>']);
	    //document.getElementById("result").innerHTML=result_str;
            //$('#result_content').show();
    	}
	data = test_data;
    }
    /*if(fw_type=="ft_novodm")
	data=ft_data;
    if(fw_type=="ft_vodm")
	data = ft_vdom_data;
    if(fw_type=="netscreen")
	 data = netscreen_data;
    if(fw_type=="junipersrx")
	data = junipersrx_data;
    if(fw_type=="asa")
	data = asa_data;
    if(fw_type=="pa")
	data = pa_data;
    if(fw_type=="test")
	data = test_data;*/
    //alert(data);
    //data.push(["test","2016-01-04 09:00:00",'<input class="btn btn-default" type="button" value="修改" onclick="button_click()"/>']);
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
		{"sWidth": "40%"},
		{"sWidth": "40%"},
		{"sWidth": "20%"}
	],
	/*"colums" : [
	    {"data":"防火墙"},
            {"data":"最近修改时间"},
            {"data":"操作"}
	]*/
                           
    });
}
function button_click(event)
{
    //alert($(this).val());
    var fw_name=$(event.target).parent().prevAll().eq(1).text();
    //event.target.css("color","FF3300");
    //alert(event.target.id);
    //result_status = "成功";
    //if(result_status == "成功"){
    //	document.getElementById(event.target.id).value=result_status;
    //	document.getElementById(event.target.id).disabled = true;
    //}
	
    //alert(fw_name);
    if(fw_name == "FRW044CSFWSM"){
	alert("该设备使用令牌登录，只需修改ctriproot密码，请ssh登录防火墙修改");
	return;
    }
    if(fw_name == "FRW078PA5050"){
	alert("该设备使用令牌登录，只需修改admin密码，请登录web界面修改，点击确定跳转.");
	window.open("https://10.9.244.18/php/login.php");
	return;
    }
    if(fw_name == "FRW076CS5520"){
	alert("该设备路由不可达，请登录南通跳板机修改");
	return;
    }
    var rootname = $("#rootname").val();
    if(rootname==""){
	alert("管理员不能为空！");
	return;
    }
    var passwd = $("#passwd").val();
    if(passwd==""){
	alert("管理员密码不能为空！");
        return;
    }
    var username = $("#username").val();
    if(username==""){
	alert("用户名不能为空！");
	return;
    }
    if(fw_name == "FRW098FT200D" || fw_name == "FRW099FT200D" || fw_name == "FRW100FT200D")
        if(username!="ctriproot"){
	    alert("该设备使用令牌登录，只需修改ctriproot密码");
	    return;
	}
    var userpasswd = $("#userpasswd").val();
    if(userpasswd==""){
	alert("用户名密码不能为空！");
	return;
    }
    //if(rootname==username){
    //	alert("用户名不能与管理员相同！");
    //	return;
    //}
    var pre_result=document.getElementById("result").innerHTML;
    result_status=call_change_api(fw_name,rootname,passwd,username,userpasswd);
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


function call_change_api(fw_name,rootname,passwd,username,userpasswd)
{
    var progressbar = $("#progressbar"),progressLabel = $(".progress-label");
    var result_status="";
    //var img = $("#progressImgage"); 
    //var mask = $("#maskOfProgressImage");
    url='/changepasswd/api/changepasswd/';
    $.ajax({
	type: 'post',
	async: false,
	url: url,
	contentType: "application/json; charset=utf-8",
	data: '{"firewallname":"'+encodeURIComponent(fw_name)+'","rootname":"'+encodeURIComponent(rootname)+'","rootpasswd":"'+encodeURIComponent(passwd)+'","username":"'+encodeURIComponent(username)+'","userpasswd":"'+encodeURIComponent(userpasswd)+'"}',
	dataType: "json",
	beforeSend:function(xhr){
	    progressbar.progressbar({
                value: false
            });
	    progressbar.show();
	    /*img.show().css({ 
		"position": "fixed",
		"top": "40%", 
		"left": "45%", 
		"margin-top": function () { return -1 * img.height(); }, 
		"margin-left": function () { return -1 * img.width(); } 
	    }); 
	    mask.show().css("opacity", "0.1");*/
	},
	success: function(results){
		progressbar.hide();
		result_str=results["info"];
		document.getElementById("result").innerHTML=result_str;
		$('#result_content').show();
		result_status = results["status"];
		
	},
	complete:function(xhr){ 
		//img.hide(); 
		//mask.hide(); 

	},
	error: function(errorMsg){
                alert(errorMsg);
        }
    });
    return result_status;
}
function button_click_his(event)
{
    var fw_name=$(event.target).parent().prevAll().eq(1).text();
    call_get_history(fw_name)
}
function call_get_history(fw_name)
{
    var img = $("#progressImgage");
    var mask = $("#maskOfProgressImage");
    $.ajax({
	type: 'post',
	async: false,
	url: '/changepasswd/api/get_history/',
	contentType: "application/json; charset=utf-8",
	data: '{"fwname":"'+fw_name+'"}',
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
                result_str=results["message"];
		if(result!=""){
                    document.getElementById("result").innerHTML=result_str;
                    $('#result_content').show();
		}
        },
        complete:function(xhr){
                img.hide();
                mask.hide();

        },
        error: function(errorMsg){
                alert(errorMsg);
        }	
    });
}
