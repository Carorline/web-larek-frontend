import { ensureElement } from '../../utils/utils';
import { IProduct } from '../../types';
import { Card, ICardActions } from './Card';

const categoryMap = {
  'софт-скил': 'Soft Skills',
  'другое': 'Other',
  'дополнительное': 'Additional',
  'кнопка': 'Button',
  'хард-скил': 'Hard Skills'
} as const;

type CategoryKey = keyof typeof categoryMap;
export type TCardPreview = Pick<IProduct, 'image' | 'category' | 'description'>;

export class CardPreview extends Card<TCardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  Category: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'другое': 'card__category_other',
		'кнопка': 'card__category_button',
  };

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
