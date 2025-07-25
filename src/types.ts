// Описание возвожных категорий товара в карточке
export type categoryProduct =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Интерфейс для карточки товара
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: categoryProduct;
	price: number | null;
}

// Описание возможных способов оплаты
export type paymentMethod = 'card' | 'cash' | '';

// Интерфейс для информации о покупателе
export interface IUser {
	payment: paymentMethod;
	address: string;
	email: string;
	phone: string;
}

// Интерфейс для корзины товаров
// Содержит только необходимые поля для отображения в корзине
export type TProductBasket = Pick<IProduct, 'id' | 'title' | 'price'>;

// Интерфейс для заказа
// Содержит информацию о заказе и список товаров
export interface IOrder extends IUser {
	items: string[];
	total: number;
}

// Тип ошибок при заполнении формы заказа
export type TFormErrors = Partial<Record<keyof IOrder, string>>;

// Интерфейс для результата оформления заказа
// Содержит только идентификатор заказа
export interface IOrderResult {
	id: string;
	total: number;
}

// Интерфейс для списка карточек товаров, полученный через API
export interface IProductList {
	total: number;
	items: IProduct[];
}

// Интерфейс для каталога карточек товаров
export interface IProductCatalogModel {
	getProducts(): IProduct[]; //Список товаров
	setProducts(products: IProduct[]): void; // Сохранить массив товаров
	getProduct(productId: string): IProduct | undefined; // Получить выбранную карточку
	setPreview(product: IProduct): void; // Сохранить выбранную карточку
	getPreview(): IProduct | null; // Объект товара для превью
}

// Интерфейс для управления корзиной товаров
export interface IProductBasketModel {
	getProducts(): TProductBasket[]; // Список товаров
	addProduct(product: IProduct): void; // Добавить товар
	removeProduct(product: IProduct): void; // Удалить товар
	clearBasket(): void; // Очистить корзину
	getTotal(): number; // Сумма стоимости товаров
	getCount(): number; // Количество товаров
	hasProduct(productId: string): boolean; // Наличие товара
}

// Интерфейс для обработки данных пользователя
export interface IUserModel {
	user: IUser;
	formErrors:TFormErrors
	// getUserData(): IOrder; // Возвращает объект для API
	setData(data: keyof IUser, value: string | paymentMethod): void; // Обновляет любое поле заказа
	validationData(data: Record<keyof IUser, string>): void; // Проводит валидацию всех полей
	clear(): void; //Очистка данных заказа
}

// Интерфейс для API карточек товаров
export interface IProductApi {
	getProductList: () => Promise<IProduct[]>;
	getProduct: (id: string) => Promise<IProduct>;
	createOrder: (order: IOrder) => Promise<IOrderResult>;
}

// Интерфейс для базового UI-компонента
export interface IComponent<T> {
	render(data?: T): HTMLElement;
}

// Шапка страницы
export interface IHeader {
	counter: number;
}

// Каталог товаров
export interface IGallery {
	catalog: HTMLElement[];
}

// Интерфейс для модального окна
export interface IModalData {
	content: HTMLElement;
}

// Тип для карточки товара
export type TCard = Pick<IProduct, 'id' | 'title' | 'price'> &
	Partial<Pick<IProduct, 'category' | 'description' | 'image'>> & {
		button?: string;
	};

// Тип для карточки товара в каталоге
export type TCardCatalog = Pick<IProduct, 'image' | 'category'>;

// Тип для карточки товара в модальном окне
export type TCardPreview = Pick<
	IProduct,
	'image' | 'category' | 'description'
> & {
	button: string;
};

// Тип для карточки товара в корзине
export type TCardBasket = Pick<IProduct, 'title' | 'price'>;

// Интерфейс для любой HTML формы
export interface IFormState {
	valid: boolean;
	errors: string[];
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
	'basket:changed': TProductBasket[];
	'preview:changed': IProduct;
	'order:open': void;
	'formErrors:change': TFormErrors;
	'modal:open': void;
	'modal:close': void;
}
