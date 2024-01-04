type Product = {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  description: string;
  price: number;
  sale_price: number;
  stock: number;
  roaster?: IRoaster;
  createdBy: ICreatedBy,
  updatedBy: IUpdatedBy,
  localizations?: ILocalizations,
  cata?: ICataAttr,
  variations?: IRelationModel<IVariant[]>;
  attributes?: IAttribute[];
  image: IRelationModel<IImage>;
  gallery: IRelationModel<IImage[]>;
}

type Variant = {
  name: string;
  price: number;
  description: string;
  sale_price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  image: IRelationModel<IImage>;
  gallery: IRelationModel<IImage[]>;
  variantInfo: object[];
}

type Attribute = {
  name: string;
  options: {
    price: number | null,
    value: string,
    description: string
  }[]
}

interface IVariant extends IModel<Variant> { }
interface IProduct extends IModel<Product> { }
