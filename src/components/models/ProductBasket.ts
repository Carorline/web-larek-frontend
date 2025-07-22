import { IEvents } from '../base/events';
import { IProduct, IProductBasketModel, TProductBasket } from '../../types';

export class ProductBasket implements IProductBasketModel {
  protected products: IProduct[] = [];
  protected events: IEvents;

  constructor( events: IEvents) {}

  getProducts(): TProductBasket[] {
    return this.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price
    }));
  }

  addProduct(product: IProduct): void {
    if(product.price === null){
      return;
    }

    this.products.push(product);
    this.events.emit('basket:changed', this.getProducts());
  }

  removeProduct(product: IProduct): void {
    this.products = this.products.filter( id => String(id) !== product.id)
    this.events.emit('basket:changed', this.getProducts());
  }

  clearBasket(): void {
    this.products = [];
    this.events.emit('basket:changed', this.getProducts());
  }

  getTotal(): number {
    let summ = 0;
		this.products.forEach((item) => {
			summ = summ + item.price;
		});

		return summ;
  }

  getCount(): number {
    return this.products.length;
  }

  hasProduct(productId: string): boolean {
    return this.products.some(product => product.id === productId);

  }
}