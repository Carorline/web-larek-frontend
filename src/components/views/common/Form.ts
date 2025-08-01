import { Component } from "../../base/Component";
import { IEvents } from "../../base/events";
import { ensureElement } from "../../../utils/utils";
import { IFormState } from "../../../types";


export class Form<T> extends Component<IFormState> {
    protected submitElement: HTMLButtonElement;
    protected errorsElement: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this.submitElement = ensureElement('button[type=submit]', this.container) as HTMLButtonElement;
        this.errorsElement = ensureElement('.form__errors', this.container);

        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const field = target.name as keyof T;
            const value = target.value;
            this.onInputChange(field, value);
        });

        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.name}:submit`);
        });
    }

    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    set valid(value: boolean) {
        this.submitElement.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this.errorsElement, value);
    }

    render(state: Partial<T> & IFormState) {
        const {valid, errors, ...inputs} = state;
        super.render({valid, errors});
        Object.assign(this, inputs);
        return this.container;

    }
}