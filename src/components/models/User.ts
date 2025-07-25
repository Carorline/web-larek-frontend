import { IEvents } from '../base/events';
import { IUser, IUserModel, IOrder, paymentMethod } from '../../types';

export class User implements IUserModel {
  user:IUser = {
    payment: null,
		address: '',
		email: '',
		phone: '',
	};
  formErrors: Partial<Record<keyof IOrder, string>> = {};

  constructor( protected events: IEvents) {}
  
  // getUserData(): IOrder {

  // };

  setData(data: keyof IUser, value: string | paymentMethod): void {
    if (data === 'payment') {
			this.user[data] = value as paymentMethod;
		} else {
			this.user[data] = value as string;
		}
  };
  
  validationData(data: Record<keyof IUser, string>):void {
    const errors: typeof this.formErrors = {};
		if (!this.user.payment) {
			errors.payment = 'Необходимо выбрать способ оплаты';
		}
		if (!this.user.address) {
			errors.address = 'Необходимо указать адрес доставки';
		}

    if (!this.user.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.user.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		this.formErrors = errors;
		this.events.emit('FormErrors:change', this.formErrors);
		
    // Определяем валидность частей формы
		const orderValid = !errors.payment && !errors.address;
		const contactsValid = !errors.email && !errors.phone;

		if (orderValid) {
			this.events.emit('order:ready', this.user);
		}
		if (contactsValid) {
			this.events.emit('contacts:ready', this.user);
		}
	};

  clear(): void {
    this.user = {
			payment: null,
			address: '',
			email: '',
			phone: '',
		};
		this.formErrors = {};
		this.events.emit('user:clear', this.user);
	}
}