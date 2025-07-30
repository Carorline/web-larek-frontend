import { EventEmitter } from './components/base/events';
import { ProductCatalog } from './components/models/ProductCatalog';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import './scss/styles.scss';
import { CardCatalog } from './components/views/CardCatalog';
import { CardPreview } from './components/views/CardPreview';
import { CardBasket } from './components/views/CardBasket';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Gallery } from './components/views/Gallery';
import { Header } from './components/views/Header';
import { ProductBasket } from './components/models/ProductBasket';
import { IProduct, IUser, TOrderForm, TContactsForm } from './types';
import { Modal} from './components/views/common/Modal';
import { Basket } from './components/views/Basket';
import { OrderForm } from './components/views/OrderForm';
import { User } from './components/models/User';
import { ContactsForm } from './components/views/ContactsForm';
import { Success } from './components/views/Success';

const events = new EventEmitter();
const productCatalog = new ProductCatalog(events);
const productBasket = new ProductBasket(events);
const user = new User(events);

const api = new WebLarekApi(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement(
	'#card-preview'
) as HTMLTemplateElement;
const cardBasketTemplate = ensureElement(
	'#card-basket'
) as HTMLTemplateElement;
const basketTemplate = ensureElement('#basket') as HTMLTemplateElement;
const orderFormTemplate = ensureElement(
	'#order'
) as HTMLTemplateElement;
const contactsFormTemplate = ensureElement(
	'#contacts'
) as HTMLTemplateElement;
const successTemplate = ensureElement(
	'#success'
) as HTMLTemplateElement;

const pageWrapper = ensureElement('.page__wrapper') as HTMLElement;
const gallery = new Gallery(document.body, events);
const header = new Header(document.body, events);
const modal = new Modal(
	ensureElement('#modal-container') as HTMLElement,
	events
);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactsForm(
	cloneTemplate(contactsFormTemplate),
	events
);
const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

api
	.getProductList()
	.then(productCatalog.setProducts.bind(productCatalog))
	.catch(console.error);

events.on('products:changed', () => {
	const cardCatalog = productCatalog.getProducts().map((item) =>
		new CardCatalog(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		}).render(item)
	);
	gallery.render({
		catalog: cardCatalog,
	});
});

events.on('card:select', (item: IProduct) => {
	productCatalog.setPreview(item);
});

events.on('preview:changed', (item: IProduct) => {
	const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (productBasket.hasProduct(item.id)) {
				productBasket.removeProduct(item.id);
				cardPreview.button = 'В корзину';
			} else {
				productBasket.addProduct(item);
				cardPreview.button = 'Удалить из корзины';
			}
			modal.close();
		},
	});

	cardPreview.button = productBasket.hasProduct(item.id)
		? 'Удалить из корзины'
		: 'В корзину';
	modal.render({
		content: cardPreview.render(item),
	});
});

events.on('modal:open', () => {
    pageWrapper.classList.add('page__wrapper_locked');
});

events.on('modal:close', () => {
    pageWrapper.classList.remove('page__wrapper_locked');
});

events.on('basket:change', () => {
	header.counter = productBasket.getCount();
	const cardBasket = productBasket
		.getProducts()
		.map(({ id }: { id: string }, index: number) => {
			const item = productCatalog.getProducts().find((item) => item.id === id);
			const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
				onClick: () => productBasket.removeProduct(item.id),
			});
			return card.render(item, index + 1);
		});

	modal.render({
		content: basket.render({
			items: cardBasket,
			total: productBasket.getTotal(),
		}),
	});
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

events.on('order:open', () => {
	modal.render({
		content: orderForm.render({
			payment: null,
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('formErrors:change', (errors: Partial<IUser>) => {
	const { payment, address, email, phone } = errors;
	orderForm.valid = !payment && !address;
	orderForm.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');

	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof TOrderForm; value: string }) => {
		user.setData(data.field, data.value);
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof TContactsForm; value: string }) => {
		user.setData(data.field, data.value);
	}
);

events.on('contacts:submit', () => {
	api
		.createOrder({
			payment: user.user.payment,
			address: user.user.address,
			email: user.user.email,
			phone: user.user.phone,
			items: productBasket.getProducts().map((item) => item.id),
			total: productBasket.getTotal(),
		})
		.then((data) => {
			productBasket.clearBasket();
			user.clear();
			modal.render({
				content: success.render(),
			});
			success.total = data.total;
		})
		.catch((err) => {
			console.error(err);
		});
});
