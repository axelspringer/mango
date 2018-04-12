import { Customizer} from './types'

export const Query = {
  customizer: {
    type: Customizer,
    resolve: (_root, args, ctx) => ctx.loader.getCustomizer(ctx, args)
  }
}
