$(document).ready(function() {
    $('#result_table').dataTable({
        "oLanguage": {
            "sProcessing": "正在加载中......",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "正在加载中......",
            "sEmptyTable": "查询无数据！",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoEmpty": "显示0到0条记录",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            "sSearch": "当前数据搜索",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        },
        // "autoWidth": true,
        // "columns": [
        //      targets: [0],
        //      targets: [1],
        //      targets: [2],
        //      targets: [3],
        //      targets: [4],
        //      targets: [5],
        //      targets: [6],
        //      targets: [7]
        //       // { "width": "20%" },
        //       // null,
        //       // null,
        //       // null,
        //       // null,
        //       // null,
        //       // null,
        //       // { "width": "20%" }
        // ],
        // "columnDefs": [
        //     { // Date columns
        //         "targets": [0],
        //         "render": function( data, type, row ) {
        //             if( data == "1/1/1900" ) {
        //                 return null;
        //             }
 
        //             return data;
        //         }
        //     },
        //     { // Money columns
        //         "targets": [0],
        //         "render": function( data, type, row ) {
        //             var className = new Number( data ) > 0 ? "positiveAmount" : "negativeAmount";
        //             return "<span class='" + className + "'>" + data + "</span>";
        //         }
        //     }
        // ]
    });
});
