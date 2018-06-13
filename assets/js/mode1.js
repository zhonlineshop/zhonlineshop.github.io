$(function () {

    //当前导航高亮
    var aLi = [];
    if ($(window).outerWidth() <= 640) {
        aLi = $('.am-menu').find('a');
    } else {
        aLi = $('.am-nav').find('a');
    }

    // 根据页面切换这里
    var indecator = $('#indecator').val();
    var product = dataMap[indecator];
    var countTimes = 180; // 倒计时180s
 

    $('#displayContainer').html('<img class="center-img" src=' + product.imageFolder 
      + product.prefix.replace(/{{color}}/g,  product.colorList[0]) + '1'+ product.ext +'>');
    $('#productInfo').html(product.productInfo);
    $('#productTtile').html(product.productTtile);


    $("#countTimes").html(countTimes);

    function showOver(){
        $("#area2").hide();
        $("#area1").show();
        // 10秒后关闭窗口
        var closeNum = 10;
        setInterval(function(){
            $('#closeNum').html(closeNum);
            closeNum--;
            if(closeNum == -1) {
                closeWindow();
            }
            if(closeNum < 0) {
                closeNum = 0;
            }
        }, 1000);
    }


  // 左右panel等高
   $('.con-panel-right').height($('.img-panel-left').height());
    var itv = setInterval(function(){
         countTimes--
         $("#countTimes").html(countTimes);
         if(countTimes == -1){
            clearInterval(itv);
            showOver();
         }
          // 左右panel等高
        $('.con-panel-right').height($('.img-panel-left').height());
    }, 1000);
    


    function closeWindow(){
          window.opener=null;
          window.open('','_self');
          window.close();
          window.location.href="about:blank";
          window.close();
    }


   var popHtml = '<div style="text-align:center; margin-top:60px;">If your Internet connection is slow to load this website, please close other running applications to enhance speed.</div>';


    layer.ready(function(){ 
      layer.open({
        type: 1,
        title: 'Tips',
        maxmin: false,
        area: ['600px', '380px'],
        content: popHtml,
        btn: ["OK"]
      });
    });


})