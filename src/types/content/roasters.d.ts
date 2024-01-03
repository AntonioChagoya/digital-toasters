type Roaster = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: ICreatedBy,
  updatedBy: IUpdatedBy,
}

interface IRoaster extends IRelationModel<IModel<Roaster>> { }
