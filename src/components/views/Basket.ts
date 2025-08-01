
import { Component } from "../base/Component";
import { createElement, ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import { IBasketView } from "../../types";

export class Basket extends Component<IBasketView> {
    protected listElement: HTMLElement;
    protected totalElement: HTMLElement;
    protected buttonElement: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this.listElement = ensureElement('.basket__list', this.container);
        this.totalElement = this.container.querySelector('.basket__price');
        this.buttonElement = this.container.querySelector('.basket__button');

        if (this.buttonElement) {
            this.buttonElement.addEventListener('click', () => {
                events.emit('order:open');
            });
        }

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        if (items.length) {
            this.listElement.replaceChildren(...items);
        } else {
            this.listElement.replaceChildren(createElement('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    set selected(items: string[]) {
        if (items.length) {
            this.setDisabled(this.buttonElement, false);
        } else {
            this.setDisabled(this.buttonElement, true);
        }
    }

    set total(total: number) {
		this.setText(this.totalElement, `${total} синапсов`);
    }
}
