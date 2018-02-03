(angular => {
  'use strict'

  /* create service */
  function Service($mdToast) {
    let pinTo = 'bottom center',
      delay = 3000
    const showToast = (toast) => {
      $mdToast.show(
        $mdToast.simple()
          .capsule(false)
          .textContent(toast.text)
          .position(toast.from || pinTo)
          .hideDelay(delay)
          .toastClass(toast['class'] || 'md-toast-phen')
      )
    }

    return {
      'show': showToast
    }
  }

  /* inject service dependencies */
  Service.$inject = ['$mdToast']

  /* register service to our module */
  angular
    .module('core.toast')
    .factory('Toaster', Service)
})(window.angular)
