interface StorefrontResponse<TEntity> {
  products: {
    edges: {
      cursor: string
      node: TEntity
    }[]
  }
}

