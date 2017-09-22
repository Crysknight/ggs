$(document).ready(function() {

	let form = $('.ggs-fast-form-section');

	form.find('.submit-fast-form').click(function() {

		let _this = $(this);

		let data = {
			form: 'fast_form'
		};

		let apartmentSpace = form.find('input.apartment-space');
		if (apartmentSpace.val() === '') {
			apartmentSpace.addClass('error');
			setTimeout(function() {
				apartmentSpace.removeClass('error');
			}, 1500);
		} else {
			data.apartmentSpace = apartmentSpace.val();
		}

		let address = form.find('input.address');
		if (address.val() === '') {
			address.addClass('error');
			setTimeout(function() {
				address.removeClass('error');
			}, 1500);
		} else {
			data.address = address.val();
		}

		let phone = form.find('input.input-phone');
		if (phone.val() === '') {
			phone.addClass('error');
			setTimeout(function() {
				phone.removeClass('error');
			}, 1500);
		} else {
			data.phone = phone.val();
		}

		if (apartmentSpace.val() === '' || address.val() === '' || phone.val() === '') {
			_this.addClass('error').text('Все поля обязательны');
			setTimeout(function() {
				_this.removeClass('error').text('Оценить сейчас');
			}, 1500);
		} else {
			form.find('.form-shade').css({ 'z-index': '450' }).animate({
				'opacity': 0.3
			});
			data = JSON.stringify(data);
			$.post({
				url: '/process_post.php',
				contentType: 'application/json',
				data,
				success: function() {
					form.find('.thank-you-message').css({ 'z-index': '500' }).animate({
						'opacity': 1
					}, 300);
				},
				error: function() {
					form.find('.thank-you-message').html('Что-то пошло не так<br />Попробуйте еще раз').css({ 'z-index': '500' }).animate({
						'opacity': 1
					}, 300);
				}
			});
		}
	});

});