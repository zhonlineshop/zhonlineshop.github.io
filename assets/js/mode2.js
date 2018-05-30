$(function () {

    //当前导航高亮
    var aLi = [];
    if ($(window).outerWidth() <= 640) {
        aLi = $('.am-menu').find('a');
    } else {
        aLi = $('.am-nav').find('a');
    }

    // 左右panel等高
    $('.con-panel-right').height($('.img-panel-left').height());

    // 根据页面切换这里
    var indecator = $('#indecator').val();
    var product = dataMap[indecator]; 
    var countTimes = 180; // 倒计时180s

    $('.product' , '#displayContainer').ThreeSixty({
        totalFrames: 16, // Total no. of image you have for 360 slider
        endFrame: 16, // end frame for the auto spin animation
        currentFrame: 1, // This the start frame for auto spin
        imgList: '.threesixty_images', // selector for image list
        progress: '.spinner', // selector to show the loading progress
        imagePath: product.imageFolder, // path of the image assets
        filePrefix: product.prefix.replace(/{{color}}/g,  product.colorList[0]), // file prefix if any
        ext: product.ext, // extention for the assets
        
        navigation: true
    });

    $('#productInfo').html(product.productInfo);


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


   var popHtml = '<div style="text-align:center; margin-top:30px;">Please close other running applications. </div>'
        + '<div style="text-align:center; margin-top:30px;">You can use rotation function in 3D presentation.</div>';


    layer.ready(function(){ 
      layer.open({
        type: 1,
        title: 'Tips',
        maxmin: false,
        area: ['600px', '380px'],
        content: popHtml,
        btn: ["I know it"]
      });
    });


})