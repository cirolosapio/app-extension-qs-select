/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const { green } = require('chalk')

const extendConf = function (conf) {
  // make sure qfilterconfigurator boot file is registered
  conf.boot.push('~quasar-app-extension-qs-select/src/boot/qs-select.js')
  console.log(green(' App ·') + ' Extension(qs-select): Adding qs-select boot reference to your quasar.conf.js')

  // make sure boot & component files transpile
  // conf.build.transpileDependencies.push(/quasar-app-extension-q-filter-configurator[\\/]src/)
}

module.exports = function (api) {
  // register JSON api
  api.registerDescribeApi('QsSelect', './component/QsSelect.json')

  // extend quasar.conf
  api.extendQuasarConf(extendConf)
}
