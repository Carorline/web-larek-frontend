import { IEvents } from '../base/events';
import { IProduct, IProductBasketModel, TProductBasket } from '../../types';

export class ProductBasket implements IProductBasketModel {
  protected products: IProduct[] = [];
  protected total: number

  constructor( protected events: IEvents) {}

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
    this.products = [...this.products];
    this.events.emit('basket:change', this.getProducts());
  }

  removeProduct(id: string): void {
    this.products = this.products.filter( product => id !== product.id)
    this.events.emit('basket:change', this.getProducts());
  }

  clearBasket(): void {
    this.products = [];
    this.events.emit('basket:change');
  }

  getTotal(): number {
    let summ = 0;
		this.products.forEach((item) => {
      console.log(item)
			summ = summ + item.price;
      console.log(summ)
		});
    console.log(summ)
    return summ;
  }

  getCount(): number {
    return this.products.length;
  }

  hasProduct(id: string): boolean {
    return this.products.some(product => product.id === id);

  }
}