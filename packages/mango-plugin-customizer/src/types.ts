
const { GraphQLObjectType,GraphQLString } = require('graphql')

export const Customizer = new GraphQLObjectType({
    name: 'Customizer',
    description: 'Contains the customizer settings',
    fields: () => ({
        ukGeneralFooterText: {
            type: GraphQLString,
            resolve: settings => settings.uk_general_footer_text
        }
    })
})
