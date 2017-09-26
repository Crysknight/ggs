$(document).ready(function() {

	let form = $('.ggs-application-form');

	form.find('.submit-application-form').click(function() {

		let _this = $(this);

		let data = {
			form: 'application_form'
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

		let email = form.find('input.email');
		if (email.val() === '') {
			email.addClass('error');
			setTimeout(function() {
				email.removeClass('error');
			}, 1500);
		} else {
			data.email = email.val();
		}

		let message = form.find('textarea.message');
		if (email.val() !== '') {
			data.message = message.val();
		}

		if (name.val() === '' || email.val() === '') {
			_this.addClass('error').text('Не все поля заполнены');
			setTimeout(function() {
				_this.removeClass('error').text('Оценить сейчас');
			}, 1500);
		} else {
			form.find('.form-shade').css({ 'z-index': '450' }).animate({
				'opacity': 0.3
			});
			data = JSON.stringify(data);
			yaCounter46056114.reachGoal('application_form', function() {
				console.log('application_form');
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