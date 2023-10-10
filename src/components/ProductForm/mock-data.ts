const mockCategories = [
  {
    _id: '650eb721ce1715763b4e3b1e',
    productCategoryName: 'Доспехи',
  },
  {
    _id: '650eb664ec9d666546234105',
    productCategoryName: 'Оружие',
  },
];

const mockTypes = [
  {
    _id: '650ec47a43dbf1c0ed141afc',
    parentCategory: '650eb664ec9d666546234105',
    productTypeName: 'Клинки',
  },
  {
    _id: '650ec49a43dbf1c0ed141aff',
    parentCategory: '650eb664ec9d666546234105',
    productTypeName: 'Луки',
  },
  {
    _id: '650ec4e343dbf1c0ed141b03',
    parentCategory: '650eb721ce1715763b4e3b1e',
    productTypeName: 'Кожаные',
  },
  {
    _id: '650ec4d143dbf1c0ed141b01',
    parentCategory: '650eb721ce1715763b4e3b1e',
    productTypeName: 'Кольчужные',
  },
];

const mockSubTypes = [
  {
    _id: '650fe2641dcc77921dc9e628',
    parentType: '650ec47a43dbf1c0ed141afc',
    productSubtypeName: 'Кинжалы',
  },
  {
    _id: '650fe26b1dcc77921dc9e62a',
    parentType: '650ec47a43dbf1c0ed141afc',
    productSubtypeName: 'Одноручные мечи',
  },
  {
    _id: '650fe2771dcc77921dc9e62c',
    parentType: '650ec47a43dbf1c0ed141afc',
    productSubtypeName: 'Двуручные мечи',
  },
  {
    _id: '650fe2931dcc77921dc9e630',
    parentType: '650ec49a43dbf1c0ed141aff',
    productSubtypeName: 'Композитные луки',
  },
  {
    _id: '650fe2981dcc77921dc9e632',
    parentType: '650ec49a43dbf1c0ed141aff',
    productSubtypeName: 'Длинные луки',
  },
  {
    _id: '650fe29d1dcc77921dc9e634',
    parentType: '650ec49a43dbf1c0ed141aff',
    productSubtypeName: 'Короткие луки',
  },
];

export { mockCategories, mockTypes, mockSubTypes };
