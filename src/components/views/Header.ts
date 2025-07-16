import { Component } from '../base/Component';
import { IHeader } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { settings } from '../../utils/constants';

export class Header extends Component<IHeader> {
	protected _counter: HTMLElement;
  protected basketButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');

		this.basketButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	/**
	 * Установить счетчик товаров в корзине
	 */
	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

}