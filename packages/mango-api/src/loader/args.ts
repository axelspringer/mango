export type PostArguments = {
  _embed?: boolean
  id?: number
  permalink?: string
}

export type Context = 'view' | 'embed' | 'edit'

export type Order = 'desc' | 'asc'

export type OrderBy = 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title'

export type Status = 'publish'

export type ListPosts = {
  context?: Context
  page?: number
  per_page?: number
  search?: string
  after?: Date
  before?: Date
  exclude?: number[]
  include?: number[]
  offset?: number
  orderby?: OrderBy
  slug?: string[]
  status?: Status
  categories?: string[]
  categories_exclude?: string[]
  tags?: string[]
  tags_exclude?: string[]
  order?: Order
}
