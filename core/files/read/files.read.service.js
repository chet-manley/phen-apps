(angular => {
  'use strict'

  /* define service factory */
  function Service(uuidSvc) {
    // initialize private service variables
    const files = []

    /**
     * Remove File from cache.
     * @argument {String} uuid - uuid of file to remove
     * @returns  {Boolean} true if file removed, else false
     */
    const removeFile = uuid => {
      // find index of File
      const index = files.findIndex( el => el.uuid === uuid ? true : false )

      // remove File from cache
      let [file] = files.splice(index, 1)

      return !!file.length
    }

    /**
     * Handle update file progress.
     * @argument {Object} data - message data object
     * @returns  {String} new progress data
     */
    const updateProgress = data => {
      let file = files.find( el => el.uuid === data.uuid )
      return (file.progress = data.completed)
    }

    /**
     * Setup new web worker and handle messages
     * @argument {File} file - File Object
     * @returns  {Promise} file contents as String
     */
    const callWebWorker = file => {
      return new Promise((resolve, reject) => {
        const webWorker = new Worker('core/files/read/files.read.web-worker.js'),
              uuid = uuidSvc()

        /**
         * Handle web worker messages
         * @argument {Object} message - message object
         * @returns  {Promise} resolved promise on read complete, rejected promise on abort and error
         * @returns  {Boolean} false: unhandled action type, true: handled action
         */
        const onWebWorkerMessage = message => {
          const data = message.data

          // DEBUG
          //console.log('Message from worker:', data)

          // handle incoming message types
          switch (data.action) {
            case 'read:add:success':
              // noop
              break
            case 'read:load':
              // noop
              break
            case 'read:progress':
              updateProgress(data)
              break
            case 'read:complete':
              removeFile(data.uuid)
              return resolve(data.response.result)
            case 'read:abort:success':
              // fallthrough
            case 'read:abort:error':
              removeFile(data.uuid)
              return reject(new Error(data.message))
            case 'read:error':
              removeFile(data.uuid)
              return reject(data.error)
            default:
              return false
          }

          return true
        }

        // listen for web worker events
        webWorker.onmessage = onWebWorkerMessage

        // assign uuid for tracking
        file.uuid = uuid

        // send File to web worker
        webWorker.postMessage({
          'action': 'read:add',
          'file'  : file,
          'uuid'  : uuid,
        })

        return void 0
      })
    }

    /* public API */
    /**
     * Setup file reading process.
     * @argument {File} file - File Blob from FileList
     * @returns  {Promise} true if file already in array, else false
     */
    const apiInterface = file => {
      return new Promise((resolve, reject) => {
        // file is not a File Object
        if (!(file instanceof File)) {
          return reject(new TypeError('Argument is not a File Object.'))
        }

        // file is already queued
        if (files.find( el => el.name === file.name && el.size === file.size ? true : false )) {
          return reject(new Error(`File '${file.name}' already queued.`))
        }

        // send file to web worker
        const worker = callWebWorker(file)

        // cache files being read
        files.push(file)

        worker.then( results => {
          return resolve(results)
        })
          .catch( reason => {
            return reject(reason)
          })
      })
    }

    return apiInterface
  }

  /* inject service dependencies */
  Service.$inject = ['Uuid']

  /* register service to our module */
  angular
    .module('core.files.read')
    .factory('FileReader', Service)
})(window.angular)
