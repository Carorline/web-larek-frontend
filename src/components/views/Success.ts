import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    protected closeElement: HTMLButtonElement;
    protected totalElement: HTMLElement;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.closeElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (actions?.onClick) {
            this.closeElement.addEventListener('click', actions.onClick);
        }
    }
	 // Устанавливаем общую стоимость заказа
	set total(value: number) {
		this.totalElement.textContent = `Списано ${value} синапсов`;
	}
}
