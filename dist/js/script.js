$(window).on('load', function(){
	$('.slider__container').slick({
	 	dots: true
	 });
	$('.loader').fadeOut('slow');
});

$(document).ready(function(){

	 $('.menu-button').on('click', function(){
	 	if(!$('.menu-button').hasClass('active')){
			$(this).addClass('active');
	 		$(this).next().slideDown('fast');
		} else {
			$(this).removeClass('active');
			$(this).next().slideUp('fast');
	 	}
	 });

	 $(".top-link a").on("click", function (event) {
	        event.preventDefault();
	        var link  = $(this).attr('href'),
	            goTop = $(link).offset().top;
	        $('body,html').animate({scrollTop: goTop}, 1500);
	    });

});








