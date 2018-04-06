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

    $('#displayContainer').html('<img class="center-img" src=' + product.imageFolder + product.prefix.replace(/{{color}}/g,  product.colorList[0]) + '1'+ product.ext +'>');
    $('#productInfo').html(product.productInfo);

})