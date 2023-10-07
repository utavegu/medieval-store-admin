export interface IProduct {
  _id: string;
  productName: string;
  description?: string;
  price: number;
  discount?: number;
  // category: ProductCategory;
  // type: ProductType;
  // subtype?: ProductSubtype;
  photos?: [string];
  // productsAvailability?: [ProductsAvailability];
  createdAt: Date;
  updatedAt?: Date;
}
