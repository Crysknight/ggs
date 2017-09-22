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
			data.name = name;
		}

		let email = form.find('input.email');
		if (email.val() === '') {
			email.addClass('error');
			setTimeout(function() {
				email.removeClass('error');
			}, 1500);
		} else {
			data.email = email;
		}

		let message = form.find('textarea.message');
		if (email.val() !== '') {
			data.message = message;
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