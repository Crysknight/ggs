let scrollTo = (hash) => {
	let targetOffsetTop = $(`.ggs-${hash.replace(/#/, '')}`).offset().top;
	$('body').animate({
		scrollTop: targetOffsetTop
	}, 300);
}

$(window).on('hashchange', function() {
	let hash = window.location.hash;
	scrollTo(hash);
});

document.addEventListener('DOMContentLoaded', function() {
	let hash = window.location.hash;
	if (hash.length > 0) {
		scrollTo(hash);
	}
});