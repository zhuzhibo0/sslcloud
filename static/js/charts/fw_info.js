var fw_name = document.getElementById("fw_name").value;
console.info(fw_name);

function fwinfo(part){
    var myChart=echarts.init(document.getElementById("fw_info"));
    var urlstr = "/firewall/api/fw_info/" + fw_name +'/' + part + '/';
    $.ajax({
        type: "get",
        async: false,
        url : urlstr,
        dataType: "json",
        success : function(results){
            if (results['status'] == 'error') {
                alert(results["fw_name"] + " 请求内容不对");
                return ;
            };

            var tmpnodes = new Array();
            var tmplinks = new Array();
            var fwnode = {
                    category:0, 
                    // name: '乔布斯', 
                    value : 10,
                    symbol: 'image://' + '/static/img/firewall.PNG',
                    symbolSize: [60, 45],
                    draggable: true,
                    itemStyle: {
                        normal: {
                            label: {
                                position: 'right',
                                textStyle: {
                                    color: 'black'
                                }
                            }
                        }
                    }
                };
            fwnode['name'] = fw_name;
            tmpnodes.push(fwnode);

            for (var i = results[part].length - 1; i >= 0; i--) {
                // results["interfaces"][i];
                if (part == "interfaces") {
                    interfacde_node = {category:1, name: results[part][i].name, draggable: true, value : 2};
                    tmpnodes.push(interfacde_node);
                    interfacdeinfo_node = {category:2, name: results[part][i].ip, draggable: false, value : 1};
                    tmpnodes.push(interfacdeinfo_node);

                    var link = {source : fwnode['name'], target : results[part][i].name, weight : 1, name: 'interface'};
                    var secondlink = {source : results[part][i].name, target : results[part][i].ip, weight : 3, name: 'interface'};
                    tmplinks.push(link);
                    tmplinks.push(secondlink);
                } else if(part == "services"){
                    interfacde_node = {category:1, name: results[part][i].name, draggable: true, value : 2};
                    tmpnodes.push(interfacde_node);
                    var link = {source : fwnode['name'], target : results[part][i].name, weight : 1, name: 'service'};
                    tmplinks.push(link);
                    // if (results[part][i].num) {
                    //     interfacdeinfo_node = {category:2, name: results[part][i].num, draggable: false, value : 1};
                    //     tmpnodes.push(interfacdeinfo_node);
                    //     var secondlink = {source : results[part][i].name, target : results[part][i].num, weight : 3, name: 'service'};
                    //     tmplinks.push(secondlink);
                    // };
                };
            }
            // for (var i = results["interfaces"].length - 1; i >= 0; i--) {
            //     // results["interfaces"][i];
            //     interfacde_node = {category:1, name: results["interfaces"][i].name, draggable: true, value : 2};
            //     interfacdeinfo_node = {category:2, name: results["interfaces"][i].ip, draggable: false, value : 1};
            //     tmpnodes.push(interfacde_node);
            //     tmpnodes.push(interfacdeinfo_node);

            //     var link = {source : fwnode['name'], target : results["interfaces"][i].name, weight : 1, name: 'interface'};
            //     var secondlink = {source : results["interfaces"][i].name, target : results["interfaces"][i].ip, weight : 3, name: 'interface'};
            //     tmplinks.push(link);
            //     tmplinks.push(secondlink);
            // }

            option = {
                title : {
                    text: '防火墙接口信息：' + fw_name,
                    // subtext: '数据来自人立方',
                    x:'center',
                    y:'top'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: '{a} : {b}'
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true},
                        magicType: {show: true, type: ['force', 'chord']},
                        saveAsImage : {show: true}
                    }
                },
                legend: {
                    x: 'left',
                    data:[part,'IP']
                },
                series : [
                    {
                        type:'force',
                        name : part + "关系",
                        ribbonType: false,
                        categories : [
                            {
                                name: '防火墙'
                            },
                            {
                                name: part,
                                symbol: 'diamond'
                            },
                            {
                                name:'IP'
                            }
                        ],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#333'
                                    }
                                },
                                nodeStyle : {
                                    brushType : 'both',
                                    borderColor : 'rgba(255,215,0,0.4)',
                                    borderWidth : 1
                                }
                            },
                            emphasis: {
                                label: {
                                    show: false
                                    // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                                },
                                nodeStyle : {
                                    //r: 30
                                },
                                linkStyle : {}
                            }
                        },
                        minRadius : 15,
                        maxRadius : 25,
                        gravity: 0.1,
                        scaling: 1.2,
                        draggable: false,
                        linkSymbol: 'arrow',
                        steps: 5,
                        coolDown: 0.9,
                        //preventOverlap: true,
                        nodes: tmpnodes,
                        
                        links : tmplinks,
                        
                    }
                ]
            };
            //loading data
            myChart.setOption(option);
        },
        error: function(errorMsg){
            alert(errorMsg);
        }
    });
}


// function fwinfo(){
//     var myChart=echarts.init(document.getElementById("fw_info"));
//     var urlstr = "/firewall/api/" + fw_name +'/';
//     $.ajax({
//         type: "get",
//         async: false,
//         url : urlstr,
//         dataType: "json",
//         success : function(results){
//             var dataarr = new Array();
//             var firewall = {
//                 name: fw_name,
//                 symbolSize: [90, 70],
//                 symbol: 'image://' + '/static/img/firewall.PNG',
//                 itemStyle: {
//                     normal: {
//                         label: {
//                             show: true,
//                             position: 'bottom'
//                         }
//                     },
//                     emphasis: {
//                                 label: {
//                                     show: false
//                                 },
//                                 borderWidth: 0
//                             }
//                 },
//             }

//             var childrens = new Array();
//             for (var i = results["interfaces"].length - 1; i >= 0; i--) {
//                 // results["interfaces"][i];
//                 children = {
//                     name: results["interfaces"][i].name + ' ' + results["interfaces"][i].ip,
//                     symbol: 'image://' + '/static/img/interface.PNG',
//                     itemStyle: {
//                         normal: {
//                             label: {
//                                 show: true,
//                                 position: 'right'
//                             }
//                         },
//                         emphasis: {
//                             label: {
//                                 show: false
//                             },
//                             borderWidth: 0
//                         }
//                     },
//                     symbolSize: [60, 60],
//                 }
//                 childrens.push(children);
//             };
//             firewall['children'] = childrens;
//             dataarr.push(firewall);

//             var option = {
//                     title : {
//                         text: 'firewall info',
//                     },
//                     tooltip : {
//                         trigger: 'item',
//                         formatter: "{b}"
//                         // formatter: "{b}: {c}"
//                     },
//                     // toolbox: {
//                     //     show : true,
//                     //     feature : {
//                     //         mark : {show: true},
//                     //         dataView : {show: true, readOnly: false},
//                     //         restore : {show: true},
//                     //         saveAsImage : {show: true}
//                     //     }
//                     // },
//                     // calculable : true,

//                     series : [
//                         {
//                             name:'树图',
//                             type:'tree',
//                             orient: 'horizontal',  // vertical horizontal radial
//                             rootLocation: {x: 100, y: '40%'}, // 根节点位置  {x: 'center',y: 10}
//                             nodePadding: 20,
//                             symbol: 'circle',
//                             symbolSize: 40,
//                             itemStyle: {
//                                 normal: {
//                                     label: {
//                                         show: true,
//                                         position: 'outer',
//                                         textStyle: {
//                                             color: '#cc9999',
//                                             fontSize: 15,
//                                             fontWeight:  'bolder'
//                                         }
//                                     },
//                                     lineStyle: {
//                                         color: '#000',
//                                         width: 1,
//                                         type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
//                                     }
//                                 },
//                                 emphasis: {
//                                     label: {
//                                         show: true
//                                     }
//                                 }
//                             },
//                             data: dataarr,
//                         }
//                     ]
//             };
//             //loading data
//             myChart.setOption(option);
//         },
//         error: function(errorMsg){
//             alert(errorMsg);
//         }
//     });
// }


fwinfo("services");
