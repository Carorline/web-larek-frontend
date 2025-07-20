import { ensureElement } from '../../utils/utils';
import { IProduct } from '../../types';
import { Card, ICardActions } from './Card';

export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;

export class CardCatalog extends Card<TCardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  Category: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'другое': 'card__category_other',
		'кнопка': 'card__category_button',
  };

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    } 
  }

	set category(value: string) {
		this.setText(this.categoryElement, value);
		this.toggleClass(this.categoryElement, this.Category[value], true);
  }

  get category(): string {
	return this.categoryElement.textContent || '';
	}

  set image(value: string) {
		this.setImage(this.imageElement, value, this.title);
	}
}