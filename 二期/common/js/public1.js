$(function () {
    $(".home-tab ul.home-ul li").click(function () {
        var index = $(this).index() + 1;
        $(this).siblings().removeClass('active').end().addClass('active');
        $(".sug" + index).siblings().hide().end().show();
    });

    var totalH = $("html").height();
    var h1 = $(".supper-title").height();
    var h2 = $(".supper-tab").height();
    var h3 = $(".supper-tip").height();
    var h4 = $(".detail").height();
    $(".tea").height(totalH - h4 - h2 - h3);
    //左侧导航点击定位
    var arr = [];
    var rightItem_length = parseInt($(".tea-right .item").length);
    for (i = 0; i < rightItem_length; i++) {
        arr[i] = $(".tea-right .item").eq(i).position().top;
    }
    $(".tea-left li").click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        var scrolltop = $(".tea-right .item").eq(index).position().top;
        $('.tea-right').stop(false).animate({ scrollTop: arr[index] }, 0);

    });
    //左侧导航点击定位end
    //右侧滚动，左侧菜单联动
    $('.tea-right').scroll(function () {
        var top = $(this).scrollTop();
        var lastItem = $(".tea-right .item").eq(rightItem_length-1).height();;
        var rightHeight = parseInt($(".tea-right").height());
        $('.tea-left li').each(function (i) {
            if (top >= arr[i]-24) {
                $('.tea-left li').eq(i).addClass('active').siblings().removeClass('active');
            }
        });
        if (top + rightHeight >= arr[rightItem_length-1]+lastItem+13) {
            $('.tea-left li').eq(rightItem_length-1).addClass('active').siblings().removeClass('active');
        }
        var liHeight = $(".tea .tea-right ul li").height()*2;
        var sContainter = $(".detail").height();
        if (top > liHeight) {//轮播图上划消失
            $(".detail").slideUp(1000);
            $(".tea").height(totalH - h1 - h2 - h3);
            $(".supper-bak").hide();
            $(".supper-fix").css("position", "relative");
            $(".supper-title").css({ "position": "relative", "background-color": "#3190E8", "opacity": 1 });
           
        } else if (top == 0) {
            $('.detail').stop(false).slideDown(1000, function () {
                $(".tea").height(totalH - h4 - h2 - h3);
            });
            $(".supper-bak").show();
            $(".supper-fix").css("position", "absolute");
            $(".supper-title").css({ "position": "relative", "background": "none" });
        }
    });
    //右侧滚动，左侧菜单联动
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