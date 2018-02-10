(angular => {
  'use strict'

  /* define controller */
  function Controller (dialogSvc, $compile, $element, $scope) {
    /* constructor */
    this.$onInit = () => {
      /* $onInit is BROKEN when used with mdDialog */
      // close action handler
      //this.close = menuSvc.close
      // get requested dialog
      //this.dialog = dialogSvc.get(this.dialogName)
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

    // a terrible hack until $onInit is fixed
    this.menu = dialogSvc.get($element[0].attributes['dialog-name'].value)
    this.close = dialogSvc.close

    // compile new dialog template and append to this open dialog
    let compiled = $compile(this.dialog.template)($scope.$new(true))
    $element.find('md-dialog-content').append(compiled)
  }

  /* inject controller dependencies */
  Controller.$inject = ['Dialog', '$compile', '$element', '$scope']

  /* register component to our module */
  angular
    .module('core.dialog')
    .component('phenDialog', {
      'bindings'   : {
        'dialogName': '@',
      },
      'controller' : Controller,
      'templateUrl': 'core/dialog/dialog.template.html',
    })
})(window.angular)
