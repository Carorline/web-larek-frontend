import { Form } from './common/Form';
import {  paymentMethod, TOrderForm } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class OrderForm extends Form<TOrderForm> {
	protected paymentCardElement: HTMLButtonElement;
	protected paymentCashElement: HTMLButtonElement;
	protected addressElement: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.paymentCardElement = ensureElement('.button_alt[name=card]', this.container) as HTMLButtonElement;
		this.paymentCashElement = ensureElement('.button_alt[name=cash]', this.container) as HTMLButtonElement;
		this.addressElement = ensureElement('.form__input[name=address]', this.container) as HTMLInputElement;

		this.paymentCardElement.addEventListener('click', () => {
			this.payment = 'card';
			this.onInputChange('payment', 'card');
		});
		this.paymentCashElement.addEventListener('click', () => {
			this.payment = 'cash';
			this.onInputChange('payment', 'cash');
		});
	}

	set payment(value: paymentMethod) {
		this.toggleClass(this.paymentCardElement, 'button_alt-active', value === 'card');
		this.toggleClass(this.paymentCashElement, 'button_alt-active', value === 'cash');
	}

	set address(value: string) {
		this.addressElement.value = value;
	}

	// render(state: Partial<IUser> & IFormState) {
	// 	// вызываем базовый рендер для установки адреса/валидности/ошибок
	// 	super.render(state);

	// 	// state.payment может быть undefined (при первом рендере)
	// 	if (state.payment === null){
	// 	return this.container;
	// 	}
	// }
}