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

    this.delimiter = (...args) => {
      return args.length
        ? (dataSvc('options:delimiter', args[0]))
        : dataSvc('options:delimiter')
    }
  }

  /* inject controller dependencies */
  Controller.$inject = ['Data']

  /* register component to our module */
  angular
    .module('findDuplicates.menu')
    .component('findDuplicatesMenu', {
      bindings: {
        menu: '<'
      },
      controller: Controller,
      templateUrl: 'find-duplicates/menu/menu.template.html'
    })
})(window.angular)
