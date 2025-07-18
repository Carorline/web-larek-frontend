import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { categoryProduct } from '../../types';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
  description?: string;
  image?:string;
  title:string;
  category?: categoryProduct;
  price:number | null;
}

export class Card<T> extends Component<ICard<T>> {
  protected descriptionElement?: HTMLElement;
  protected imageElement?: HTMLImageElement;
  protected titleElement: HTMLElement;
  protected categoryElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected buttonElement?: HTMLButtonElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
		super(container);

		this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
		this.imageElement = container.querySelector('.card__image');
		this.priceElement = ensureElement<HTMLElement>('.card_price', this.container);
		this.categoryElement = container.querySelector('.card__category');
		this.descriptionElement = container.querySelector('.card__text');
		this.buttonElement = container.querySelector('.card__button');
    
  if (actions?.onClick) {
			if (this.buttonElement) {
				this.buttonElement.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.titleElement.textContent = value;
	}

	get title(): string {
		return this.titleElement.textContent || '';
	}

	set price(value: string) {
		this.priceElement.textContent = value ? `${value} синапсов` : 'Не продаётся';
		if (this.buttonElement) {
			this.buttonElement.disabled = !value;
		}
	}

	get price(): string {
		return this.priceElement.textContent || '';
	}

	set category(value: categoryProduct) {
		this.setText(this.categoryElement, value);
		this.toggleClass(
			this.categoryElement,
			'card__category_soft',
			value === 'софт-скил'
		);
		this.toggleClass(
			this.categoryElement,
			'card__category_other',
			value === 'другое'
		);
		this.toggleClass(
			this.categoryElement,
			'card__category_additional',
			value === 'дополнительное'
		);
		this.toggleClass(
			this.categoryElement,
			'card__category_button',
			value === 'кнопка'
		);
		this.toggleClass(
			this.categoryElement,
			'card__category_hard',
			value === 'хард-скил'
		);
	}

	get category(): string {
		return this.categoryElement.textContent || '';
	}

	set image(src: string) {
		this.setImage(this.imageElement, src, this.title);
	}

	set description(value: string) {
		this.descriptionElement.textContent = value;
	}

	set button(value: string) {
		this.buttonElement.textContent = value;
	}
}
