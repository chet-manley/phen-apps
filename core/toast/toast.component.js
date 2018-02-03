(angular => {
  'use strict'

  /* create controller */
  function Controller ($mdToast) {
    /* constructor */
    this.$onInit = () => {
      let pinTo = 'bottom left',
        delay = 3000
      this.showToast = (toast) => {
        $mdToast.show(
          $mdToast.simple()
            .capsule(true)
            .textContent(toast.text)
            .position(toast.from || pinTo)
            .hideDelay(delay)
        )
      }
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }
  }

  /* inject controller dependencies */
  Controller.$inject = ['$mdToast']

  /* register component to our module */
  angular
    .module('core.toast')
    .component('phen-toaster', {
      controller: Controller
    })
})(window.angular)
