(angular => {
  'use strict'

  /* define module and dependencies */
  angular
    .module('core.files', [
      'core.dialog',
      'core.toaster',
      'core.files.read',
    ])
})(window.angular)
