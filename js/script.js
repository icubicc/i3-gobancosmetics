/* This file contains main script for website
 * Style related scripts is located in style.js
 */
/* global document jQuery */

// initialize when document is ready
jQuery(document).ready(function($) {

	// BEN 08.29 STARTS
	var $window = $(window),
		windowWidth = $window.width();
	// BEN 08.29 ENDS

	// initialize spinner
	$('.js-input-spinner').spinner();

	// initialize Flickity
	$('.js-slider-hero').find('.slider-hero-slides').flickity({
		imagesLoaded: true,
		wrapAround: true,
		dragThreshold: 8,
		arrowShape: 'M98 50.25c0 2.761-2.239 5-5 5h-72.951l22.657 22.719c1.95 1.956 1.946 5.121-.009 7.071-.976.974-2.254 1.46-3.531 1.46-1.281 0-2.564-.49-3.54-1.469l-31.166-31.25c-1.946-1.952-1.946-5.11 0-7.062l31.166-31.25c1.95-1.955 5.115-1.959 7.071-.009 1.955 1.95 1.959 5.115.009 7.071l-22.657 22.719h72.951c2.761 0 5 2.239 5 5'
	});

	// BEN 08.29 STARTS
	var $productOverviewSlider = $('.js-product-overviews-slider').flickity({
		cellAlign: 'left',
		contain: true,
		draggable: false,
		pageDots: false
	});

	$productOverviewSlider.on('select.flickity', function() {
		var flick = $productOverviewSlider.data('flickity'),
			flickLength = flick.cells.length,
			visibleSlide,
			nextCount;

		for (const [i, cell] of flick.cells.entries()) {
			if (cell.x >= flick.size.width) {
				visibleSlide = i;
				break;
			}
		}

		nextCount = flickLength - visibleSlide;

		if (!nextCount) {
			$(this).find('.flickity-prev-next-button.previous').hide();
			$(this).find('.flickity-prev-next-button.next').hide();
		} else {
			if (flick.selectedIndex >= nextCount) {
				$(this).find('.flickity-prev-next-button.next').attr('disabled', true);
			} else {
				$(this).find('.flickity-prev-next-button.next').attr('disabled', false);
			}
		}
	});

	$productOverviewSlider.flickity('resize');

	var $instagramHighlightGrid = $('.js-instagram-highlight-grid').flickity({
		cellAlign: 'left',
		contain: true,
		freeScroll: true,
		imagesLoaded: true,
		pageDots: false,
		prevNextButtons: false,
		resize: false,
		wrapAround: true,
		selectedAttraction: 0.001,
		friction: 1
	});

	function instagramHighlightGridAnimation() {
		var flick = $instagramHighlightGrid.data('flickity'),
			previousDate;

		function step() {
			if (typeof previousDate == 'undefined') {
				return;
			}

			var date = new Date();
			var diff = Math.floor((date - previousDate) / 12);
			previousDate = date;

			flick.x -= diff;
			flick.positionSlider();

			requestAnimationFrame(step);
		}

		function play() {
			if (typeof previousDate == 'undefined') {
				previousDate = new Date();
			}

			requestAnimationFrame(step);
		}

		function pause() {
			previousDate = undefined;
		}

		play();
	}

	if ($instagramHighlightGrid.length) {
		instagramHighlightGridAnimation();
	}

	$window.on('resize', function() {
		if ($window.width() !== windowWidth) {
			windowWidth = $window.width();
			$instagramHighlightGrid.flickity('resize');
		}
	});
	// BEN 08.29 ENDS

	$('.js-slider-image').find('.slider-image-slide').flickity({
		draggable: false,
		imagesLoaded: true,
		pageDots: false,
		prevNextButtons: false,
		setGallerySize: false,
		selectedAttraction: 0.05,
		friction: 0.5
	});

	$('.js-slider-image').find('.slider-image-nav').flickity({
		asNavFor: '.js-slider-image .slider-image-slide',
		cellAlign: 'left',
		imagesLoaded: true,
		groupCells: true,
		pageDots: false,
		arrowShape: {
			x0: 30,
			x1: 50, y1: 20,
			x2: 50, y2: 10,
			x3: 40
		}
	});

	// initialize magnificPopup
	$('.js-popup-link').magnificPopup({
		type: 'inline',
		mainClass: 'mfp-animation',
		removalDelay: 200
	});

	// .product-variant .chosen value
	var $productVariant = $('.js-product-shop-variant');
	$productVariant.find('.input').on('change', function() {
		var value = $(this).siblings('.label').attr('title');
		$(this).parents('.js-product-shop-variant').find('.chosen').html(value);
	});

});
