import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { IGallery } from '../../types'

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this.catalogElement = ensureElement('.gallery', this.container) as HTMLElement;

  }

  /**
	 * Установить каталог товаров
	 */
	set catalog(items: HTMLElement[]) {
		this.catalogElement.replaceChildren(...items);
	}

}