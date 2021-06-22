/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const { green } = require('chalk')

const extendConf = function (conf) {
  // register our boot file
  conf.boot.push('~quasar-app-extension-qs-select/src/boot/register.js')
  console.log(green(' App ·') + ' Extension(qs-select): Adding qs-select boot reference to your quasar.conf.js')

  // make sure app extension files & ui package gets transpiled
  // conf.build.transpileDependencies.push(/quasar-app-extension-qs-select[\\/]src/)

  console.log(green(' App ·') + ' Extension(qs-select): Adding qs-select env parameters to your quasar.conf.js')
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app" CLI
  api.compatibleWith('quasar', '^2.0.0')
  api.compatibleWith('@quasar/app', '^3.0.0')

  // Uncomment the line below if you provide a JSON API for your component
  api.registerDescribeApi('QsSelect', '~quasar-ui-qs-select/src/components/QsSelect.json')

  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}
