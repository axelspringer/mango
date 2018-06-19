const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql')

export const UserType = new GraphQLObjectType({
  name: 'User',
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
