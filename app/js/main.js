$(function() {
	$('.header__slider').slick({
		infinite: true,
		fade: true,
		prevArrow: '<img class="slider-arrows slider-arrows__left"src="img/arrows-left.svg" alt=""></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right"src="img/arrows-right.svg" alt=""></img>',
		asNavFor: '.slider-dotshead',
	});
	$('.slider-dotshead').slick({
		//Если не прописать infinite: false слайдер снизу уезжает при прокрутке
		infinite: false,
		slidesToShow: 4,
  		slidesToScroll: 4,
  		asNavFor: '.header__slider',
  		responsive:[
  		{
  			breakpoint: 961,
  			settings: "unslick",
  		},
  		]

	});

$('.surf-slider').slick({
		slidesToShow: 4,
  		slidesToScroll: 1,
  		prevArrow: '<img class="slider-arrows slider-arrows__left"src="img/arrows-left.svg" alt=""></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right"src="img/arrows-right.svg" alt=""></img>',
		asNavFor: '.slider-map',
		responsive:[
		{
			breakpoint: 1210,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 2,
			}
		},
			{
			breakpoint: 720,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				transformEnabled: false,
				useTransform: false,

			}
		},
		{
			breakpoint: 426,
			settings: {
				slidesToShow: 1,
				centerMode: false,
				transformEnabled: false,
				useTransform: false,

			}
		},
		]
});

$('.slider-map').slick({
	
	slidesToShow: 8,
	useTransform: true,
	arrows: false,
	asNavFor: '.surf-slider',
	focusOnSelect: true,
	responsive:[
		{
			breakpoint: 1102,
			settings: {
				slidesToShow: 3,
		// Эта штука позволяет двигать слайдер после !important
				useTransform: false,
			}
		},
		{
			breakpoint: 900,
			settings: {
				slidesToShow: 2,
				centerMode: true,
				// transformEnabled: false,
				useTransform: false,

			}
		},
		{
			breakpoint: 720,
			settings: {
				slidesToShow: 1,
				centerMode: true,
				transformEnabled: false,
				useTransform: false,

			}
		},
			{
			breakpoint: 720,
			settings: {
				slidesToShow: 1,
				centerMode: false,
				transformEnabled: false,
				useTransform: false,

			}
		},
		]
});
$('.holder__slider, .shop__slider').slick({
		infinite: true,
		fade: true,
		prevArrow: '<img class="slider-arrows slider-arrows__left"src="img/arrows-left.svg" alt=""></img>',
		nextArrow: '<img class="slider-arrows slider-arrows__right"src="img/arrows-right.svg" alt=""></img>',
});

$('<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="img/plus.svg" alt=""></div><div class="quantity-button quantity-down"><img src="img/minus.svg" alt=""></div></div>').insertAfter('.quantity input');
    $('.quantity').each(function() {
      var spinner = $(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });

    });
 //    $('.quantity-button').on('click', function () {
	// 	var parents = $(this).parents('.holder-slider__info');
	// 	let summ = $('.nights', parents).val() * $('.summ', parents).data('guests') * $('.guests', parents).val();
	// 	$('.summ', parents).html('$' + summ);
	// });

	// $('.quantity').each(function () {
	// 	var parents = $(this).parents('.holder-slider__info');
	// 	let summ = $('.nights', parents).val() * $('.summ', parents).data('guests') * $('.guests', parents).val();
	// 	$('.summ', parents).html('$' + summ);
	// });

	$('.quantity-button').on('click', function(){
	var parents = $(this).parents('.holder-slider__info');
	 let summ = $('.summ', parents).data('nights') * $('.nights', parents).val() + $('.summ', parents).data('guests') * $('.guests', parents).val();
	 $('.summ', parents).html('$' + summ);
	});


	$('.quantity').each(function() {
	var parents = $(this).parents('.holder-slider__info');
	let summ = $('.summ', parents).data('nights') * $('.nights', parents).val() + $('.summ', parents).data('guests') * $('.guests', parents).val();
	 $('.summ', parents).html('$' + summ);
	});


     //   let suum = $('.nights').val() * $('.summ').data('.nights') + ($('.guests').val() - 1) * $('.summ').data('guests');
    
     // $('.summ'). html('$' + summ);

     //Серф точки серфа
     $('.surfboard-box__circle').on('click',function(){
     	$(this).toggleClass('active')
     });
  
   $('.menu-btn').on('click',function(){
   	$('.menu').toggleClass('active');
   });

    new WOW().init();

 });