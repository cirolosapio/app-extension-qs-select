import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-qs-select'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
