/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Carousel.
		var $carousel = $('.carousel-container'),
			$track = $('.carousel-track'),
			$slides = $('.carousel-slide'),
			$prevBtn = $('.carousel-prev'),
			$nextBtn = $('.carousel-next'),
			$indicators = $('.carousel-indicator'),
			currentSlide = 0,
			slideCount = $slides.length,
			autoplayInterval = null,
			autoplayDelay = 10000;

		function goToSlide(index) {
			var maxSlide = slideCount - 1;
			if (index < 0) index = maxSlide;
			if (index > maxSlide) index = 0;
			currentSlide = index;
			// Calculate offset: each slide is ~50% width plus gap
			var slideWidth = $slides.first().outerWidth(true);
			var offset = currentSlide * slideWidth;
			$track.css('transform', 'translateX(-' + offset + 'px)');
			$indicators.removeClass('active');
			$indicators.eq(currentSlide).addClass('active');
		}

		function nextSlide() {
			goToSlide(currentSlide + 1);
		}

		function prevSlide() {
			goToSlide(currentSlide - 1);
		}

		function startAutoplay() {
			stopAutoplay();
			autoplayInterval = setInterval(nextSlide, autoplayDelay);
		}

		function stopAutoplay() {
			if (autoplayInterval) {
				clearInterval(autoplayInterval);
				autoplayInterval = null;
			}
		}

		if ($carousel.length > 0) {
			$nextBtn.on('click', function() {
				nextSlide();
				startAutoplay();
			});

			$prevBtn.on('click', function() {
				prevSlide();
				startAutoplay();
			});

			$indicators.on('click', function() {
				var slideIndex = $(this).data('slide');
				goToSlide(slideIndex);
				startAutoplay();
			});

			// Start autoplay
			startAutoplay();

			// Pause on hover
			$carousel.on('mouseenter', stopAutoplay);
			$carousel.on('mouseleave', startAutoplay);
		}

})(jQuery);