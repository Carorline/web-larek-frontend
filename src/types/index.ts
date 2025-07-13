// Описание возвожных категорий товара в карточке
export type categoryProduct = 
'софт-скил' | 
'другое' | 
'дополнительное' |
'кнопка' |
'хард-скил';

// Интерфейс для карточки товара
export interface IProduct {
  id: string;
  description?: string;
  image:string;
  title:string;
  category: categoryProduct;
  price:number;
}

// Интерфейс для списка карточек товаров
export interface IProductList {
	total: number;
	items: IProduct[];
}

// Интерфейс для каталога карточек товаров
export interface IProductsData {
  products: IProduct[];
  preview: string | null;
  getProduct(productId:string):IProduct | undefined; 
  setProducts(products: IProduct[]):void;
}

// Интерфейс для корзины товаров
// Содержит только необходимые поля для отображения в корзине
export type IProductBasket = Pick<IProduct,'id' | 'title'| 'price'>;

// Интерфейс для управления корзиной товаров
export interface IProductBasketData {
  getProducts(): IProductBasket[];
  addProduct(product: IProductBasket): void;
  removeProduct(productId: string): void;
  clearBasket():void;
  getTotalPrice(): number;
  getCount(): number;
}

// Описание возможных способов оплаты
export type paymentMethod = 'online' | 'cash';

// Интерфейс для информации о заказе
export interface IOrderInfo {
  payment: paymentMethod;
  address: string;
  email: string;
  phone: string;
}

// Интерфейс для оформления заказа (шаг 1)
// Содержит только необходимые поля для отображения
export type IOrderStep1 = Pick<IOrderInfo, 'payment'| 'address'>;

// Интерфейс для оформления заказа (шаг 2)
// Содержит только необходимые поля для отображения
export type IOrderStep2 = Pick<IOrderInfo, 'email'| 'phone'>;

// Интерфейс для заказа
// Содержит информацию о заказе и список товаров
export interface IOrder extends IOrderInfo  {
  items: string[];
  total:number;
}

// Тип ошибок при заполнении формы заказа
export type IFormErrors = Partial<Record<keyof IOrder, string>>;

// Интерфейс для результата оформления заказа
// Содержит только идентификатор заказа
export interface IOrderResult {
  id: string;
  total:number
}

// Интерфейс для оформления заказа
export interface IOrderData {
  order: IOrder;
  formErrors: IFormErrors;
  setFieldStep1(field:IOrderStep1): void;
  setFieldStep2(field:IOrderStep2): void;
  validationOrderStep1(field:Record<keyof IOrderStep1, string>):boolean;
  validationOrderStep2(field:Record<keyof IOrderStep2, string>):boolean;
  clearOrder():void;
}

// Интерфейс для API карточек товаров
export interface IProductApi{
	getProductList: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	createOrder: (order: IOrder) => Promise<IOrderResult[]>;
}

// Интерфейс для базового UI-компонента
export interface IComponent<T> {
	render(data?: T): HTMLElement;
}

// Интерфейс для модального окна
export interface IModalData {
    content: HTMLElement;
}

export interface IModal {
	content: HTMLElement;
	open(): void;
	close(): void;
	render(data: IModalData): HTMLElement;
}
 
// Интерфейс для любой HTML формы
export interface IFormState {
    valid: boolean;
    errors: string[];
}

// Главная страница
export interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

// Карточка товара
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// Данные, требуемые карточке
export type ICard = Pick<IProduct, 'id' | 'title' | 'price'> &
	Partial<Pick<IProduct, 'image' | 'category' | 'description'>> & {
		button?: string;
	};

// Карточка товара в корзине
export interface ICardBasketActions {
	onClick: (event: MouseEvent) => void;
}

// Структура данных корзины
export interface IBasketView {
	items: HTMLElement[];
	total: number;
}

// Окно «Заказ оформлен»
export interface ISuccess {
	total: number;
}

export interface ISuccessActions {
	onClick: () => void;
}

// События, которые могут гинерироваться в системе
export interface IAppEvents {
	'items:changed': IProduct[];
	'basket:open': void;
	'basket:changed': IProductBasket[];
	'preview:changed': IProduct;
	'order:open': void;
	'formErrors:change': IFormErrors;
	'modal:open': void;
	'modal:close': void;
}