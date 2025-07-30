import { IEvents } from '../base/events';
import { IUser, IUserModel, IOrder, paymentMethod } from '../../types';

export class User implements IUserModel {
  user:IUser = {
    payment: null,
		address: '',
		email: '',
		phone: '',
	};

  constructor( protected events: IEvents) {}

  setData(data: keyof IUser, value: string | paymentMethod): void {
    if (data === 'payment') {
			this.user[data] = value as paymentMethod;
		} else {
			this.user[data] = value as string;
		} 

		// Определяем валидность частей формы
		 if (this.validationData()) {
            this.events.emit('order:ready', this.user);
        }
  };
  
  validationData():boolean {
    const errors: Partial<Record<keyof IOrder, string>> = {};
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

		this.events.emit('formErrors:change', errors);
		return Object.keys(errors).length === 0;
	};

  clear(): void {
    this.user = {
			payment: null,
			address: '',
			email: '',
			phone: '',
		};
	}
}