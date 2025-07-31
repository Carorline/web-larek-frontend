import { ensureElement } from '../../utils/utils';
import { categoryProduct, ICardActions, TCardPreview } from '../../types';
import { Card } from './common/Card';

export class CardPreview extends Card implements TCardPreview {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
    super(container);

    this.categoryElement = ensureElement('.card__category', this.container);
    this.imageElement = ensureElement('.card__image', this.container) as HTMLImageElement;
    this.descriptionElement = ensureElement('.card__text', this.container);
    this.buttonElement = ensureElement('.card__button', this.container) as HTMLButtonElement;
    
    if (actions?.onClick) {
      if (this.buttonElement) {
        this.buttonElement.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
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

  set image(value: string) {
		this.setImage(this.imageElement, value, this.title);
	}

  set price(value: string) {
    this.setText(this.priceElement, value ? `${value} синапсов` : 'Не продаётся');
    if (this.buttonElement) {
      this.buttonElement.disabled = !value;
    }
  }

  set description(value: string) {
    this.setText(this.descriptionElement, value);
  }

  set button(value: string) {
    this.setText(this.buttonElement, value);
  }
}
