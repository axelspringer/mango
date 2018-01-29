const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')
import { UserType } from './userType'
import { GraphQLDateTime } from 'graphql-iso-date'

export const NavMenuLocation = new GraphQLObjectType({
  name: 'NavigationMenuLocation',
  description: 'Contains the information about a navigation menu location',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: location => location.name
    },
    menu: {
      type: NavMenuType,
      resolve: (location, args, ctx) => ctx.loader.getNavMenu(ctx, location.id, args)
    }
  })
})

export const NavMenuItemType = new GraphQLObjectType({
  name: 'NavigationMenuItem',
  description: 'Contains the information about a navigation menu item',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: item => item.id
    },
    postAuthor: {
      type: UserType,
      resolve: (item, args, ctx) => ctx.loader.getUser(ctx, item.post_author, args)
    },
    postDate: {
      type: GraphQLDateTime,
      resolve: item => item.post_date
    },
    postDateGmt: {
      type: GraphQLDateTime,
      resolve: item => item.post_date_gmt
    },
    postContent: {
      type: GraphQLString,
      resolve: item => item.post_content.rendered
    },
    postTitle: {
      type: GraphQLString,
      resolve: item => item.post_title
    },
    postStatus: {
      type: GraphQLString,
      resolve: item => item.post_status
    },
    postExcerpt: {
      type: GraphQLString, // todo(katallaxie): could be its own type
      resolve: item => item.post_excerpt
    },
    commentStatus: {
      type: GraphQLString,
      resolve: item => item.comment_status
    },
    pingStatus: {
      type: GraphQLString,
      resolve: item => item.ping_status
    },
    postName: {
      type: GraphQLString,
      resolve: item => item.post_name
    },
    postModified: {
      type: GraphQLDateTime,
      resolve: item => item.post_modified
    },
    postModifiedGmt: {
      type: GraphQLDateTime,
      resolve: item => item.post_modified_gmt
    },
    guid: {
      type: GraphQLString,
      resolve: item => item.guid
    },
    menuOrder: {
      type: GraphQLInt,
      resolve: item => item.menu_order
    },
    postType: {
      type: GraphQLString,
      resolve: item => item.post_type
    },
    postMimeType: {
      type: GraphQLString,
      resolve: item => item.post_mime_type
    },
    filter: { // todo(katallaxie): could be its own type
      type: GraphQLString,
      resolve: item => item.filter
    },
    menuItemParent: {
      type: NavMenuType,
      resolve: (item, args, ctx) => ctx.loader.getNavMenu(ctx, item.menu_item_parent, args)
    },
    type: {
      type: GraphQLString, // todo(katallaxie): could be its own type
      resolve: item => item.type
    },
    typeLabel: {
      type: GraphQLString,
      resolve: item => item.type_label
    },
    title: {
      type: GraphQLString,
      resolve: item => item.title
    },
    url: {
      type: GraphQLString,
      resolve: item => item.url
    },
    target: {
      type: GraphQLString,
      resolve: item => item.target
    },
    attrTitle: {
      type: GraphQLString,
      resolve: item => item.attr_title
    },
    description: {
      type: GraphQLString,
      resolve: item => item.description
    },
    classes: {
      type: new GraphQLList(GraphQLString),
      resolve: item => item.classes
    },
    object: {
      type: GraphQLString,
      resolve: item => item.object
    }
  })
})

export const NavMenuType = new GraphQLObjectType({
  name: 'NavigationMenu',
  description: 'Contains the information about a navigation menu',
  fields: () => ({
    termId: {
      type: GraphQLInt,
      resolve: menu => menu.term_id
    },
    name: {
      type: GraphQLString,
      resolve: menu => menu.name
    },
    slug: {
      type: GraphQLString,
      resolve: menu => menu.slug
    },
    termGroup: {
      type: GraphQLInt,
      resolve: menu => menu.term_group
    },
    termTaxonomyId: {
      type: GraphQLInt,
      resolve: menu => menu.term_taxonomy_id
    },
    taxonomy: {
      type: GraphQLString,
      resolve: menu => menu.taxonomy
    },
    description: {
      type: GraphQLString,
      resolve: menu => menu.description
    },
    parent: {
      type: GraphQLInt,
      resolve: menu => menu.parent // todo(katallaxie): make nested
    },
    count: {
      type: GraphQLInt,
      resolve: menu => menu.count
    },
    filter: {
      type: GraphQLString,
      resolve: menu => menu.filter // todo(katallaxie): add type
    },
    items: {
      type: new GraphQLList(NavMenuItemType),
      resolve: (menu, args, ctx) => ctx.loader.getNavItems(ctx, menu.term_id, args)
    }
  })
})
