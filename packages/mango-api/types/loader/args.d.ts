export declare type ListPost = {
    _embed?: boolean;
    id?: number;
    permalink?: string;
};
export declare type Context = 'view' | 'embed' | 'edit';
export declare type Order = 'desc' | 'asc';
export declare type OrderByPosts = 'author' | 'date' | 'id' | 'include' | 'modified' | 'parent' | 'relevance' | 'slug' | 'title';
export declare type Status = 'publish';
export declare type OrderByCategories = 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count';
export declare type ListPosts = {
    context?: Context;
    page?: number;
    per_page?: number;
    search?: string;
    after?: Date;
    before?: Date;
    exclude?: number[];
    include?: number[];
    offset?: number;
    orderby?: OrderByPosts;
    slug?: string[];
    status?: Status;
    categories?: string[];
    categories_exclude?: string[];
    tags?: string[];
    tags_exclude?: string[];
    order?: Order;
    _embed?: boolean;
};
export declare type ListPages = {
    context?: Context;
    page?: number;
    per_page?: number;
    search?: string;
    after?: Date;
    before?: Date;
    exclude?: number[];
    include?: number[];
    offset?: number;
    orderby?: OrderByPosts;
    slug?: string[];
    status?: Status;
    menu_order?: number;
    author_exclude?: number;
    tags?: string[];
    tags_exclude?: string[];
    order?: Order;
    _embed?: boolean;
};
export declare type ListTags = {
    context?: Context;
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: Order;
    orderBy?: OrderByCategories;
    hide_empty?: boolean;
    parent?: number;
    post?: number;
    slug?: string[];
    _embed?: boolean;
};
export declare type ListTaxonomies = {
    context?: Context;
    type?: string;
};
export declare type GetPostPermalink = {
    permalink?: string;
    _embed?: boolean;
};
export declare type GetPostPreview = {
    id?: number;
    preview?: boolean;
    _embed?: boolean;
};
export declare type GetPost = {
    _embed?: boolean;
};
export declare type GetCustomizer = {
    language?: string;
};
export declare type ListCategories = {
    context?: Context;
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: Order;
    orderBy?: OrderByCategories;
    hide_empty?: boolean;
    parent?: number;
    post?: number;
    slug?: string[];
    _embed?: boolean;
};
