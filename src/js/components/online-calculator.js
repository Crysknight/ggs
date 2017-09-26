$(document).ready(function() {

	let form = $('.ggs-online-calculator');

	form.find('.select-number').click(function() {
		$(this).siblings().removeClass('chosen');
		$(this).addClass('chosen');
	});

	form.find('.submit-assessing-form').click(function() {

		let _this = $(this);

		let data = {
			form: 'online_calculator'
		};

		data.numberOfRooms = form.find('.select-number.chosen').text();

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

		let region = form.find('input.region');
		if (region.val() !== '') {
			data.region = region.val();
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
			data = JSON.stringify(data);
			yaCounter46056114.reachGoal('online_calculator', function() {
				console.log('online_calculator');
			});
			$.post({
				url: '/process_post.php',
				contentType: 'application/json',
				data,
				success: function() {
					$('.ggs-thank-you-message').css({ 'z-index': '500' }).animate({
						'opacity': 1
					}, 300);
				},
				error: function() {
					$('.ggs-thank-you-message').css({ 'z-index': '500' }).animate({
						'opacity': 1
					}, 300);
				}
			});
		}
	});

});