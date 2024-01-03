/* 
 * This file is for global type definitions.
*/

interface IModel<T> {
  id: number;
  attributes: T;
}
interface IRelationModel<T> {
  data: T;
}

/* 
 * Strapi default attributes type definitions
 * - Related
 * - CreatedBy
 * - UpdatedBy
 * - Localizations
 * 
 */
type Related = {
  id: number,
}
type CreatedBy = {
  id: number,
}
type UpdatedBy = {
  id: number,
}
type Localizations = {
  id: number,
}


/* 
 * Composed entities interface definitions
 */
interface IUpdatedBy extends IRelationModel<IModel<UpdatedBy>> { }
interface ICreatedBy extends IRelationModel<IModel<CreatedBy>> { }
interface IRelated extends IRelationModel<IModel<Related>[]> { }
interface ILocalizations extends IRelationModel<IModel<Localizations>[]> { }