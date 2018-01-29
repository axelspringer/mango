const { GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLInt } = require('graphql')
import { CategoryType } from './catType'

export const SettingsType = new GraphQLObjectType({
  name: 'Settings',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: setting => setting.title
    },
    description: {
      type: GraphQLString,
      resolve: setting => setting.description
    },
    email: {
      type: GraphQLString,
      resolve: setting => setting.url
    },
    timezone: {
      type: GraphQLString,
      resolve: setting => setting.timezone
    },
    dateFormat: {
      type: GraphQLString,
      resolve: setting => setting.date_format
    },
    timeFormat: {
      type: GraphQLString,
      resolve: setting => setting.time_zone
    },
    startOfWeek: {
      type: GraphQLInt,
      resolve: setting => setting.start_of_week
    },
    languages: {
      type: GraphQLString,
      resolve: setting => setting.language
    },
    useSmilies: {
      type: GraphQLBoolean,
      resolve: setting => setting.use_similies
    },
    defaultCategory: {
      type: CategoryType,
      resolve: (setting, args, ctx) => ctx.loader.getCategory(ctx, setting.default_category, args)
    },
    defaultPostFormat: {
      type: GraphQLString,
      resolve: setting => setting.default_post_format
    },
    postsPerPage: {
      type: GraphQLInt,
      resolve: setting => setting.posts_per_page
    },
    defaultPingStatus: {
      type: GraphQLString,
      resolve: setting => setting.default_ping_statug // todo(katallaxie) add custom type
    },
    defaultCommentStatus: {
      type: GraphQLString,
      resolve: setting => setting.default_comment_status
    }
  })
})
