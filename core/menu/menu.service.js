(function (angular) {
  'use strict';

  /* create service */
  function Service($mdDialog, dataSvc) {
    let activateMenu = (menu) => {
        dataSvc('menu:active', menu);
      },
      createMenu = (menu) => {
          let menus = dataSvc('menus') || {};
          menus[menu.name] = {'title': menu.title, 'template': menu.template};
          return (dataSvc('menus', menus));
        },
      getMenu = (menu) => {
        if (menu === 'active') { menu = dataSvc('menu:active'); }
        let menus = dataSvc('menus');
        return menus[menu];
      },
      openMenu = (evt) => {
        $mdDialog.show({
          template: '<phen-u></phen-u>',
          targetEvent: evt,
          clickOutsideToClose: true,
          escapeToClose: true
        });
      },
      closeMenu = (res) => {
        $mdDialog.hide(res);
      };

    return {
      'activate': activateMenu,
      'close': closeMenu,
      'create': createMenu,
      'get': getMenu,
      'open': openMenu
    };
  }

  /* inject service dependencies */
  Service.$inject = ['$mdDialog', 'Data'];

  /* register service to our module */
  angular
    .module('core.menu')
    .factory('Menu', Service);
}(window.angular));
