import { ensureElement } from '../../utils/utils';
import { IProduct } from '../../types';
import { Card, ICardActions } from './Card';

export type TCardBasket = Pick<IProduct, 'title' | 'price'>;

export class CardBasket extends Card<TCardBasket> {
  protected buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
    super(container);

    this.buttonElement = ensureElement('.card__button', this.container) as HTMLButtonElement;
    
    if (actions?.onClick) {
      if (this.buttonElement) {
        this.buttonElement.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  }

  set button(value: string) {
    this.setText(this.buttonElement, value);
  }
}
