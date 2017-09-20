$(document).ready(function() {

	let form = $('.ggs-online-calculator');

	form.find('.select-number').click(function() {
		$(this).siblings().removeClass('chosen');
		$(this).addClass('chosen');
	});

	form.find('.submit-assessing-form').click(function() {

		let _this = $(this);

		let apartmentSpace = form.find('input.apartment-space');
		if (apartmentSpace.val() === '') {
			apartmentSpace.addClass('error');
			setTimeout(function() {
				apartmentSpace.removeClass('error');
			}, 1500);
		}
		let address = form.find('input.address');
		if (address.val() === '') {
			address.addClass('error');
			setTimeout(function() {
				address.removeClass('error');
			}, 1500);
		}
		let phone = form.find('input.input-phone');
		if (phone.val() === '') {
			phone.addClass('error');
			setTimeout(function() {
				phone.removeClass('error');
			}, 1500);
		}
		let region = form.find('input.region');
		if (region.val() === '') {
			region.addClass('error');
			setTimeout(function() {
				region.removeClass('error');
			}, 1500);
		}
		if (apartmentSpace.val() === '' || address.val() === '' || phone.val() === '') {
			_this.addClass('error').text('Не все поля заполнены');
			setTimeout(function() {
				_this.removeClass('error').text('Оценить сейчас');
			}, 1500);
		} else {
			form.find('.form-shade').css({ 'z-index': '450' }).animate({
				'opacity': 0.3
			});
			$.get({
				url: '/',
				success: function() {
					setTimeout(function() {
						form.find('.thank-you-message').css({ 'z-index': '500' }).animate({
							'opacity': 1
						}, 300);
					}, 1000);
				}
			});
		}
	});

});