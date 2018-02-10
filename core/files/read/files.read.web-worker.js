'use strict'

// cache reader instances
const readers = []

/**
 * Handle abort reader events.
 * @argument {String} uuid - uuid of file being read
 * @returns  {Promise} to abort cached reader
 */
const abortReader = uuid => {
  return new Promise((resolve, reject) => {
    // find index of reader
    const index = readers.findIndex( el => el.uuid === uuid ? true : false )

    // remove reader from cache
    let [reader] = readers.splice(index, 1)

    // reader was not cached
    if (reader instanceof undefined || !reader.reader) {
      return reject(new Error(`Reader for UUID ${uuid} not found.`))
    }
    // reader was cached
    reader = reader.reader

    // abort read operation
    if (reader.readyState === 1) {
      reader.abort()
      return resolve(`Reader for UUID ${uuid} aborted.`)
    }
    // reader hasn't started
    else if (reader.readyState === 0) {
      return reject(new Error(`Reader for UUID ${uuid} not started.`))
    }
    // reader is already done
    return reject(new Error(`Reader for UUID ${uuid} already completed.`))
  })
    .then(result => {
      return this.postMessage({
        'action'  : 'read:abort:success',
        'message' : result,
        'response': {},
        'uuid'    : uuid,
      })
    })
    .catch(reason => {
      return this.postMessage({
        'action'  : 'read:abort:error',
        'error'   : reason,
        'message' : reason,
        'response': {},
        'uuid'    : uuid,
      })
    })
}

/**
 * Setup new FileReader and read from file.
 * @argument {Object} data - file definition object
 * @returns  {undefined} return of postMessage
 */
const addReader = data => {
  // initialize new FileReader instance
  const reader = new FileReader()

  // handle abort events
  reader.onabort = () => {
    this.postMessage({
      'action'  : 'read:abort',
      'message' : `Read aborted for '${data.file.name}'.`,
      'response': {},
      'uuid'    : data.uuid,
    })
    return false
  }
  // handle error events
  reader.onerror = event => {
    this.postMessage({
      'action'  : 'read:error',
      'error'   : event.error,
      'message' : `Error reading '${data.file.name}'.`,
      'response': {},
      'uuid'    : data.uuid,
    })
    return false
  }
  // handle load events (data ready)
  reader.onload = event => {
    this.postMessage({
      'action'  : 'read:complete',
      'message' : `Finished: ${data.file.name}`,
      'response': {
        'result': event.target.result,
      },
      'uuid'    : data.uuid,
    })
    return false
  }
  // handle load start events
  reader.onloadstart = () => {
    this.postMessage({
      'action'  : 'read:load',
      'message' : `Loaded: ${data.file.name}`,
      'response': {},
      'uuid'    : data.uuid,
    })
    return false
  }
  // handle progress events
  reader.onprogress = event => {
    this.postMessage({
      'action'  : 'read:progress',
      'message' : `Reading: ${data.file.name}`,
      'response': {
        'completed': Math.round((event.loaded / event.total) * 100),
        'loaded'   : event.loaded,
        'total'    : event.total,
      },
      'uuid'    : data.uuid,
    })
    return false
  }

  // start reading file
  //reader.readAsText(data.file) // no progress stats
  reader.readAsBinaryString(data.file)

  // cache reader
  readers.push({
    'reader': reader,
    'uuid'  : data.uuid,
  })

  return this.postMessage({
    'action'  : 'read:add:success',
    'message' : `Added: ${data.file.name}`,
    'response': {},
    'uuid'    : data.uuid,
  })
}

this.onmessage = message => {
  const data = message.data

  // DEBUG
  //console.log('Message from service:', data)

  switch (data.action) {
    case 'read:add':
      addReader(data)
      break
    case 'read:abort':
      abortReader(data.uuid)
      break
    default:
      return this.postMessage(`'${data.action}' is not a recognized action. Ignoring message.`)
  }

  // undefined
  return void 0
}

// announce worker loaded
this.postMessage('File reader started.')
