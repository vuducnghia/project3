$(document).ready(function () {
    $('.single-rating').find('.star').click(function () {
        // alert("a");
        var className = $(this).attr('class');
        var index = className.substring(9);
        for( var i = 1; i <= 5; i++){
            $star = '.star' + i;
            $('.single-rating').find('.star' + i).find('.fa').attr('class', 'fa fa-star-o');
        }
        for( var i = 1; i <= index; i++){
            $star = '.star' + i;
            $('.single-rating').find('.star' + i).find('.fa').attr('class', 'fa fa-star');
        }
    });

});
