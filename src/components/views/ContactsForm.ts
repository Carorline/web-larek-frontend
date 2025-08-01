import { Form } from "./common/Form";
import { TContactsForm } from "../../types";
import { IEvents } from '../base/events'; 

export class ContactsForm extends Form<TContactsForm> {
    protected emailElement: HTMLInputElement;
    protected phoneElement: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

        this.emailElement = container.elements.namedItem('email') as HTMLInputElement;
        this.phoneElement = container.elements.namedItem('phone') as HTMLInputElement
    }

    set phone(value: string) {
        this.phoneElement.value = value;
    }

    set email(value: string) {
        this.emailElement.value = value;
    }
}     