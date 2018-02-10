(angular => {
  'use strict'

  /* define service factory */
  function Service($mdDialog) {
    // initialize internal service variables
    const menus = {}

    /**
     * Set active menu.
     * @argument {String} name - a menu name
     * @returns  {Boolean} true: activated, false: not registered
     */
    const activateMenu = name => {
            // cannot activate unregistered menu
            if (!menus[name]) { return false }
            // set active
            return !!(menus.activated = name)
          },

          /**
           * Register new menu.
           * @argument {Object} menu - a menu object
           * @argument {Boolean} activate - immediately activate menu
           * @returns  {Boolean} true on success, else false
           */
          registerMenu = (menu, activate) => {
            menus[menu.name] = {'title': menu.title, 'template': menu.template}
            return activate ? activateMenu(menu.name) : true
          },

          /**
           * Retrieve a stored menu.
           * @argument {String} name - a menu name
           * @returns  {Object} menu Object or undefined
           */
          getMenu = name => {
            return menus[name]
          },

          /**
           * Open a menu.
           * @argument {Object} event - a launch event
           * @returns  {Promise} $mdDialog Promise
           */
          openMenu = (event) => {
            return $mdDialog.show({
              'targetEvent'        : event,
              'template'           : `<phen-u menu-name="${menus.activated}"></phen-u>`,
              'clickOutsideToClose': true,
              'escapeToClose'      : true,
            })
          },

          /**
           * Close opened menu.
           * @argument {Any} response - any response from menu
           * @returns  {Promise} $mdDialog Promise with response
           */
          closeMenu = (response) => {
            return $mdDialog.hide(response)
          }

    return {
      'activate': activateMenu,
      'close'   : closeMenu,
      'get'     : getMenu,
      'open'    : openMenu,
      'register': registerMenu,
    }
  }

  /* inject service dependencies */
  Service.$inject = ['$mdDialog']

  /* register service to our module */
  angular
    .module('core.menu')
    .factory('Menu', Service)
})(window.angular)
