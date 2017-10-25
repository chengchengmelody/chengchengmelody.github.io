$(function() {
    var curID = "";
    var serverData = [{
            "pid": 100,
            "name": "领取证明",
            "subList": [{
                    "id": 1,
                    "name": "领取证明1",
                    "status": 0
                },
                {
                    "id": 2,
                    "name": "领取证明2",
                    "status": 0
                },
                {
                    "id": 3,
                    "name": "领取证明3",
                    "status": 0
                },
                {
                    "id": 4,
                    "name": "领取证明4",
                    "status": 0
                }
            ]
        },
        {
            "pid": 101,
            "name": "领取公仔",
            "subList": [{
                    "id": 1,
                    "name": "公仔1",
                    "status": 0
                },
                {
                    "id": 2,
                    "name": "公仔2",
                    "status": 0
                },
                {
                    "id": 3,
                    "name": "公仔3",
                    "status": 0
                },
                {
                    "id": 4,
                    "name": "公仔4",
                    "status": 0
                }
            ]
        },
        {
            "pid": 102,
            "name": "归还档案材料",
            "subList": [{
                    "id": 1,
                    "name": "归还档案材料1",
                    "status": 0
                },
                {
                    "id": 2,
                    "name": "归还档案材料2",
                    "status": 0
                },
                {
                    "id": 3,
                    "name": "归还档案材料3",
                    "status": 0
                },
                {
                    "id": 4,
                    "name": "归还档案材料4",
                    "status": 0
                }
            ]
        },
        {
            "pid": 103,
            "name": "归还户口卡",
            "subList": [{
                    "id": 1,
                    "name": "归还户口卡1",
                    "status": 0
                },
                {
                    "id": 2,
                    "name": "归还户口卡2",
                    "status": 0
                },
                {
                    "id": 3,
                    "name": "归还户口卡3",
                    "status": 0
                },
                {
                    "id": 4,
                    "name": "归还户口卡4",
                    "status": 0
                }
            ]
        }
    ]
    //点击列表数据，带有二级数据的弹出框展示
    $(".recep-item").delegate("li", "click", function(event) {
        event.stopPropagation();
        var _index = $(this).index();
        if (!$(this).hasClass("recep-itemList")) {
            $(this).toggleClass("active");
            return;
        }
        var ulClass = $(this).parents("ul").attr("class");
        $(".dialog .back-cnt").attr("class", "back-cnt " + ulClass);
        var pidss = $(this).attr("id");
        curID = pidss;

        var html = '';
        for (var n = 0; n < serverData.length; n++) {
            if (serverData[n].pid == pidss) {
                var list = serverData[n].subList;
                $(".back-title").html(serverData[n].name);
                for (i = 0; i < list.length; i++) {
                    var name = list[i].name;
                    var status = list[i].status;
                    if (status == 1) {
                        html += "<li class='active'>" + name + "</li>";
                    } else {
                        html += "<li>" + name + "</li>";
                    }
                }
            }
        }
        $(".dialog .recep-item ul").html(html);
        $(".dialog").show();
    });
    //关闭弹出框
    $(".back-btn p").click(function() {
        $(".dialog").hide();
    });
    //弹出框确定
    $(".dialog .back-ok").click(function() { 
        for (var n = 0; n < serverData.length; n++) {
            if (serverData[n].pid == curID) {
                var list = serverData[n].subList;
                var num = 0;
                $(this).parents(".dialog").find(".recep-item ul li").each(function() {
                    var flag = $(this).hasClass("active");
                    var ind = $(this).index();
                    if (flag) {
                        list[ind].status = 1;
                        num++;
                    } else {
                        list[ind].status = 0;
                    }
                });
                if (num > 0) {
                    $(".recep-list .recep-item li[id=" + curID + "]").addClass("active");
                } else {
                    $(".recep-list .recep-item li[id=" + curID + "]").removeClass("active");
                }
            }
        }
    });

    //区域弹出层
    $(".recep-btn .yes").click(function() {
        $("#back-green").show();
    });
    // 区域确定按钮
    $("#recepOk").on("click", function() {
        window.location.href = "billList.html";
    });
});