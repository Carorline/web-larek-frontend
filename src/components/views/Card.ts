import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
  title:string;
  price:number | null;
}

export class Card<T> extends Component<ICard<T>> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
		super(container);

		this.titleElement = ensureElement('.card__title', this.container);
		this.priceElement = ensureElement('.card_price', this.container);
    
  	if (actions?.onClick) {
			this.container.addEventListener('click', actions.onClick);
		}
		
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
	}

	get title(): string {
		return this.titleElement.textContent || '';
	}

	set price(value: string) {
		this.setText(this.priceElement, value ? `${value} синапсов` : 'Не продаётся');
	}

	get price(): string {
		return this.priceElement.textContent || '';
	}
}
