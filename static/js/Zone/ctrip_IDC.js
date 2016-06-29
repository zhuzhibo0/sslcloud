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
        url: '/Zone/api/get_zone_name/',
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
        test_data.push([test[i],test[i+1],test[i+2],test[i+3],test[i+4],test[i+5],test[i+6],test[i+7]]);
        i=i+8;
    }

    data = test_data;
    var table=$('#zone_table').dataTable({
        "bDestroy": true,
        "bPaginate": true,
        "aaData": data,
        "aoColumns": [
                {"sWidth": "11%"},
                {"sWidth": "14%"},
                {"sWidth": "11%"},
                {"sWidth": "14%"},
                {"sWidth": "11%"},
                {"sWidth": "14%"},
                {"sWidth": "11%"},
                {"sWidth": "14%"},
            
        ],
    });
    //$('#zone_table tbody').on( 'click', 'td', function(event){
    //    var cc = new Array();
    //    linshia=$(event.target).text();
        //if(linshia!='mgmt1' && linshia!='' && linshia!= 'Trust' && linshia!='MGMT')
        //{
        //    test2=get_cc(linshia);
        //    var test_data2=new Array();
        //    alert(linshia);
        //    alert(test2);
        //    cwxbox.box.show(test2,3)
    //    }
    //});
}
//function get_cc(zone_name)
//{
//    var name="";
//    $.ajax({
//        type: 'post',
//        async: false,
//        url: '/Zone/api/get_cc_name/',
//        contentType: "application/json; charset=utf-8",
//        data: '{"zone_name":"'+zone_name+'"}',
//        dataType: "json",
//        success: function(results){
//        name=results["message"];
//        },
//        error: function(errorMsg){
//            alert(errorMsg);
//        }
//   });
//    return name;
//}



