interface IProductType {
  _id: string;
  parentCategory: string;
  productTypeName: string;
}

interface IProductSubtype {
  _id: string;
  parentType: string;
  productSubtypeName: string;
}

export { IProductType, IProductSubtype };
