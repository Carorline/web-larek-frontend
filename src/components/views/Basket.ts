
import { Component } from "../base/Component";
import { createElement, ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
    // selected: string[];
}

export class Basket extends Component<IBasketView> {
    protected listElement: HTMLElement;
    protected totalElement: HTMLElement;
    protected buttonElement: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
        this.totalElement = this.container.querySelector('.basket__total');
        this.buttonElement = this.container.querySelector('.basket__action');

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
            this.listElement.replaceChildren(createElement<HTMLParagraphElement>('p', {
                textContent: 'Корзина пуста'
            }));
        }
    }

    // set selected(items: string[]) {
    //     if (items.length) {
    //         this.setDisabled(this.buttonElement, false);
    //     } else {
    //         this.setDisabled(this.buttonElement, true);
    //     }
    // }

    set total(total: number) {
		this.setText(this.totalElement, `${total} синапсов`);
    }
}
