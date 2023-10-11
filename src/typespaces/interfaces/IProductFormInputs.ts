// TODO: вообще в целом сверься с бэковой валидацией и реализуй такую же
export interface IProductFormInputs {
  productName: string;
  description?: string;
  price: string; // number; или на сервере "стринг-намбер"? TODO
  discount?: string; // number; или на сервере "стринг-намбер"? TODO
  category: string; // ProductCategory;
  type: string; // ProductType;
  subtype?: string; // ProductSubtype;
  photos?: [string];
}
