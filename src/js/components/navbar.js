let scrollTo = (hash) => {
	let targetOffsetTop = $(`.ggs-${hash.replace(/#/, '')}`).offset().top;
	console.log(targetOffsetTop);
	$('html').animate({
		scrollTop: targetOffsetTop
	}, 300);
}

$(window).on('hashchange', function() {
	let hash = window.location.hash;
	scrollTo(hash);
	$('.nav-link').removeClass('active');
	$(`.nav-link[href="${hash}"]`).addClass('active');
});

document.addEventListener('DOMContentLoaded', function() {
	let hash = window.location.hash;
	if (hash.length > 0) {
		scrollTo(hash);
	}
	$(`.nav-link[href="${hash}"]`).addClass('active');
});

$(document).ready(function() {
	if ($('html.mobile, html.desktop').length > 0) {
		$('a.navbar-text').click(function() {
			yaCounter46056114.reachGoal('mobile_call', function() {
				console.log('mobile_call');
			});
		});
		$(document).click(function() {
			if ($('.navbar-collapse.collapse.show').length > 0) {
				$('.navbar-toggler').click();
			}
		});
	}
});