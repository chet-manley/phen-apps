(angular => {
  'use strict'

  /* create controller */
  function Controller(dataSvc, duplicateParser, fileSvc, menuSvc, toastSvc) {
    /* constructor */
    this.$onInit = () => {
      // menu options for this component
      this.options = {
        'delimiters': {
          'tabs': {
            'name' : 'Tabs',
            'value': '\t',
          },
          'commas': {
            'name' : 'Commas',
            'value': ',',
          },
          'pipes': {
            'name' : 'Pipes',
            'value': '|',
          },
        },
        'dialogs': [
          {
            'name'    : 'file-process',
            'title'   : 'Processing files...',
            'template': '<file-process-dialog></file-process-dialog>',
          },
        ],
        'menu': {
          'name'    : 'find-duplicates',
          'title'   : 'Duplicate Finder',
          'template': '<find-duplicates-menu></find-duplicates-menu>',
        },
      }

      // set default data
      dataSvc('options:delimiter', this.options.delimiters.tabs)
      dataSvc('options:delimiters', this.options.delimiters)
      dataSvc('app:title', this.options.menu.title)
      menuSvc.register(this.options.menu, true)

      this.files  = fileSvc.get()
      this.input  = ''
      this.output = [{
        'duplicates': {},
        'headers': {},
        'source': '',
      }]

      return void 0
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

    /**
     * TODO
     * process files
     * parse files
     * output results
     */

    /**
    * Add files to list.
    * @argument {FileList} data - a FileList
    * @returns  {Boolean|null} true: update performed, false: file was duplicate, null: error
    */
    this.addFiles = data => {
      return fileSvc.update(data)
    }

    /**
     * Handle clear data event.
     * @argument {none} none - accepts no arguments
     * @returns  {Boolean} true if data cleared, false if there was no data
     */
    this.clearAll = () => {
      let cleared = false
      if ( this.input.length ) {
        this.input = ''
        cleared = true
      }
      if ( this.files.length ) {
        fileSvc.clear()
        cleared = true
      }
      // display toast with results
      if ( cleared ) { toastSvc.show({ 'text': 'All data removed', 'class': '' }) }
      else { toastSvc.show({ 'text': 'No data to remove', 'class': '' }) }
      return cleared
    }

    /**
     * Handle process files event.
     * @argument {none} none - accepts no arguments
     * @returns  {false} to Event
     */
    this.processFiles = () => {
      fileSvc.read()
        .then( results => {
          let update = duplicateParser(results.results)
          console.log(this.output)
          this.updateOutput(update)
          console.log(this.output)

          return update
        })
      return false
    }

    /**
     * Handle process input event.
     * @argument {Event} event - the Event object
     * @returns  {undefined} no return required
     */
    this.processInput = event => {
      console.log(`Processing request for input: ${this.input.length} chars`)
      return void 0
    }

    /**
     * Handle remove file event.
     * @argument {Number} index - index of file in array
     * @returns  {Boolean} true if File removed, else false
     */
    this.removeFile = index => {
      return fileSvc.update([index])
    }

    /**
     * Update the input string.
     * @argument {String} text - string from textarea
     * @returns  {String} the concatenated string
     */
    this.updateInput = text => {
      return (this.input += text)
    }

    /**
     * Update the output object.
     * @argument {Array} update - an Array of Objects
     * @returns  {Array} the updated Array
     */
    this.updateOutput = update => {
      return (angular.copy(update, this.output))
    }
  }

  /* inject controller dependencies */
  Controller.$inject = ['Data', 'DuplicateParser', 'Files', 'Menu', 'Toaster']

  /* register component to our module */
  angular
    .module('findDuplicates')
    .component('findDuplicates', {
      'controller' : Controller,
      'templateUrl': 'find-duplicates/find-duplicates.template.html'
    })
})(window.angular)
