(function ($) {
	"use strict";

	// Preloader
	$(window).on('load', function () {
		$('#js-preloader').addClass('loaded');

		// Parallax
		if ($('.cover').length) {
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({ 'opacity': '0' }, 600, function () {
			setTimeout(function () {
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});

	// WOW JS
	$(window).on('load', function () {
		if ($(".wow").length) {
			var wow = new WOW({
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 20,
				mobile: true,
				live: true,
			});
			wow.init();
		}
	});

	// Header background on scroll
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('.header-text').height();
		var header = $('header').height();

		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	});

	// Isotope Filtering
	var $grid = $(".grid").isotope({
		itemSelector: ".all",
		percentPosition: true,
		masonry: {
			columnWidth: ".all"
		}
	});

	$('.filters ul li').click(function () {
		$('.filters ul li').removeClass('active');
		$(this).addClass('active');

		var data = $(this).attr('data-filter');
		$grid.isotope({ filter: data });
	});

	// NACC Tabs
	$(document).on("click", ".naccs .menu div", function () {
		var numberIndex = $(this).index();

		if (!$(this).hasClass("active")) {
			$(".naccs .menu div").removeClass("active");
			$(".naccs ul li").removeClass("active");

			$(this).addClass("active");
			$(".naccs ul").find("li:eq(" + numberIndex + ")").addClass("active");

			var listItemHeight = $(".naccs ul")
				.find("li:eq(" + numberIndex + ")")
				.innerHeight();
			$(".naccs ul").height(listItemHeight + "px");
		}
	});

	// Owl Carousels
	$('.owl-cites-town').owlCarousel({
		items: 4,
		loop: true,
		dots: false,
		nav: true,
		autoplay: true,
		margin: 30,
		responsive: {
			0: { items: 1 },
			800: { items: 2 },
			1000: { items: 4 }
		}
	});

	$('.owl-weekly-offers').owlCarousel({
		items: 3,
		loop: true,
		dots: false,
		nav: true,
		autoplay: true,
		margin: 15,
		responsive: {
			0: { items: 1 },
			800: { items: 2 },
			1000: { items: 3 }
		}
	});

	$('.owl-banner').owlCarousel({
		items: 1,
		loop: true,
		dots: false,
		nav: true,
		autoplay: true,
		margin: 30,
		responsive: {
			0: { items: 1 },
			600: { items: 1 },
			1000: { items: 1 }
		}
	});

	// Banner Switcher Logic
	document.addEventListener("DOMContentLoaded", function () {
		const banners = document.querySelectorAll(".banner");
		const radios = document.querySelectorAll(".sec-1-input");

		function switchBanner(index) {
			banners.forEach(b => b.classList.remove("active"));
			if (banners[index]) {
				banners[index].classList.add("active");
			}
		}

		radios.forEach((radio, i) => {
			radio.addEventListener("change", () => {
				switchBanner(i);
			});
		});

		// Activate first banner if none are active
		if (!document.querySelector('.banner.active') && banners.length) {
			banners[0].classList.add('active');
		}
	});

	// Auto Slide Banners Every 5s
	function bannerSwitcher() {
		let radios = document.querySelectorAll(".sec-1-input");
		let checkedIndex = Array.from(radios).findIndex(r => r.checked);
		let nextIndex = (checkedIndex + 1) % radios.length;
		radios[nextIndex].checked = true;
		radios[nextIndex].dispatchEvent(new Event("change"));
	}

	let bannerTimer = setInterval(bannerSwitcher, 5000);

	$('nav .controls label').click(function () {
		clearInterval(bannerTimer);
		bannerTimer = setInterval(bannerSwitcher, 5000);
	});

	// Mobile menu toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}

	// Smooth Scrolling
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
			location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	// Scrollspy
	$(document).on("scroll", function () {
		var scrollPos = $(document).scrollTop();
		$('.nav a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.length &&
				refElement.position().top <= scrollPos &&
				refElement.position().top + refElement.height() > scrollPos) {
				$('.nav ul li a').removeClass("active");
				currLink.addClass("active");
			} else {
				currLink.removeClass("active");
			}
		});
	});
	document.addEventListener("DOMContentLoaded", function () {
		const bannerContainer = document.querySelector(".banners");
		const banners = document.querySelectorAll(".banner");
		const controlsContainer = document.querySelector("nav .controls");

		controlsContainer.innerHTML = "";

		banners.forEach((_, index) => {
			const radio = document.createElement("input");
			radio.type = "radio";
			radio.name = "slider";
			radio.className = "sec-1-input";
			radio.id = `s${index + 1}`;
			if (index === 0) radio.checked = true;

			const label = document.createElement("label");
			label.htmlFor = `s${index + 1}`;

			controlsContainer.appendChild(radio);
			controlsContainer.appendChild(label);
		});

		const radios = document.querySelectorAll(".sec-1-input");

		function switchBanner(index) {
			banners.forEach(b => b.classList.remove("active"));
			if (banners[index]) {
				banners[index].classList.add("active");
			}
		}

		radios.forEach((radio, i) => {
			radio.addEventListener("change", () => {
				switchBanner(i);
			});
		});

		if (!document.querySelector(".banner.active") && banners.length) {
			banners[0].classList.add("active");
		}

		function bannerSwitcher() {
			let checkedIndex = Array.from(radios).findIndex(r => r.checked);
			let nextIndex = (checkedIndex + 1) % radios.length;
			radios[nextIndex].checked = true;
			radios[nextIndex].dispatchEvent(new Event("change"));
		}

		let bannerTimer = setInterval(bannerSwitcher, 5000);

		controlsContainer.querySelectorAll("label").forEach(label => {
			label.addEventListener("click", () => {
				clearInterval(bannerTimer);
				bannerTimer = setInterval(bannerSwitcher, 5000);
			});
		});
	});

})(window.jQuery); // ← Leave this line where it is
