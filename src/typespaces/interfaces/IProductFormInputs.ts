// TODO: вообще в целом сверься с бэковой валидацией и реализуй такую же
export interface IProductFormInputs {
  productName: string;
  description?: string;
  price: string; // number; или на сервере "стринг-намбер"? TODO
  discount?: string; // number; или на сервере "стринг-намбер"? TODO
  category: string | [string]; // ProductCategory;
  type: string | [string]; // ProductType;
  subtype?: string | [string]; // ProductSubtype;
  photos?: [string];
}
