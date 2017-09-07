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
        /*if (currnLinks.indexOf(links) != -1) {
         aLi[0].className = ""; //去掉默认的首页高亮
         aLi[i].className = "am-active";
         }else if (currnLinks.indexOf('reports') != -1 || currnLinks.indexOf('contact') != -1 || currnLinks.indexOf('join') != -1) {
         aLi[0].className = "";
         aLi[aLi.length - 1].className = "am-active";
         }*/
    }
    // 左右panel等高
    $('.con-panel-right').height($('.img-panel-left').height());

    // 初始化产品
    $('#selectProduct list').empty();
    for(var product in dataMap){
       $('#selectProduct .list').append('<button type="button" class="am-btn am-round am-btn-xs" data-product="'+ product +'">' + product + '</button>');
    }

    // product 切换
    $('#selectProduct .list').on('click', 'button', function(){
        var productName = $(this).data('product');
        var mode = $('#selectMode .am-active').data('mode') || 1;
        // 切换样式
        $('#selectProduct .list button').removeClass('am-active am-btn-success');
        $(this).addClass('am-active am-btn-success');
        changeProductOrMode(productName, mode);
    });

    $('#selectProduct .list button').eq(0).trigger('click');


    // mode切换
    $('#selectMode .list').on('click', 'button', function(){
        var productName =  $('#selectProduct .am-active').data('product');
        var mode = $(this).data('mode') || 1;
        // 切换样式
        $('#selectMode .list button').removeClass('am-active am-btn-success');
        $(this).addClass('am-active am-btn-success');
        changeProductOrMode(productName, mode);
    });

    // 颜色切换
    $('#selectModeSubColor .list').on('click', 'button', function(){
         // 切换样式
        $('#selectModeSubColor .list button').removeClass('am-active am-btn-success');
        $(this).addClass('am-active am-btn-success');

        var color = $('#selectModeSubColor .am-active').data('color');
        $('#displayContainer').empty()
                    .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
        buildThreeSixty(currentProduct, color);
		var bgimg = $('#selectModeSubBg .am-active').data('bgimg');
		$('.product' , '#displayContainer').css('background-image', 'url('+ currentProduct.imageFolder + bgimg +')');
    });

    // 背景切换
    $('#selectModeSubBg .list').on('click', 'button', function(){
         // 切换样式
        $('#selectModeSubBg .list button').removeClass('am-active am-btn-success');
        $(this).addClass('am-active am-btn-success');

        var bgimg = $('#selectModeSubBg .am-active').data('bgimg');
		$('.product' , '#displayContainer').css('background-image', 'url('+ currentProduct.imageFolder + bgimg +')');
    });

    var currentProduct;
    function changeProductOrMode(productName,  mode){
        var product = dataMap[productName];
        currentProduct = product;
         if(mode == 1){
            $('#selectModeSub').hide();

            $('#displayContainer').empty()
                    .append('<img class="center-img" src=' + product.imageFolder + product.prefix.replace(/{{color}}/g,  product.colorList[0]) + '1'+ product.ext +'>');

        }else {
             $('#displayContainer').empty()
                    .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
            if(mode == 2){
                 $('#selectModeSub').hide();
				 buildThreeSixty(product);
             }else {
                 $('#selectModeSub').show();
                 if(mode == 3){

                    // 切换颜色
                    $('#selectModeSubColor .list').empty();
                     for(var colorIndex in product.colorList){
                        $('#selectModeSubColor .list')
                            .append('<button type="button" class="am-btn am-round am-btn-xs" data-color="'+ product.colorList[colorIndex] +'">' 
                                    + product.colorList[colorIndex]+ '</button>');
                     }
                     $('#selectModeSubColor button').eq(0).trigger('click');

                     // 切换背景
                     $('#selectModeSubBg .list').empty();
                     for(var bgIndex in product.backgroud){
                        $('#selectModeSubBg .list')
                            .append('<button type="button" class="am-btn am-round am-btn-xs" data-bgimg="'+ product.backgroud[bgIndex].img +'">' 
                                    +product.backgroud[bgIndex].desc+ '</button>');
                     }
                     $('#selectModeSubBg button').eq(0).trigger('click');

                 }
             }

        }
    }


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

   /* $('.product').ThreeSixty({
        totalFrames: 72, // Total no. of image you have for 360 slider
        endFrame: 72, // end frame for the auto spin animation
        currentFrame: 1, // This the start frame for auto spin
        imgList: '.threesixty_images', // selector for image list
        progress: '.spinner', // selector to show the loading progress
        imagePath:'assets/images/mint1/', // path of the image assets
        filePrefix: 'red_vespa_', // file prefix if any
        ext: '.jpg', // extention for the assets
        height: 265,
        width: 400,
        navigation: true,
        disableSpin: true // Default false
    });*/



})