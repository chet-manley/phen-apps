(function (angular) {
  'use strict';

  /* create service */
  function Service() {
    var data = {},
      svc = function svc(key, value) {
        if (!arguments.length) { return data; }
        if (arguments.length === 1) { return data[key]; }
        return (data[key] = value);
      };

    return svc;
  }

  /* inject service dependencies */
  Service.$inject = [];

  /* register service to our module */
  angular
    .module('core.data')
    .factory('Data', Service);
}(window.angular));
