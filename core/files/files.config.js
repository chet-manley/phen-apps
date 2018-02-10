(angular => {
  'use strict'

  /* define module configuration */
  angular
    .module('core.files')
    .constant('config', {
      'dialogs': {
        'read-files': {
          'locked': true,
          'title': 'Reading files',
          'template': '<dialog-read-files></dialog-read-files>',
        },
      },
    })
})(window.angular)
