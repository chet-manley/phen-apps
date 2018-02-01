(function (angular) {
  'use strict';

  /* create controller */
  function Controller(menuSvc, $compile, $element, $scope) {
    /* constructor */
    this.$onInit = () => {
      this.close = menuSvc.close;
    };
    /* deconstructor */
    this.$onDestroy = () => {
      //
    };

    // get active menu
    this.menu = menuSvc.get('active');

    // compile menu items and append to this dialog
    let compiled = $compile(this.menu.template)($scope.$new(true));
    $element.find('md-dialog-content').append(compiled);
  }

  /* inject controller dependencies */
  Controller.$inject = ['Menu', '$compile', '$element', '$scope'];

  /* register component to our module */
  angular
    .module('core.menu')
    .component('phenU', {
      controller: Controller,
      templateUrl: 'core/menu/menu.template.html'
    });
}(window.angular));
