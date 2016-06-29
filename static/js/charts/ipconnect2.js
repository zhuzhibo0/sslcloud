$(document).ready(function() { 
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function retrieveData(sSource, aoData, fnCallback){   
        // console.log(aoData);
        aoData.push({"name":"fromip", "value":$('#ipgroup1').val()});
        aoData.push({"name":"toip", "value":$('#ipgroup2').val()});
        // aoData.splice(0,1);
        $.ajax({
            "beforeSend": function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            "type": "GET",
            "contentType": "application/json",
            "url": sSource,
            "dataType": "json",
            "data": aoData,
            "success": function(resp) {

                // start + hint 不能超过5000
                // console.log(resp);
                // resp.sEcho = resp.result.start;
                resp.iTotalDisplayRecords = resp.viewtotal;
                resp.iTotalRecords = resp.total;
                // console.log(resp);
                fnCallback(resp);
            }
        });
    }
    $( "#query" ).click(function(){
    // function form_submit(){
        //policy info table
        oTable1 = $('#policy_table').DataTable({
            // "bPaginate": true, //翻页功能

            "bProcessing": true,
            // "bServerSide": true,
            // "sPaginationType": "full_numbers",

            "sAjaxSource": "./api/ipconnected2/", //获取数据的url
            "fnServerData": retrieveData,           //获取数据的处理函数   
            "sAjaxDataProp": "data",

            "lengthChange": false, //改变每页显示数据数量
            "pageLength": 10,
            // "bAutoWidth": true,  //自动宽度
            "filter":   false,
            // "sScrollX": "100%",
            // "sScrollXInner": "100%",
            // "bScrollCollapse": true,
            // "ordering": false,
            // "order":    [2, "desc" ],
            "oLanguage": {
                "sLengthMenu": "每页显示 _MENU_ 条记录",
                "sZeroRecords": "抱歉， 没有找到",
                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                "sInfoEmpty": "没有数据",
                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                "oPaginate": {  
                    "sFirst": "首页",  
                    "sPrevious": "前一页",
                    "sNext": "后一页",  
                    "sLast": "尾页"  
                }, 
                // "sZeroRecords": "没有检索到数据",  
                // "sProcessing": "<img src='./loading.gif' />"
            },
            "columns": [
                { "data": "firewall" },
                { "data": "policy_name" },
                { "data": "from_address" },
                { "data": "to_address" },
                { "data": "service" },
                { "data": "action" },
                { "data": "from_interface" },
                { "data": "to_interface" }

            ],
            "bDestroy": true,
        });
    });

    // $('#myTabs').click(function (e) {
    //     e.preventDefault()
    //     $(this).tab('show')
    // })
});