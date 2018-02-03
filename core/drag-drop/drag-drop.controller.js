(angular => {
  'use strict'

  /* create controller */
  function Controller () {
    /* constructor */
    this.$onInit = () => {
      //
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

    // handle dropped payload
    this.drop = data => {
      // text payload
      if (!data.files.length) {
        return this.updateInput += data.getData('text/plain')
      }
      // file payload
      for (let file of data.files) {
        this.updateFiles({ '$file': file })
      }
    }
  }

  /* inject dependencies */
  Controller.$inject = []

  /* register controller for directive */
  angular
    .module('core.dragDrop')
    .controller('dropZoneController', Controller)
})(window.angular)
