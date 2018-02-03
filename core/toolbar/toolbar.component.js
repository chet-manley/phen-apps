(angular => {
  'use strict'

  /* create controller */
  function Controller(dataSvc, menuSvc) {
    /* constructor */
    this.$onInit = () => {
      //
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

    this.menu = menuSvc.open
    this.title = () => dataSvc('app:title')
  }

  /* inject controller dependencies */
  Controller.$inject = ['Data', 'Menu']

  /* register component to our module */
  angular
    .module('core.toolbar')
    .component('phenToolbar', {
      controller: Controller,
      templateUrl: 'core/toolbar/toolbar.template.html'
    })
})(window.angular)
