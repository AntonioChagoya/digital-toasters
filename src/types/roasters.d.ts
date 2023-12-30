
interface IRoasterAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface IRoaster extends IModel<IRoasterAttributes> { }
