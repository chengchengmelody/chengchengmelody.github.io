$(function () {
    $(".home-tab ul.home-ul li").click(function () {
        var index = $(this).index() + 1;
        $(this).siblings().removeClass('active').end().addClass('active');
        $(".sug" + index).siblings().hide().end().show();
    });
});

// 正在加载中
function loading(status) {
    var loading_div = '<div class="loadingNew">'
                    + '<i class="weui-loading"></i>'
                    + '</div>';
    if (status == 'show') {
        $("body").addClass('no-scroll');
        $("body").append(loading_div);
    } else {
        $("body").removeClass('no-scroll');
        $(".loadingNew").remove();

    }
}
//正在加载end

//计算每个目录的scrollTop值
var scrollMap = {};
var ids = [];
var scrollTops = [];
//设置Map对象 一般在页面模板加载完成后调用
var setScrollMapFn = function () {
    var oDivs = $(".tea-right").find('.item');
    for (var s = 0, len = oDivs.length; s < len; s++) {
        scrollMap[$(oDivs[s]).attr("id")] = Number($("#" + $(oDivs[s]).attr("id")).offset().top) - Number($('.tea-right').offset().top);
    }
    $('.tea-right').scrollTop(2000);
    var top = $('.tea-right').scrollTop();
    console.log("top=======", $('.tea-right').scrollTop())
    $('.tea-right').scrollTop(0);
    for (var s in scrollMap) {
        ids.push(s);
        if (scrollMap[s] > top) {
            scrollTops.push(top);
            break;
        } else {
            scrollTops.push(scrollMap[s]);
        }
    }
    console.log(scrollMap);
    console.log(scrollTops);
};
var tempFn = function () {
    var top = $('.tea-right').scrollTop();
    var len = scrollTops.length;
    var flag = false;
    for (var s = 0; s < len - 1; s++) {
        if (scrollTops[s] <= top && top < scrollTops[s + 1]) {
            $('.tea-left').find("li").removeClass("active");
            $($('.tea-left').find("li")[s]).addClass("active");
            break;
        }
    }
};
var jumpTo = function (name) {
    $('.tea-right').unbind('scroll');
    var scrollTop = scrollMap[name];
    $('.tea-right').animate({
        scrollTop: scrollTop
    }, 1000, function () {
        $('.tea-right').scroll(tempFn);
    });
};

//定义用户未操作界面显示跳转维修界面的图标
var time = 5000;
var timer;
var setTimer = function () {
    $('.repair').hide();
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function () {
        $('.repair').show();
    }, time);
};
var setTimerFn = function () {
    $('html').click(setTimer);
    $('html')[0].addEventListener('touchstart', setTimer);
};
var setPraiseFn = function (callbackFn) {
    $('.praise').click(function () {
        if ($(this).hasClass('like')) {
            $(this).parent().find(".belittle").removeClass("unlikeChecked").addClass("unlike");
            $(this).removeClass("like").addClass("likeChecked");
        } else {
            return;
            $(this).removeClass("likeChecked").addClass("like");
        }
    });
    $('.belittle').click(function () {
        if ($(this).hasClass('unlike')) {
            $(this).parent().find(".praise").removeClass("likeChecked").addClass("like");
            $(this).removeClass("unlike").addClass("unlikeChecked");
        } else {
            return;
            $(this).removeClass("unlikeChecked").addClass("unlike");
        }
    })
};

var showReplay = function (domId) {
    var oDom = document.getElementById(domId);
    var oInput = $(oDom).find("textarea")[0];
    var oInputText = $(oInput).val();
    if(oInputText!=""){
        console.log("必须先删除原有的评论才可以重新评论");
        return;
    }
    $(oDom).show();
    if (oInput.autofocus != true) {
        oInput.focus();
    }
};

var sendReply = function(id){
    if(!id){
        return;
    }
    var txt = $("#"+id).val();
    $("#"+id).attr("readonly",true);
    if(txt){
        console.log("这里提交回复数据.");
        $("#toast").show();
    }
};

$.fn.longPress = function (fn) {
    var timeout = undefined;
    var $this = this;
    for (var i = 0; i < $this.length; i++) {
        $this[i].addEventListener('touchstart', function (event) {
            var that = this;
            event.preventDefault();
            timeout = setTimeout(function(){
                fn(that);
            }, 800);
        }, false);
        $this[i].addEventListener('touchend', function (event) {
            clearTimeout(timeout);
        }, false);
    }
};

//设置右侧list滚动对左侧菜单栏的联动
var setScrollListenFn = function () {
    $('.tea-right').scroll(tempFn);
};

$(document).ready(function () {
    var startX, startY, moveEndX, moveEndY, X, Y;
    $("body").on("touchstart", function (e) {
        //e.preventDefault();
        var top = $('.tea-right').scrollTop();
        if(!top){
            return;
        }
        startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
    });
    $("body").on("touchmove", function (e) {
        var top = $('.tea-right').scrollTop();
        if(!top){
            return;
        }
        moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;
        if (Math.abs(X) > Math.abs(Y) && X > 0) {
            //alert("left 2 right");
        }
        else if (Math.abs(X) > Math.abs(Y) && X < 0) {
            //alert("right 2 left");
        }
        else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
            //alert("top 2 bottom");
            if (top == 0) {
                console.log("阻止上滑");
                e.preventDefault();
            }
        }
        else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
            //alert("bottom 2 top");
            if (top == scrollTops[scrollTops.length - 1] && top != 0) {
                console.log("阻止下滑");
                e.preventDefault();
            }
        }
    });
});