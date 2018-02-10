(angular => {
  'use strict'

  /* define service factory */
  function Service(config, dialogSvc, fileReaderSvc, toastSvc) {
    // initialize private service variables
    const files = []

    /**
     * Check if File is already in cache
     * @argument {Blob} file - a single File from a FileList
     * @returns  {Boolean} true if file already in array, else false
     */
    const isDuplicate = file => {
      // there are no files
      if (files.length === 0) { return false }
      // check against file name, size and type
      return files.find( el => {
        if ( el.name === file.name
          && el.size === file.size
          && el.type === file.type ) { return true }
        return false
      } )
    }

    /**
     * Adds Files to the cache.
     * @argument {FileList} data - a FileList
     * @returns  {Boolean} true if files were added, else false
     */
    const addFiles = data => {
      let updated = false
      // iterate FileList for new Files
      for (let file of data) {
        // check if File is already in array
        if ( isDuplicate(file) ) {
          // pop error toast
          toastSvc.show({
            'text': `File '${file.name}' already in queue.`,
            'class': 'md-toast-error'
          })
          // go to next File
          continue
        }
        // add File to array
        updated = true
        files.push(file)
        toastSvc.show({
          'text': `File '${file.name}' queued for processing.`
        })
      }
      return updated
    }

    /**
     * Remove all Files from the cache.
     * @argument {undefined} none - accepts no arguments
     * @returns  {Array} all elements removed from Array
     */
    const clearFiles = () => {
      return files.splice(0, files.length)
    }

    /**
     * Remove Files from the cache.
     * @argument {Array} indexes - an array of indexes
     * @returns  {Array} Array of Files removed
     */
    const removeFiles = indexes => {
      // iterate over indexes and remove files
      return indexes.filter( index => {
        // splice returns array of removed elements, we are only removing one at a time
        let [removed] = files.splice(index, 1)
        // display toast notification
        toastSvc.show({
          'text': `File '${removed.name}' removed.`,
          'class': 'md-toast-error',
        })
        // truthy gets returned to filter
        return !!removed.length
      })
    }

    /**
     * Remove read File from the cache.
     * @argument {File} file - a File object
     * @returns  {Boolean} true: File removed, else false
     */
    const removeReadFile = file => {
      // find index of File
      const index = files.findIndex( el => el === file ? true : false )
      // splice returns array of removed elements, we are only removing one
      let [removed] = files.splice(index, 1)
      // display toast notification
      toastSvc.show({
        'text': `File '${removed.name}' is ready for processing.`,
        'class': '',
      })
      return !!removed.length
    }

    /**
     * Read contents of File(s) from the cache.
     * @argument {Array=} [index] - index of file to read
     * @returns  {Promise} promise for file contents
     */
    const readFiles = index => {
      return new Promise((resolve, reject) => {
        // no files to read
        if (!files.length) {
          return reject(new Error('There are no files to read.'))
        }

        // a single file was requested
        if (index !== undefined) {
          // index location does not exist
          if (index instanceof Number && !files[index]) {
            return reject(new RangeError(`Array does not contain index ${index}.`))
          }
          // index (NaN)
          return reject(new TypeError(`Provided index '${index}' is not a number.`))
        }

        // prepare dialog defintion object
        const definition = config.dialogs['read-files']
        const data = { 'files': [] }
        definition.data = data

        // open new dialog box and cache Promise
        const dialog  = dialogSvc.open(null, definition)

        // reader Promise cache
        const readers = []

        // iterate over files and read contents
        files.forEach( file => {
          // add progress data
          file.progress = '0'

          // display the file we are reading
          data.files.push({ 'name': file.name, 'progress': file.progress })

          // send File to reader
          const reader = fileReaderSvc(file)
            .then( results => {
              // update results with source
              const updated = {
                'source': file.name,
                'content': results,
              }
              // remove File from cache when promise resolved
              removeReadFile(file)
              // return results, as promised
              return updated
            })

          // cache reader promise
          readers.push(reader)
        })

        Promise.all(readers)
          .then( results => {
            // resolve primary promise (all files read)
            return resolve({
              'dialog' : dialog,
              'data'   : data,
              'results': results,
            })
          })
          .catch( reason => {
            console.log(reason)
          })
          .then( results => {
            // TODO fix dialog templates
            definition.locked = false
            dialogSvc.close()
            return results
          })

        return void 0
      })
    }

    /**
     * Get File(s) from cache.
     * @argument {Number} index - index of File to retrieve
     * @returns  {Array|Blob} File at index or entire File array
     */
    const getFiles = index => {
      // return indexed File
      if ( index instanceof Number ) { return files[index] }
      // return all Files
      return files
    }

    /**
     * Add or remove Files from cache.
     * @argument {FileList|Blob|Array} data - a FileList or array of indexes
     * @returns  {Boolean|null} true: update performed, false: nothing to update, null: error
     */
    const updateFiles = data => {
      // add new File(s)
      if ( data instanceof FileList ) { return addFiles(data) }
      // remove File(s)
      if ( data instanceof Array && data.length ) { return !!removeFiles(data).length }
      // something went wrong
      return null
    }

    /* public API */
    return {
      'clear' : clearFiles,
      'get'   : getFiles,
      'read'  : readFiles,
      'update': updateFiles,
    }
  }

  /* inject service dependencies */
  Service.$inject = ['config', 'Dialog', 'FileReader', 'Toaster']

  /* register service to our module */
  angular
    .module('core.files')
    .factory('Files', Service)
})(window.angular)
