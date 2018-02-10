(angular => {
  'use strict'

  /* define service factory */
  function Service($mdDialog) {
    // initialize internal service variables
    let currentDialog = null

    /**
     * Close opened dialog.
     * @argument {Any} response - any response from menu
     * @returns  {Promise} $mdDialog Promise with response
     */
    const closeDialog = (response) => {
      return $mdDialog.hide(response)
    }

    /**
     * Open a dialog.
     * @argument {Object} event - a launch event
     * @argument {Object} dialog - a dialog definition object
     * @returns  {Promise} $mdDialog Promise
     */
    const openDialog = (event, dialog) => {
      currentDialog = $mdDialog.show({
        'bindToController'   : true,
        'controller'         : 'phenDialogController',
        'controllerAs'       : '$ctrl',
        'locals'             : {
          'dialog': dialog,
        },
        'templateUrl'        : 'core/dialog/dialog.template.html',
        'targetEvent'        : event,
        'clickOutsideToClose': false,
        'escapeToClose'      : false,
      })
      return currentDialog
    }

    /**
     * Send update to open dialog.
     * @argument {Object} update - a dialog definition update object
     * @returns  {Promise} $mdDialog Promise
     */
    const updateDialog = (update) => {

    }

    /* external API methods */
    return {
      'close'   : closeDialog,
      'open'    : openDialog,
      'update'  : updateDialog,
    }
  }

  /* inject service dependencies */
  Service.$inject = ['$mdDialog']

  /* register service factory to our module */
  angular
    .module('core.dialog')
    .factory('Dialog', Service)
})(window.angular)
