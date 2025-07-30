import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import { ISuccess, ISuccessActions } from "../../types";

export class Success extends Component<ISuccess> {
    protected closeElement: HTMLButtonElement;
    protected totalElement: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this.totalElement = ensureElement('.order-success__description', this.container);
        this.closeElement = ensureElement('.order-success__close', this.container) as HTMLButtonElement;

        if (actions?.onClick) {
            this.closeElement.addEventListener('click', actions.onClick);
        }
    }
	 // Устанавливаем общую стоимость заказа
	set total(value: number) {
		this.setText(this.totalElement, `Списано ${value} синапсов`);
	}
}
