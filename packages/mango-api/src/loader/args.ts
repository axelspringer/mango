export type ListPost = {
  _embed?: boolean
  id?: number
  permalink?: string
}

export type Context = 'view' | 'embed' | 'edit'

export type Order = 'desc' | 'asc'

export type OrderByPosts = 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title'

export type Status = 'publish'

export type OrderByCategories = 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count'

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
  orderby?: OrderByPosts
  slug?: string[]
  status?: Status
  categories?: string[]
  categories_exclude?: string[]
  tags?: string[]
  tags_exclude?: string[]
  order?: Order
}

export type ListCategories = {
  context?: Context
  page?: number
  per_page?: number
  search?: string
  exclude?: number[]
  include?: number[]
  order?: Order
  orderBy?: OrderByCategories
  hide_empty?: boolean
  parent: number
  post: number
  slug: string[]
}
