(angular => {
  'use strict'

  /* define module and dependencies */
  angular
    .module('core', [
      'core.data',
      'core.dialog',
      'core.dragDrop',
      'core.files',
      'core.menu',
      'core.toaster',
      'core.toolbar',
      'core.uuid',
    ])
})(window.angular)
