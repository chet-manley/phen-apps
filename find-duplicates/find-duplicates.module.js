(angular => {
  'use strict'

  /* define our custom module and dependencies */
  angular.module('findDuplicates', [
    'core.data',
    'core.dialog',
    'core.files',
    'core.menu',
    'core.toaster',
    'findDuplicates.menu',
    'findDuplicates.dialogs',
    'findDuplicates.parser',
  ])
})(window.angular)
