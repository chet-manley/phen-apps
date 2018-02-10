(angular => {
  'use strict'

  /* define controller */
  function Controller (dialogSvc, $compile, $element, $scope) {
    /* constructor */
    this.$onInit = () => {
      // get requested dialog
      this.locked = this.dialog.locked

      // close action handler
      this.close = dialogSvc.close

      // replace dialog content
      this.replaceContent = template => {
        // compile new content template
        let compiled = $compile(template)($scope.$new(true))
        // empty current content and append new
        $element.find('md-dialog-content').empty().append(compiled)
      }

      // apply this dialog's content
      this.replaceContent(this.dialog.template)
    }
    /* deconstructor */
    this.$onDestroy = () => {
      //
    }
  }

  /* inject controller dependencies */
  Controller.$inject = ['Dialog', '$compile', '$element', '$scope']

  /* register component to our module */
  angular
    .module('core.dialog')
    .controller('phenDialogController', Controller)
})(window.angular)
