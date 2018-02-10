(angular => {
  'use strict'

  /* define controller */
  function Controller () {
    /* constructor */
    this.$onInit = () => {
      /**
       * Handle drop events.
       * @argument {Object} data - dataTransfer Object
       * @returns  {undefined} no return required for this event handler
       */
      this.drop = data => {
        // text payload
        if (!data.files.length) {
          return this.updateInput( data.getData('text/plain') )
        }

        // TODO basic file type checking (no binaries)

        // file payload
        return this.addFiles({ '$files': data.files })
      }
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }
  }

  /* inject dependencies */
  Controller.$inject = []

  /* register controller for directive */
  angular
    .module('core.dragDrop')
    .controller('dropZoneController', Controller)
})(window.angular)
