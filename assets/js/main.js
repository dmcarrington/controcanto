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

	// EmailJS Configuration
		// TODO: Replace these with your actual EmailJS credentials
		var EMAILJS_PUBLIC_KEY = '9ZeoT0NBpD2_nI3im';
		var EMAILJS_SERVICE_ID = 'service_0nbctgw';
		var EMAILJS_TEMPLATE_ID = 'template_ehtkvfj';

		// Initialize EmailJS
		if (typeof emailjs !== 'undefined') {
			emailjs.init(EMAILJS_PUBLIC_KEY);
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

				var $submitBtn = $(this).find('button[type="submit"]');
				var originalText = $submitBtn.text();

				var name = $('#booking-name').val().trim();
				var email = $('#booking-email').val().trim();
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

				// Disable button and show loading state
				$submitBtn.prop('disabled', true).text('Sending...');

				// Send email via EmailJS
				emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
					from_name: name,
					from_email: email,
					preferred_date: formattedDate,
					location: location,
					to_email: 'controcanto@proton.me'
				}).then(function() {
					alert('Booking request sent successfully! We will get back to you soon.');
					$bookingForm[0].reset();
				}).catch(function(error) {
					console.error('EmailJS error:', error);
					alert('Failed to send booking request. Please try again or email us directly at controcanto@proton.me');
				}).finally(function() {
					$submitBtn.prop('disabled', false).text(originalText);
				});
			});
		}

})(jQuery);

// Modal functions (global scope for onclick handlers)
function openDatesModal() {
	var modal = document.getElementById('dates-modal');
	var iframe = document.getElementById('dates-iframe');
	iframe.src = 'data/dates.pdf';
	modal.classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeDatesModal() {
	var modal = document.getElementById('dates-modal');
	var iframe = document.getElementById('dates-iframe');
	modal.classList.remove('active');
	iframe.src = '';
	document.body.style.overflow = '';
}

// Close modal when clicking outside content
document.addEventListener('DOMContentLoaded', function() {
	var modal = document.getElementById('dates-modal');
	if (modal) {
		modal.addEventListener('click', function(e) {
			if (e.target === modal) {
				closeDatesModal();
			}
		});
	}
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
	if (e.key === 'Escape') {
		var modal = document.getElementById('dates-modal');
		if (modal && modal.classList.contains('active')) {
			closeDatesModal();
		}
	}
});