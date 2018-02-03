(angular => {
  'use strict'

  /* create controller */
  function Controller(dataSvc, menuSvc, toastSvc) {
    /* constructor */
    this.$onInit = () => {
      // menu options for this component
      this.options = {
        'menu': {
          'name': 'find-duplicates',
          'title': 'Duplicate Finder',
          'template': '<find-duplicates-menu menu="$ctrl.menu"></find-duplicates-menu>'
        },
        'delimiters': {
          'tabs': {
            'name': 'Tabs',
            'value': '\t'
          },
          'commas': {
            'name': 'Commas',
            'value': ','
          },
          'pipes': {
            'name': 'Pipes',
            'value': '|'
          }
        }
      }

      // set default data
      dataSvc('options:delimiter', this.options.delimiters.tabs)
      dataSvc('options:delimiters', this.options.delimiters)
      dataSvc('app:title', this.options.menu.title)
      menuSvc.create(this.options.menu)
      menuSvc.activate(this.options.menu.name)
      this.files = []
      this.input = ''

      return void 0
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

    /* internal methods */
    const isDuplicate = f => {
      // check against file name, size and type
        return this.files.find( el => {
          if ( el.name === f.name
            && el.size === f.size
            && el.type === f.type ) { return true }
          return false
        } )
      },
      addFile = f => {
        // check if file is already in array
        if ( isDuplicate(f) ) {
          toastSvc.show({
            'text': `File ${f.name} already in queue`,
            'class': 'md-toast-error'
          })
          return false
        }
        // add file to files array
        this.files.push(f)
        toastSvc.show({ 'text': `File ${f.name} queued for processing` })
        return true
      },
      removeFiles = a => {
        // allow multiple indexes to be removed at once
        a.filter( f => {
          // splice returns array of removed elements, we are only removing one
          let [removed] = this.files.splice(f, 1)
          toastSvc.show({
            'text': `File ${removed.name} removed`,
            'class': 'md-toast-error'
          })
          return !!removed
        })
      }

    /**
     * TODO
     * parse files
     */

    /**
     * Add to or remove from the files array.
     * @argument {Blob} file - a fileList or Array of indexes
     * @returns {boolean|null} true on success, false on fail, null on error
     */
    this.updateFiles = file => {
      // set new file
      if ( file instanceof Blob ) { return addFile(file) }
      // remove file(s)
      if ( file instanceof Array && file.length ) { return removeFiles(file) }
      // something went wrong
      return null
    }

    /**
     * Clear all data from inputs.
     * @argument {none} none - accepts no arguments
     * @returns {boolean} true:false
     */
    this.clearAll = () => {
      let cleared = false
      if ( this.input.length ) {
        this.input = ''
        cleared = true
      }
      if ( this.files.length ) {
        this.files = []
        cleared = true
      }
      // display toast with results
      if ( cleared ) { toastSvc.show({ 'text': 'All data removed', 'class': '' }) }
      else { toastSvc.show({ 'text': 'No data to remove', 'class': '' }) }
      return cleared ? true : false
    }
  }

  /* inject controller dependencies */
  Controller.$inject = ['Data', 'Menu', 'Toaster']

  /* register component to our module */
  angular
    .module('findDuplicates')
    .component('findDuplicates', {
      controller: Controller,
      templateUrl: 'find-duplicates/find-duplicates.template.html'
    })
})(window.angular)
