(angular => {
  'use strict'

  /* create controller */
  function Controller (menuSvc, $compile, $element, $scope) {
    /* constructor */
    this.$onInit = () => {
      /* $onInit is BROKEN when used with mdDialog */
      // close action handler
      //this.close = menuSvc.close
      // get requested menu
      //this.menu = menuSvc.get(this.menuName)
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

    // a terrible hack until $onInit is fixed
    this.menu = menuSvc.get($element[0].attributes['menu-name'].value)
    this.close = menuSvc.close

    // compile menu items and append to this dialog
    let compiled = $compile(this.menu.template)($scope.$new(true))
    $element.find('md-dialog-content').append(compiled)
  }

  /* inject controller dependencies */
  Controller.$inject = ['Menu', '$compile', '$element', '$scope']

  /* register component to our module */
  angular
    .module('core.menu')
    .component('phenU', {
      'bindings'   : {
        'menuName': '@',
      },
      'controller' : Controller,
      'templateUrl': 'core/menu/menu.template.html',
    })
})(window.angular)
