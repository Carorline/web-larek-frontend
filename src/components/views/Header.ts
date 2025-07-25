import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IHeader {
  counter: number;
}

export class Header extends Component<IHeader> {
	protected counterElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.counterElement = ensureElement('.header__basket-counter', this.container);
		this.basketButton = ensureElement('.header__basket', this.container) as HTMLButtonElement;

		this.basketButton.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	/**
	 * Установить счетчик товаров в корзине
	 */
	set counter(value: number) {
		this.setText(this.counterElement, String(value));
	}

}