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
function get_name()
{
    var name="";
    $.ajax({
        type: 'post',
        async: false,
        url: '/NAT/api/get_nat/',
        contentType: "application/json; charset=utf-8",
        //data: '{"fwtype":"'+fwtype+'"}',
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
    var data = new Array();
    test=get_name();
    var test_data = new Array();
    for(var i=0;i<test.length;)
    {
        test_data.push([test[i],test[i+1],test[i+2],test[i+3]]);
        i=i+4;
    }
    data = test_data;
    var oTable=$('.fTable').dataTable({
        "bDestroy": true,
        "bPaginate": true,
        "aaData": data,
        "aoColumns": [
                {"sWidth": "25%"},
                {"sWidth": "25%"},
                {"sWidth": "25%"},
                {"sWidth": "25%"},
        ],
    });
}

