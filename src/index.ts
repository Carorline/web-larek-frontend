import { EventEmitter } from './components/base/events';
import { ProductCatalog } from './components/models/ProductCatalog';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import './scss/styles.scss';
import { CardCatalog } from './components/views/CardCatalog';
import { CardPreview } from './components/views/CardPreview';
import { CardBasket } from './components/views/CardBasket';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Gallery } from './components/views/Gallery';
import { Header } from './components/views/Header';
import { ProductBasket } from './components/models/ProductBasket';
import { IProduct } from './types';
import { Modal } from './components/views/Modal';
import { Basket } from './components/views/Basket';



const events = new EventEmitter();
const productCatalog = new ProductCatalog(events);
const productBasket = new ProductBasket(events);

const api = new WebLarekApi(CDN_URL, API_URL);

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;

const gallery = new Gallery(document.body, events);
const header = new Header(document.body, events);
const modal = new Modal(ensureElement('#modal-container') as HTMLElement, events);
const basket = new Basket(cloneTemplate(basketTemplate),events);

api
  .getProductList()
  .then(productCatalog.setProducts.bind(productCatalog))
  .catch(console.error)


events.on('products:changed', () => {
  const cardCatalog = productCatalog.getProducts().map(item => new CardCatalog(cloneTemplate(cardCatalogTemplate),{
			onClick: () => events.emit('card:select', item),
		}).render(item))
  gallery.render({
    catalog:cardCatalog
  })

  header.render({
    counter: productBasket.getCount()
  })
})

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
			modal.close()
		},
	})

	cardPreview.button = productBasket.hasProduct(item.id) ? 'Удалить из корзины' : 'В корзину';
	modal.render({ 
    content: cardPreview.render(item) 
  });
});

events.on('basket:change', () => {
	header.counter = productBasket.getCount();
	const cardBasket = productBasket.getProducts().map(({id}: {id: string}) => { 
		const item = productCatalog.getProducts().find((item) => item.id === id);
		const card = new CardBasket(cloneTemplate(cardBasketTemplate),    
    {
		onClick: () => productBasket.removeProduct(item.id),
  })
		return card.render(item);
	});

	modal.render({
		content:basket.render({
							items: cardBasket,
							total: productBasket.getTotal()
						})
	})
});

events.on('basket:open', () => {
	events.emit('basket:change');
	modal.render({
		content: basket.render(),
	});
});