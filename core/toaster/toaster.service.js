(angular => {
  'use strict'

  /* define service factory */
  function Service($mdToast) {
    // initialize internal service variables
    const pinTo = 'bottom center',
          delay = 3000,

          /**
           * Set active menu.
           * @argument {String} toast - a menu name
           * @returns  {Boolean} true: activated, false: not registered
           */
          showToast = toast => {
            return $mdToast.show(
              $mdToast.simple()
                .capsule(false)
                .textContent(toast.text)
                .position(toast.from || pinTo)
                .hideDelay(delay)
                .toastClass(toast['class'] || 'md-toast-phen')
            )
          }

    return {
      'show': showToast,
    }
  }

  /* inject service dependencies */
  Service.$inject = ['$mdToast']

  /* register service to our module */
  angular
    .module('core.toaster')
    .factory('Toaster', Service)
})(window.angular)
