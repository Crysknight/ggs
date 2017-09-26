$(document).ready(function() {

	let form = $('.ggs-get-loan');

	form.find('.send-loan-form').click(function() {

		let _this = $(this);

		let data = {
			form: 'loan_form'
		};

		let name = form.find('input.name');
		if (name.val() === '') {
			name.addClass('error');
			setTimeout(function() {
				name.removeClass('error');
			}, 1500);
		} else {
			data.name = name.val();
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

		if (name.val() === '' || phone.val() === '') {
			_this.addClass('error').text('Все поля обязательны');
			setTimeout(function() {
				_this.removeClass('error').text('Оценить сейчас');
			}, 1500);
		} else {
			form.find('.form-shade').css({ 'z-index': '450' }).animate({
				'opacity': 0.5
			});
			data = JSON.stringify(data);
			yaCounter46056114.reachGoal('loan_form', function() {
				console.log('loan_form');
			});
			$.post({
				url: '/process_post.php',
				contentType: 'application/json',
				data,
				success: function() {
					$('.ggs-get-loan').css({ 'z-index': -5, 'opacity': 0 });
					$('.ggs-thank-you-message').css({ 'z-index': '500', 'opacity': 1 });
				},
				error: function() {
					form.find('.form-shade').text('Что-то пошло не так. Перезагрузите страницу').animate({ 'opacity': 0.95 });
				}
			});
			// $.get('/', function() {
			// 	$('.ggs-thank-you-message').css({ 'z-index': '500' }).animate({
			// 		'opacity': 1
			// 	}, 300);
			// });
		}
	});

});