interface IProductAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  description: string | null;
  price: number;
  slug: string;
  roaster: IRelationModel<IRoaster>;
}


interface IProduct extends IModel<IProductAttributes> { }