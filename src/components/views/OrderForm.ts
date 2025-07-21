import { Form } from './Form';
import { IUser, paymentMethod } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export type TOrderForm = Pick<IUser, 'payment'| 'address'>;

export class OrderForm extends Form<TOrderForm> {
	protected paymentCardElement: HTMLButtonElement;
	protected paymentCashElement: HTMLButtonElement;
	protected addressElement: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.paymentCardElement = ensureElement<HTMLButtonElement>('.button_alt[name=card]', this.container);
		this.paymentCashElement = ensureElement<HTMLButtonElement>('.button_alt[name=cash]', this.container);
		this.addressElement = ensureElement<HTMLInputElement>('.form__input[name=address]', this.container);

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
}