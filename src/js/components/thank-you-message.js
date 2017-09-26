let thankYouMessage = $('.ggs-thank-you-message, .ggs-get-loan');

thankYouMessage.click(function(event) {
	let target = $(event.target);
	if (
		target.is('button.cross.close-message') ||
		target.is('.ggs-thank-you-message') ||
		target.is('.ggs-get-loan') ||
		target.is('button.ggs-button.close-message')
	) {
		$(this).animate({ "opacity": 0 }, 300, function() {
			$(this).css({ "z-index": -5 });
		});
		$('.form-shade').css({ "opacity": 0, "z-index": -5 });
	}
});