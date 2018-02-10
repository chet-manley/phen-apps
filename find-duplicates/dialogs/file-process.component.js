(angular => {
  'use strict'

  /* create controller */
  function Controller(dataSvc) {
    /* constructor */
    this.$onInit = () => {
      this.delimiters = dataSvc('options:delimiters')
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

  }

  /* inject controller dependencies */
  Controller.$inject = ['Data']

  /* register component to our module */
  angular
    .module('findDuplicates.dialogs')
    .component('fileProcessDialog', {
      bindings: {},
      controller: Controller,
      templateUrl: 'find-duplicates/dialogs/file-process.template.html'
    })
})(window.angular)
