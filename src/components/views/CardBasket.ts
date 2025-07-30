import { ensureElement } from '../../utils/utils';
import { ICardActions, TCardBasket } from '../../types';
import { Card } from './common/Card';



export class CardBasket extends Card<TCardBasket> {
  protected buttonElement: HTMLButtonElement;
  protected indexElement : HTMLElement;

  constructor(container: HTMLElement, protected actions?: ICardActions) {
    super(container);

    this.buttonElement = ensureElement('.card__button', this.container) as HTMLButtonElement;
    this.indexElement = ensureElement('.basket__item-index', this.container);
    
    if (actions?.onClick) {
      if (this.buttonElement) {
        this.buttonElement.addEventListener('click', actions.onClick);
      } else {
        container.addEventListener('click', actions.onClick);
      }
    }
  };

  set button(value: string) {
    this.setText(this.buttonElement, value);
  };

  render(data?: Partial<TCardBasket>, index?: number): HTMLElement {
    super.render(data);;
    if (this.indexElement) {
      this.indexElement.textContent = index.toString();
      }
        return this.container;
    };
}
