function add_udp(){
    $("#udp").show();
    $("#deludp").show();
    //$("#addudp").attr('disabled','true');
    if($("#tcp").is(':visible'))
    {
        $("#addudp").hide();
        $("#deltcp").show();
    }
}
function add_tcp(){
    $("#tcp").show();
    if($("#udp").is(':visible')){
        $("#addudp").hide();
        $("#deltcp").show();
        $("#addtcp").hide();
        $("#deludp").show();
    }
}
function del_tcp(){
    $("#deludp").hide();
    $("#addtcp").show();
    $("#tcp").hide();
    $("#tcp_port").val("");
}
function del_udp(){
    $("#udp").hide();
    $("#udp_port").val("");
    $("#deludp").hide();
    if($("#tcp").is(':visible'))
    {
        $("#deltcp").hide();
        $("#addudp").show();
    }
    else
    {
        $("#tcp").show();
    }
    //$("#addudp").remove('disabled');
}
function issued_action(){
    //js.lang.String.call(String.prototype);
    src_address = document.getElementById("src_address").innerHTML;
    src_addrgroup = document.getElementById("src_address_group").innerHTML;
    dst_address = document.getElementById("dst_address").innerHTML;
    dst_addrgroup = document.getElementById("dst_address_group").innerHTML;
    service = document.getElementById("service").innerHTML;
    servgroup = document.getElementById("service_group").innerHTML;
    policy = document.getElementById("policy_info").innerHTML;
    firewall_type = $("#firewall_type option:selected").val();
    firewall_url = $("#firewall_url").val();
    alert(src_address); 
    url = 'policy/api/issued_params/';
    $.ajax({
        type: 'post',
        async: false,
        url: url,
        contentType: "application/json; charset=utf-8",
        data: '{"src_address":'+src_address+',"dst_address":'+dst_address+',"src_addrgroup":'+src_addrgroup+',"dst_addrgroup":'+dst_addrgroup+',"service":'+service+',"servgroup":'+servgroup+',"policy":'+policy+',"firewall_type":"'+firewall_type+'","firewall_url":"'+firewall_url+'"}',
        dataType: "json",
        success: function(results){
            alert(results['message']);
        },
        error: function(errorMsg){
            alert(errorMsg);
        }
    });
}
$(document).ready( function() {
    $("#src_ip").blur(function(){
        input = $(this).val();
        in_array = input.split(',');
        //alert(in_array[0]);
        if(in_array.length > 10)
            $("#src_addrgroup").css('display','block');
        else
            $("#src_addrgroup_name").val("no name");
        
    });
    $("#dst_ip").blur(function(){
        input = $(this).val();
        in_array = input.split(',');
        if(in_array.length > 10)
            $("#dst_addrgroup").css('display','block');
        else
            $("#dst_addrgroup_name").val("no name");
    });
    $("#firewall_type").change(function(){
        select_type = $(this).children('option:selected').val();
        if(select_type=="fortinet"){
            $("#firewall_url").val("10.32.3.153");
            $("#from_interface").val("wan1");
            $("#to_interface").val("wan2");
        }
        if(select_type == "paloalto"){
            $("#firewall_url").val("10.32.3.152");
            $("#from_interface").val("tap");
            $("#to_interface").val("tap");
        }
        if(select_type == "junos"){
            $("#firewall_url").val("no ip");
            $("#from_interface").val("no");
            $("#to_interface").val("no");
        }
    });
});
function build(){
    src_ip = $("#src_ip").val();
    if(src_ip == "")
    {
        alert("源地址不能为空");
        return;
    }
    dst_ip = $("#dst_ip").val();
    if(dst_ip == "")
    {
        alert("目的地址不能为空");
        return;
    }
    tcp_port = $("#tcp_port").val();
    udp_port = $("#udp_port").val();
    if(tcp_port == "" && udp_port == "")
    {
        alert("tcp端口和udp端口至少一个不能为空");
        return;
    }
    from_interface = $("#from_interface").val()
    to_interface = $("#to_interface").val()
    service_name = $("#service_group_name").val();
    if(service_name == "")
    {
        alert("服务组名不能为空");
        return;
    }
    policy_name = $("#policy_name").val();
    if(src_addrgroup_name == "")
    {
        alert("策略名不能为空");
        return;
    }
    src_addrgroup_name = $("#src_addrgroup_name").val();
    if(src_addrgroup_name == "" && $("#src_addrgroup_name").is(":visible"))
    {
        alert("源地址组名不能为空");
        return;
    }
    dst_addrgroup_name = $("#dst_addrgroup_name").val();
    if(dst_addrgroup_name == "" && $("#dst_addrgroup_name").is(":visible"))
    {
        alert("目的地址组名不能为空");
        return;
    }
    firewall_type = $("#firewall_type option:selected").val();
    firewall_url = $("#firewall_url").val();
    url = 'policy/api/build_params/';
    $.ajax({
        type: 'post',
        async: false,
        url: url,
        contentType: "application/json; charset=utf-8",
        data: '{"src_ip":"'+src_ip+'","dst_ip":"'+dst_ip+'","tcp_port":"'+tcp_port+'","udp_port":"'+udp_port+'","service_group_name":"'+service_name+'","policy_name":"'+policy_name+'","src_group_name":"'+src_addrgroup_name+'","dst_group_name":"'+dst_addrgroup_name+'","firewall_type":"'+firewall_type+'","firewall_url":"'+firewall_url+'","from_interface":"'+from_interface+'","to_interface":"'+to_interface+'"}',
        dataType: "json",
        success: function(results){
            if(results['status']=="ok"){
                result_str="";
                for(var key in results)
                {
                    result_str = result_str + key + ":\n"+"    "+results[key]+"\n\n"
                }
                //result_str="";
                document.getElementById("src_address").innerHTML = results['src_address'];
                document.getElementById("src_address_group").innerHTML = results['src_addrgroup'];
                document.getElementById("dst_address").innerHTML = results['dst_address'];
                document.getElementById("dst_address_group").innerHTML = results['dst_addrgroup'];
                document.getElementById("service").innerHTML = results['service'];
                document.getElementById("service_group").innerHTML = results['servgroup'];
                document.getElementById("policy_info").innerHTML = results['policy'];
                $('#issued').show();
            }
            else
            {
                alert(results['status']);
            }
            //result_status = results["status"];
        },
        error: function(errorMsg){
            alert(errorMsg);
        }
    });
}
