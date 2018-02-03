(angular => {
  'use strict'

  /* define module and dependencies */
  angular
    .module('core', [
      'core.data',
      'core.dragDrop',
      'core.menu',
      'core.toast',
      'core.toolbar'
    ])
})(window.angular)
