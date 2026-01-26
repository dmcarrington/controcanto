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
			slideCount = $slides.length;

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

		if ($carousel.length > 0) {
			$nextBtn.on('click', function() {
				nextSlide();
			});

			$prevBtn.on('click', function() {
				prevSlide();
			});

			$indicators.on('click', function() {
				var slideIndex = $(this).data('slide');
				goToSlide(slideIndex);
			});
		}

	// Booking Form.
		var $bookingForm = $('#booking-form'),
			$locationSelect = $('#booking-location');

		// Load locations from JSON
		if ($locationSelect.length > 0) {
			$.getJSON('data/locations.json', function(data) {
				if (data.locations && data.locations.length > 0) {
					data.locations.forEach(function(location) {
						$locationSelect.append(
							$('<option>', {
								value: location,
								text: location
							})
						);
					});
				}
			}).fail(function() {
				console.error('Failed to load locations');
			});
		}

		// Handle form submission
		if ($bookingForm.length > 0) {
			$bookingForm.on('submit', function(e) {
				e.preventDefault();

				var name = $('#booking-name').val().trim();
				var email = $('#booking-email').val().trim();
				var phone = $('#booking-phone').val().trim();
				var date = $('#booking-date').val();
				var location = $('#booking-location').val();

				// Validate email format
				var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(email)) {
					alert('Please enter a valid email address.');
					$('#booking-email').focus();
					return;
				}

				// Format date for display
				var formattedDate = date ? new Date(date).toLocaleDateString('en-GB', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}) : 'Not specified';

				// Build email body
				var subject = encodeURIComponent('Booking Request from ' + name);
				var body = encodeURIComponent(
					'Name: ' + name + '\n' +
					'Email: ' + email + '\n' +
					'Phone: ' + phone + '\n' +
					'Preferred Date: ' + formattedDate + '\n' +
					'Location: ' + location
				);

				// Open mailto link
				window.location.href = 'mailto:controcanto-dev@proton.me?subject=' + subject + '&body=' + body;
			});
		}

})(jQuery);