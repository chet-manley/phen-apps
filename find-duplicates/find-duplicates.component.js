(angular => {
  'use strict'

  /* create controller */
  function Controller(dataSvc, menuSvc) {
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
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }

    /* TODO
     * toast notifications
     * drag over styles
     * check duplicate files
     * parse files
     */

    this.updateFiles = file => {
      this.files.push(file)
    }
  }

  /* inject controller dependencies */
  Controller.$inject = ['Data', 'Menu']

  /* register component to our module */
  angular
    .module('findDuplicates')
    .component('findDuplicates', {
      controller: Controller,
      templateUrl: 'find-duplicates/find-duplicates.template.html'
    })
})(window.angular)
