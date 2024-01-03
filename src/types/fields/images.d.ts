type Image = {
  name: string,
  alternativeText: string,
  caption: string,
  width: number,
  height: number,
  formats: string,
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: string,
  provider: string,
  provider_metadata: string,
  related: Related,
  folder: Folder,
  folderPath: string,
  createdAt: Date,
  updatedAt: Date,
  createdBy: CreatedBy,
  updatedBy: UpdatedBy,
}

type Folder = {
  id: number,
}

interface IImage extends IModel<Image> { }
interface IFolder extends IRelationModel<IModel<Folder>> { }
