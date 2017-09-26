import identPrice from '../utils/ident-price';


class Scale {

	constructor(
		name,
		scale, 
		runner, 
		min, 
		max, 
		step, 
		current,
		onValueChanged
	) {

		let self = this;
		this.name = name;
		this.scale = scale;
		this.scaleWidth = scale.width();
		this.scaleOffset = scale.offset().left;
		window.addEventListener('resize', function() {
			self.scaleOffset = scale.offset().left;
		});
		this.runner = runner;
		this.min = min;
		this.max = max;
		this.step = step;
		this.gap = max - min;
		this.pxStep = +(this.scaleWidth / this.gap).toFixed(1);
		this.currentValue = current;
		this.currentValueChanged = $.Event(`CURRENT_VALUE_CHANGED_${this.name.toUpperCase()}`);
		$(document).on(this.currentValueChanged.type, () => onValueChanged(this));
		this.runnerActive = false;

		window.addEventListener('mousemove', function(event) {
			let movingInBounds = false;
			let positionOnScale = event.pageX - self.scaleOffset;
			if (positionOnScale > 0 && positionOnScale <= self.scaleWidth) movingInBounds = true;
			if (self.runnerActive && movingInBounds) {
				self.setPosition(positionOnScale);
			} else if (self.runnerActive && positionOnScale <= 0) {
				self.setPosition('min');
			} else if (self.runnerActive && positionOnScale > self.scaleWidth) {
				self.setPosition('max');
			}
		});
		window.addEventListener('touchmove', function(event) {
			let movingInBounds = false;
			let positionOnScale = event.touches[0].pageX - self.scaleOffset;
			if (positionOnScale > 0 && positionOnScale <= self.scaleWidth) movingInBounds = true;
			if (self.runnerActive && movingInBounds) {
				self.setPosition(positionOnScale);
			} else if (self.runnerActive && positionOnScale <= 0) {
				self.setPosition('min');
			} else if (self.runnerActive && positionOnScale > self.scaleWidth) {
				self.setPosition('max');
			}
		});
		this.scale.on('mousedown', function(event) {
			self.runnerActive = true;
			let positionOnScale = event.pageX - self.scaleOffset;
			if (positionOnScale <= 0) {
				self.setPosition('min');
			} else {
				self.setPosition(positionOnScale);
			}
		});
		this.scale.on('touchstart', function(event) {
			self.runnerActive = true;
			let positionOnScale = event.touches[0].pageX - self.scaleOffset;
			if (positionOnScale <= 0) {
				self.setPosition('min');
			} else {
				self.setPosition(positionOnScale);
			}
		});
		window.addEventListener('mouseup', function() {
			self.runnerActive = false;
		});
		window.addEventListener('touchend', function() {
			self.runnerActive = false;
		});

		if (this.currentValue > 0) {
			this.runner.css({
				'transform': `translateX(${this.currentValue * this.pxStep}px)`
			});
			$(document).trigger(this.currentValueChanged);
		}

	}

	setPosition(position) {
		let previousValue = this.currentValue;
		let currentValue;
		if (position === 'min') {
			currentValue = this.min;	
		} else if (position === 'max') {
			currentValue = this.max;
		} else {
			currentValue = Math.ceil(position / this.pxStep);
		}
		this.currentValue = currentValue;
		this.runner.css({
			'transform': `translateX(${this.currentValue * this.pxStep}px)`
		});
		if (this.currentValue !== previousValue) {
			$(document).trigger(this.currentValueChanged);
		}
	}

}

$(document).ready(function() {

	let sumScale = $('.payment-scale.loan-sum');
	let sumScaleValue = sumScale.find('.runner-value');
	let sumScaleObject = new Scale(
		'loan-sum',
		sumScale.find('.scale'),
		sumScale.find('.scale-runner'),
		1,
		100,
		1,
		7,
		(sumScaleObject) => {
			let stepCost = 500;
			let sumToMoney = sumScaleObject.currentValue * stepCost;
			if (sumToMoney < 1000) {
				sumToMoney = sumToMoney + ' тыс. руб.'
			} else {
				sumToMoney = (sumToMoney / 1000).toFixed(1).replace(/\./, ',') + ' млн. руб.';
			}
			sumScaleValue.text(sumToMoney);
		}
	);

	let termScale = $('.payment-scale.loan-term');
	let termScaleValue = termScale.find('.runner-value');
	let termScaleObject = new Scale(
		'loan-term',
		termScale.find('.scale'),
		termScale.find('.scale-runner'),
		1,
		240,
		1,
		3,
		(termScaleObject) => {
			let formsTable = [
				['год', 'года', 'лет'],
				['мес.', 'мес.', 'мес.']
			];
			let termToTime = termScaleObject.currentValue;
			let yearsCount = Math.floor(termToTime / 12);
			let monthsCount = termToTime % 12;
			termToTime = '';
			if (monthsCount > 0) {
				if (monthsCount === 1) {
					monthsCount = `${monthsCount} ${formsTable[1][0]}`;
				} else if (monthsCount > 1 && monthsCount < 5) {
					monthsCount = `${monthsCount} ${formsTable[1][1]}`;
				} else if (monthsCount >= 5) {
					monthsCount = `${monthsCount} ${formsTable[1][2]}`;
				}
				termToTime = monthsCount;
			}
			if (yearsCount > 0) {
				if (yearsCount === 1) {
					yearsCount = `${yearsCount} ${formsTable[0][0]}`;
				} else if (yearsCount > 1 && yearsCount < 5) {
					yearsCount = `${yearsCount} ${formsTable[0][1]}`;
				} else if (yearsCount >= 5) {
					yearsCount = `${yearsCount} ${formsTable[0][2]}`;
				}
				termToTime = yearsCount + ' ' + termToTime;
			}
			termScaleValue.text(termToTime);
		}
	);

	let calculateMonthlyPayment = () => {
		let annualRate = 0.1075;
		let monthlyRate = +(annualRate / 12).toFixed(3);
		let loanToMoney = sumScaleObject.currentValue * 500000
		let indebtednessSum = loanToMoney + termScaleObject.currentValue * loanToMoney * monthlyRate;
		let monthlyPayment = Math.round(indebtednessSum / termScaleObject.currentValue);
		$('.monthly-payment-sum .value').text(identPrice(monthlyPayment));
	};

	$(document).on(sumScaleObject.currentValueChanged.type + ' ' + termScaleObject.currentValueChanged.type, calculateMonthlyPayment);

	setTimeout(calculateMonthlyPayment, 2000);



	$('.get-loan').click(function() {
		$('.ggs-get-loan').css({ 'z-index': 500 }).animate({
			'opacity': 1
		}, 150);
	});

});