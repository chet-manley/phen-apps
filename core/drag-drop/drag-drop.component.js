(function (angular) {
  'use strict';

  /* create controller */
  function Controller(dataSvc) {
    /* constructor */
    this.$onInit = () => {
      //
    };
    /* deconstructor */
    this.$onDestroy = () => {
      //
    };

    // handle dropped payload
    this.drop = data => {
      // text payload
      if (!data.files.length) {
        return this.updateInput += data.getData('text/plain');
      }
      // file payload
      for (let file of data.files) {
        this.updateFiles({ '$file': file });
      }
    };
  }

  /* inject dependencies */
  Controller.$inject = [];

  /* register component to our module */
  angular
    .module('core.dragDrop')
    .component('dragDrop', {
      bindings: {
        'updateFiles': '&',
        'updateInput': '='
      },
      controller: Controller,
      templateUrl: 'core/drag-drop/drag-drop.template.html'
    });
}(window.angular));
