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

    // $$$全局变量
    var currentProduct = "";
    var currentProductIndex = -1;
    var showTimes = 2; // 展示的商品数
    var countTimes = 10; // 倒计时30
    var selectColorTimes = 3; // 最多只能选择3次颜色
    var selectBgTimes = 3; // 最多只能选择3次背景

    // $$$初始化产品
    var productArr = [];
    for(var product in dataMap){
        productArr.push(product);
    }

    function getRmdProduct() {
        var rmdProductIndex = Math.floor(Math.random() * productArr.length);
        var rmdProduct = dataMap[productArr[rmdProductIndex]];
        if(currentProductIndex === rmdProductIndex){
            getRmdProduct();
        }
        currentProduct = rmdProduct;
        return rmdProduct;
    }

    function showOver(){
        $("#area2").hide();
        $("#area1").show();
    }

    function changeProductOrMode(product,  mode){
        currentProduct = product;
         if(mode == 0){
            $('#displayContainer').empty()
                    .append('<img class="center-img" src=' + product.imageFolder + product.prefix.replace(/{{color}}/g,  product.colorList[0]) + '1'+ product.ext +'>');

        }else {
             $('#displayContainer').empty()
                    .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
            if(mode == 1){
                 buildThreeSixty(product);
             }else {
                 if(mode == 2){

                    // 切换颜色
                    $('#selectModeSubColor .list').empty();
                     for(var colorIndex in product.colorList){
                        $('#selectModeSubColor .list')
                            .append('<button type="button" class="am-btn am-round am-btn-xs" data-color="'+ product.colorList[colorIndex] +'">' 
                                    + product.colorList[colorIndex]+ '</button>');
                     }
                     $('#chooseColor').trigger('click');

                     // 切换背景
                     for(var bgIndex in product.backgroud){
                        $('#selectModeSubBg .list')
                            .append('<button type="button" class="am-btn am-round am-btn-xs" data-bgimg="'+ product.backgroud[bgIndex].img +'">' 
                                    +product.backgroud[bgIndex].desc+ '</button>');
                     }
                     $('#chooseBg').trigger('click');

                 }
             }

        }
    }

    function showCase (){
         countTimes = 10;
         $("#countTimes").html(countTimes);
        // $$$随机产生一个产品
        var rmdProduct = getRmdProduct();

         // $$$随机产生一中展示方式0:2D 1:3D 2:Contextual interaction
        var rmdMode = Math.floor(Math.random() * 3);

        console.info(rmdProduct, rmdMode);

         if(rmdMode == 2){
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
        }else{
            $('#interactionSelect').hide();
        }
        $('#productInfo').html(rmdProduct.productInfo);
        changeProductOrMode(rmdProduct, rmdMode);
    }

    showCase();
    var itv = setInterval(function(){
         countTimes--
         $("#countTimes").html(countTimes);
         if(countTimes == -1){
            showTimes--;
            if(showTimes == 1){
                 showCase();
            }
            if(showTimes == 0){
                clearInterval(itv);
                showOver();
            }
         }
    }, 1000);
    
    $("#chooseColor").change(function(){
        countTimes = 30;
        selectColorTimes --;
        if(selectColorTimes <= 0){
            clearInterval(itv);
            return false;
        }
        var color = $("#chooseColor").val();
        var bgimg = $("#chooseBg").val();
        $('#displayContainer').empty()
                    .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
        buildThreeSixty(currentProduct, color);
        $('.product' , '#displayContainer').css('background-image', 'url('+ currentProduct.imageFolder + bgimg +')');
    });

    $("#chooseBg").change(function(){
        countTimes = 30;
        selectBgTimes --;
        console.info(selectBgTimes)
        if(selectBgTimes <= 0){
            clearInterval(itv);
            return false;
        }
        var color = $("#chooseColor").val();
        var bgimg = $("#chooseBg").val();
         $('#displayContainer').empty()
                    .append('<div class="threesixty preloading product"><div class="spinner"><span>0%</span></div><ol class="threesixty_images"></ol></div> ');
        buildThreeSixty(currentProduct, color);
        $('.product' , '#displayContainer').css('background-image', 'url('+ currentProduct.imageFolder + bgimg +')');

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


})