(angular => {
  'use strict'

  /* define service factory */
  const Service = () => {

    /**
     * Find duplicate values in Column A.
     * @argument {Object[]} data - array of File content Objects
     * @argument {String} data[].source - filename
     * @argument {String} data[].content - file contents
     * @returns  {Json} JSON Object of matched duplicates
     */
    const svc = (data) => {
      // caches
      const cache = {},
            duplicates = {}

      // iterate over all file contents
      for (let file of data) {
        // split string into lines
        const lines = file.content.split(/[\r\n]+/)

        // split lines into columns
        for (const line of lines) {
          // skip empty lines
          if (!line.length || line.match(/^\s*$/)) { continue }
          // TODO import delimeter option
          // cache columns
          const [colA, colB] = line.split('\t')

          // value is already in cache
          if (typeof cache[colA] !== 'undefined') {
            // create new duplicate
            if (typeof duplicates[colA] === 'undefined') {
              duplicates[colA] = cache[colA]
            }
            // add to duplicates
            duplicates[colA].push(colB)
          } else {
            // add to cache
            cache[colA] = [colB]
            // save headers
            if (!file.headers) {
              file.headers = { 'columnA': colA, 'columnB': colB }
            }
          }
        }
        // add duplicates to data
        //file.duplicates = angular.toJson(duplicates)
        file.duplicates = angular.copy(duplicates)
        // remove original content
        delete file.content
      }
      return data
    }

    return svc
  }

  /* inject service dependencies */
  Service.$inject = []

  /* register service to our module */
  angular
    .module('findDuplicates.parser')
    .factory('DuplicateParser', Service)
})(window.angular)
