import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';
import { ICardActions, ICard } from '../../../types';

export class Card extends Component<ICard> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
		super(container);

		this.titleElement = ensureElement('.card__title', this.container);
		this.priceElement = ensureElement('.card__price', this.container);
    
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
