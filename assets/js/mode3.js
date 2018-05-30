$(function () {

    //当前导航高亮
    var aLi = [];
    if ($(window).outerWidth() <= 640) {
        aLi = $('.am-menu').find('a');
    } else {
        aLi = $('.am-nav').find('a');
    }
    for (var i = 0; i < aLi.length; i++) {
        var link_length = aLi[i].getAttribute("href").length;
        var links = aLi[i].getAttribute("href").substring(0, link_length - 5);
        var currnLinks = document.location.href;
    }
    // 左右panel等高
    $('.con-panel-right').height($('.img-panel-left').height());


    // 根据页面切换这里
    var indecator = $('#indecator').val();
    var product = dataMap[indecator]; 


    // $$$全局变量
    var currentProduct = "";
    var currentProductIndex = -1;
    var countTimes = 300; // 倒计时300s

    function getRmdProduct() {
        return product;
    }

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

    function changeProductOrMode(product, rmdBg){
        currentProduct = product;
        $('#displayContainer').empty()
                .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
        buildThreeSixty(product); 
        if(rmdBg && rmdBg.img && rmdBg.img !== ''){
            $('.product' , '#displayContainer').css('background-image', 'url(./'+ product.imageFolder + rmdBg.img +')');
        }   
    }

    function showCase (){
         $("#countTimes").html(countTimes);
        // $$$随机产生一个产品
        var rmdProduct = getRmdProduct();
        console.info(rmdProduct)

         // $$$随机产生一个颜色
        var rmdColorIndex =  Math.floor(Math.random() * rmdProduct.colorList.length);
        var rmdColor =  rmdProduct.colorList[rmdColorIndex];
        // $$$随机产生一个背景图
        var rmdBgIndex =  Math.floor(Math.random() * rmdProduct.backgroud.length);
        var rmdBg =  rmdProduct.backgroud[rmdBgIndex];
        // $$$ 生成下拉选项
        $('#chooseColor').empty();
        $('#chooseBg').empty();
        for(var i in rmdProduct.colorList){
            var item = rmdProduct.colorList[i];
            $('#chooseColor').append('<option value="' + item+ '">' + item + '</option>')
        }
        for(var i in rmdProduct.backgroud){
            var item = rmdProduct.backgroud[i];
            $('#chooseBg').append('<option value="' + item.img + '">' + item.desc + '</option>')
        }
        $('#interactionSelect').show();

        $('#productInfo').html(rmdProduct.productInfo);
        changeProductOrMode(rmdProduct, rmdBg);
    }

    showCase();
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
    
    $("#chooseColor").change(function(){
        var color = $("#chooseColor").val();
        var bgimg = $("#chooseBg").val();
        $('#displayContainer').empty()
                    .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
        buildThreeSixty(currentProduct, color);
        $('.product' , '#displayContainer').css('background-image', 'url(./'+ currentProduct.imageFolder + bgimg +')');
    });

    $("#chooseBg").change(function(){
        var color = $("#chooseColor").val();
        var bgimg = $("#chooseBg").val();
         $('#displayContainer').empty()
                    .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
        buildThreeSixty(currentProduct, color);
        $('.product' , '#displayContainer').css('background-image', 'url(./'+ currentProduct.imageFolder + bgimg +')');

    });

	var current360;

    function buildThreeSixty(product, color){
		if(current360){
			current360.stop();
		}
        current360 = $('.product' , '#displayContainer').ThreeSixty({
                totalFrames: 16, // Total no. of image you have for 360 slider
                endFrame: 16, // end frame for the auto spin animation
                currentFrame: 1, // This the start frame for auto spin
                imgList: '.threesixty_images', // selector for image list
                progress: '.spinner', // selector to show the loading progress
                imagePath: product.imageFolder, // path of the image assets
                filePrefix: product.prefix.replace(/{{color}}/g,  color || product.colorList[0]), // file prefix if any
                ext: product.ext, // extention for the assets
                navigation: true
            });
    }

    function closeWindow(){
          window.opener=null;
          window.open('','_self');
          window.close();
          window.location.href="about:blank";
          window.close();
    }

    var popHtml = '<div style="text-align:center; margin-top:30px;">Please close other running applications. </div>'
        + '<div style="text-align:center; margin-top:30px;">You can use rotation function and change color and background in contextual interaction presentation.</div>';


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