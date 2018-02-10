(angular => {
  'use strict'

  /* define service factory */
  const Service = () => {
    // initialize internal service variables
    const data = {}

    /**
     * Gets and sets data values by key.
     * @argument {String} key - a menu object
     * @argument {Any} value - value of data
     * @returns  {Object} data Object if no arguments
     * @returns  {Any} key's value if key argument
     * @returns  {Any} set key's passed value if key and value arguments
     */
    const svc = (...args) => {
      if (!args.length) { return data }
      const [key, value] = args
      if (args.length === 1) { return data[key] }
      return (data[key] = value)
    }

    return svc
  }

  /* inject service dependencies */
  Service.$inject = []

  /* register service to our module */
  angular
    .module('core.data')
    .factory('Data', Service)
})(window.angular)
