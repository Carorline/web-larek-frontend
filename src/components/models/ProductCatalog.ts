import { IEvents } from '../base/events';
import { IProduct, IProductCatalogModel } from '../../types';

export class ProductCatalog implements IProductCatalogModel {
  protected products: IProduct[] = [];
  protected preview: string | null = null;

  constructor( protected events: IEvents) {}


  getProducts(): IProduct[] {
    return [...this.products];
  }

  setProducts(products: IProduct[]): void {
    this.products = products;
    this.events.emit('products:changed', this.products);
  }

  getProduct(id: string): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  setPreview(product: IProduct): void {
    this.preview = product.id;
    this.events.emit('preview:changed', product);
  }

  getPreview(): IProduct | null {
    if (this.preview) {
      return this.getProduct(this.preview) || null;
    }
    return null;
  }

}