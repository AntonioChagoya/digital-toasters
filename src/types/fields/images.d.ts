interface IFormatModel {
  small: Format,
  medium: Format,
  large: Format,
  thumbnail: Format,
}

type Image = {
  name: string,
  alternativeText: string,
  caption: string,
  width: number,
  height: number,
  formats: IFormatModel,
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

type Format = {
  name: string,
  hash: string,
  ext: string,
  mime: string,
  width: number,
  height: number,
  size: number,
  path: string,
  url: string,
}
type Folder = {
  id: number,
}

interface IImage extends IModel<Image> { }
interface IFolder extends IRelationModel<IModel<Folder>> { }
