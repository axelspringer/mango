import { GraphQLObjectType } from 'graphql';
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql')

export const PostTypeACF = new GraphQLObjectType({
    name: 'PostTypeACF',
    description: 'name-value paring of result',
    fields: {
        subline: {
            type: GraphQLString,
            resolve: acf => acf.acf.subline
        },
        active_from: {
            type: GraphQLString,
            resolve: acf => acf.acf.active_from
        },
        active_till: {
            type: GraphQLString,
            resolve: acf => acf.acf.active_till
        },
        icon_choice: {
            type: GraphQLString,
            resolve: acf => acf.acf.icon_choice
        },
        background_choice: {
            type: GraphQLString,
            resolve: acf => acf.acf.background_choice
        },
        linked_teaser: {
            type: GraphQLString,
            resolve: acf => {
                acf.acf.linked_teaser
                console.log(acf.acf.linked_teaser)
                return acf.acf.linked_teaser[0]
            }
        },
        add_to_sidemenu: {
            type: GraphQLInt,
            resolve: acf => acf.acf.add_to_sidemenu
        },
        name: {
            type: GraphQLString,
            resolve: acf => acf.acf.name
        },
        firstname: {
            type: GraphQLString,
            resolve: acf => acf.acf.firstname
        },
        location: {
            type: GraphQLString,
            resolve: acf => acf.acf.location
        },
        zipcode: {
            type: GraphQLString,
            resolve: acf => acf.acf.zipcode
        },
        jobtitle: {
            type: GraphQLString,
            resolve: acf => acf.acf.jobtitle
        },
        email: {
            type: GraphQLString,
            resolve: acf => acf.acf.email
        },
        telephone: {
            type: GraphQLString,
            resolve: acf => acf.acf.telephone
        },
        street: {
            type: GraphQLString,
            resolve: acf => acf.acf.street
        },
        housenumber: {
            type: GraphQLString,
            resolve: acf => acf.acf.housenumber
        }
    }
})

export const ACFPostFields = new GraphQLObjectType({
    name: 'ACFPostFields',
    description: 'Common ACF interface',
    fields: () => ({
        acf: {
            type: new GraphQLList(PostTypeACF),
            resolve: acf => acf
        }
    })
})

export const TaxonomyTypeACF = new GraphQLObjectType({
    name: 'TaxonomyTypeACF',
    description: 'name-value paring of result',
    fields: {
        style: {
            type: GraphQLString,
            resolve: acf => acf.style
        },
        sort: {
            type: GraphQLString,
            resolve: acf => acf.sort
        }
    }
})

export const CustomTermType = new GraphQLObjectType({
    name: 'CustomTermType',
    description: 'Term-Type',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: result => result.id
        },
        count: {
            type: GraphQLInt,
            resolve: result => result.count
        },
        name: {
            type: GraphQLString,
            resolve: result => result.name
        },
        slug: {
            type: GraphQLString,
            resolve: result => result.slug
        },
        taxonomy: {
            type: GraphQLString,
            resolve: result => result.taxonomy
        },
        parent: {
            type: GraphQLInt,
            resolve: result => result.parent
        },
        acf: {
            type: TaxonomyTypeACF,
            resolve: result => result.acf
        }
    })
})

export const UserType = new GraphQLObjectType({
    name: 'MIUser',
    description: 'Contains information about a WordPress user/author',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: user => user.id
        },
        name: {
            type: GraphQLString,
            resolve: user => user.name
        },
        url: {
            type: GraphQLString,
            resolve: user => user.url
        },
        description: {
            type: GraphQLString,
            resolve: user => user.description
        },
        link: {
            type: GraphQLString,
            resolve: user => user.link
        },
        slug: {
            type: GraphQLString,
            resolve: user => user.slug
        },
        avatarUrls: {
            type: new GraphQLList(GraphQLString),
            resolve: user => user.avatar_urls
        },
        meta: {
            type: new GraphQLList(GraphQLString),
            resolve: user => user.meta
        }
    })
})

const ImgSizeType = new GraphQLObjectType({
    name: 'MIImageSizes',
    fields: () => ({
        file: {
            type: GraphQLString,
            resolve: (item) => item.file
        },
        width: {
            type: GraphQLInt,
            resolve: (item) => item.width
        },
        height: {
            type: GraphQLInt,
            resolve: (item) => item.height
        },
        source: {
            type: GraphQLString,
            resolve: (item) => item.source_url
        }
    })
})

export const ImgType = new GraphQLObjectType({
    name: 'MIImage',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: img => img.id
        },
        alt: {
            type: GraphQLString,
            resolve: img => img.alt
        },
        thumbnail: {
            type: ImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.thumbnail
                }
                return 0
            }
        },
        medium: {
            type: ImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.medium
                }
                return 0
            }
        },
        medium_large: {
            type: ImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.medium_large
                }
                return 0
            }
        },
        full: {
            type: ImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.full
                }
                return 0
            }
        }
    })
})


export const CategoryType = new GraphQLObjectType({
    name: 'MICategory',
    description: 'Wordpress category object',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: cat => cat.id
        },
        count: {
            type: GraphQLInt,
            resolve: cat => cat.count
        },
        description: {
            type: GraphQLString,
            resolve: cat => cat.description
        },
        link: {
            type: GraphQLString,
            resolve: cat => cat.link
        },
        name: {
            type: GraphQLString,
            resolve: cat => cat.name
        },
        slug: {
            type: GraphQLString,
            resolve: cat => cat.slug
        },
        taxonomy: {
            type: GraphQLString,
            resolve: cat => cat.taxonomy
        },
        parent: {
            type: CategoryType,
            resolve: (cat, args, ctx) => ctx.loader.getCategory(ctx, cat.parent, args)
        },
        meta: {
            type: new GraphQLList(GraphQLString),
            resolve: cat => cat.meta
        }
    })
})

export const TagType = new GraphQLObjectType({
    name: 'MITag',
    description: 'Wordpress tag object https://developer.wordpress.org/rest-api/reference/tags/',
    fields: () => ({
        id: {
            type: GraphQLInt
        },
        count: {
            type: GraphQLInt
        },
        description: {
            type: GraphQLString
        },
        link: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        taxonomy: {
            type: GraphQLString
        },
        meta: {
            type: GraphQLString
        },
        parent: {
            type: GraphQLInt
        }
    })
})

export const PostType = new GraphQLObjectType({
    name: 'MIPost',
    description: 'Contains a MIPost from WordPress',
    fields: () => ({
        date: {
            type: GraphQLString,
            resolve: post => post.date
        },
        dateGmt: {
            type: GraphQLString,
            resolve: post => post.date_gmt.rendered
        },
        id: {
            type: GraphQLString,
            resolve: post => post.id
        },
        link: {
            type: GraphQLString,
            resolve: post => post.link
        },
        modified: {
            type: GraphQLString,
            resolve: post => post.modified
        },
        modifiedGmt: {
            type: GraphQLString,
            resolve: post => post.modified_gmt
        },
        status: {
            type: GraphQLString,
            resolve: post => post.status
        },
        type: {
            type: GraphQLString,
            resolve: post => post.type
        },
        password: {
            type: GraphQLString,
            resolve: post => post.password
        },
        excerpt: {
            type: GraphQLString,
            resolve: post => {
                return (post.excerpt !== undefined) ? post.excerpt.rendered : null
            }
        },
        featuredMedia: {
            type: GraphQLInt,
            resolve: post => post.featured_media
        },
        commentStatus: {
            type: GraphQLString,
            resolve: post => post.comment_status
        },
        pingStatus: {
            type: GraphQLString,
            resolve: post => post.ping_status
        },
        title: {
            type: GraphQLString,
            resolve: post => post.title.rendered
        },
        sticky: {
            type: GraphQLBoolean,
            resolve: post => post.sticky
        },
        meta: {
            type: new GraphQLList(GraphQLString),
            resolve: post => post.meta
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve: (root, args, ctx) => ctx.loader.getCategories(ctx, root.categories, args)
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve: (root, args, ctx) => ctx.loader.getTags(ctx, root, args)
        },
        template: {
            type: GraphQLString,
            resolve: post => post.template
        },
        content: {
            type: GraphQLString,
            resolve: post => post.content.rendered
        },
        slug: {
            type: GraphQLString,
            resolve: post => post.slug
        },
        author: {
            type: UserType,
            resolve: (root, args, ctx) => ctx.loader.getUser(ctx, root.author, args)
        },
        format: {
            type: GraphQLString,
            resolve: post => post.format
        },
        pagemanager: {
            type: new GraphQLList(GraphQLString),
            resolve: post => post.pagemanager.settings.name
        },
        img: {
            type: ImgType,
            resolve: function (root, args, ctx) {
                console.log(root)
                return ctx.loader.getImage(ctx, root.featured_media, args)
            }
        }
    }),
})


const FeaturedImgSizeType = new GraphQLObjectType({
    name: 'FeaturedImageSizes',
    fields: () => ({
        source: {
            type: GraphQLString,
            resolve: (item) => item.source
        }
    })
})

const FeaturedVideoType = new GraphQLObjectType({
    name: 'FeaturedVideoType',
    fields: () => ({
        source: {
            type: GraphQLString,
            resolve: (item) => item.url
        },
        image: {
            type: GraphQLString,
            resolve: (item) => item.image
        },
        thumbnail: {
            type: GraphQLString,
            resolve: (item) => {
                if (item.hasOwnProperty('rendered')) {
                    return item.rendered.thumbnail.source
                }
                return 0
            }
        },
        medium: {
            type: GraphQLString,
            resolve: (item) => {
                if (item.hasOwnProperty('rendered')) {
                    return item.rendered.medium.source
                }
                return 0
            }
        },
        medium_large: {
            type: GraphQLString,
            resolve: (item) => {
                if (item.hasOwnProperty('rendered')) {
                    return item.rendered.medium_large.source
                }
                return 0
            }
        },
        full: {
            type: GraphQLString,
            resolve: (item) => {
                if (item.hasOwnProperty('rendered')) {
                    return item.rendered.full.source
                }
                return 0
            }
        }
    })
})
export const FeaturedImgType = new GraphQLObjectType({
    name: 'FeaturedMedia',
    fields: () => ({
        id: {
            type: GraphQLInt,
            resolve: img => img.id
        },
        alt: {
            type: GraphQLString,
            resolve: img => img.alt
        },
        title: {
            type: GraphQLString,
            resolve: img => img.title
        },
        caption: {
            type: GraphQLString,
            resolve: img => img.caption
        },
        description: {
            type: GraphQLString,
            resolve: img => img.description
        },
        thumbnail: {
            type: FeaturedImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.thumbnail
                }
                return 0
            }
        },
        medium: {
            type: FeaturedImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.medium
                }
                return 0
            }
        },
        medium_large: {
            type: FeaturedImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.medium_large
                }
                return 0
            }
        },
        full: {
            type: FeaturedImgSizeType,
            resolve: (img) => {
                if (img.hasOwnProperty('media_details')) {
                    return img.media_details.sizes.full
                }
                return 0
            }
        }
    })
})

export const MediaType = new GraphQLObjectType({
    name: 'MIMedia',
    description: 'Contains a featured_media from WordPress',
    fields: () => ({
        img: {
            type: new GraphQLList(FeaturedImgType),
            resolve: (root) => root.featured_post_media.img
        },
        video: {
            type: FeaturedVideoType,
            resolve: (root) => root.featured_post_media.video

        }
    })
})
