import { Customizer} from './types'

export const Query = {
  settings: {
    type: Customizer,
    args: {}
  },
  resolve: (_root, args, ctx) => ctx.loader.getCustomizer(ctx, args)
}
