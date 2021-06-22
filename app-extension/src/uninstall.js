/**
 * Quasar App Extension uninstall script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/uninstall-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/UninstallAPI.js
 */

module.exports = function (api) {
  api.removePath('src/boot/register.js')

  api.onExitLog('Thanks for having used my extension!')
}
