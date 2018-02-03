(angular => {
  'use strict'

  /* define app routes */
  angular
    .module('phenApps')
    .config([
      '$locationProvider',
      '$routeProvider',
      ($locationProvider, $routeProvider) => {
        $locationProvider.hashPrefix('!')
        $routeProvider
          .when('/', {
            redirectTo: '/find-duplicates'
          })
          .when('/find-duplicates', {
            //templateUrl: 'find-duplicates/find-duplicates.template.html'
            template: '<find-duplicates></find-duplicates>'
          })
          .otherwise('/')
      }
    ])
})(window.angular)
