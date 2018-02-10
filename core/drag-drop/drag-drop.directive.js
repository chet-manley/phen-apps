(angular => {
  'use strict'

  /* define directive */
  function DropZone($document) {
    const link = (scope, element) => {
            // app content element
            const content = angular.element(document.querySelector('body > md-content'))

            // TODO move this out of link
            scope.$ctrl.cancelDrop = () => {
              element.parent().removeClass('drop-in-progress')
              element.removeClass('over-target')
            }

            // flip drop zone over to expose target
            content.on('dragstart', event => {
              event.dataTransfer.dropEffect = 'none'
              element.parent().addClass('drop-in-progress')
            })
            content.on('dragenter', event => {
              event.dataTransfer.dropEffect = 'none'
              element.parent().addClass('drop-in-progress')
            })
            // prevent browser from hijacking drops
            $document.on('dragover', event => {
              if ( !event.target.classList.contains('drop-target') ) {
                event.preventDefault()
                event.dataTransfer.dropEffect = 'none'
              }
            })

            // add styles on hover
            element.on('dragenter', event => {
              event.preventDefault()
              event.dataTransfer.dropEffect = 'copy'
              element.addClass('over-target')
            })
            // prevent defaults while hovering
            element.on('dragover', event => {
              event.preventDefault()
              event.dataTransfer.dropEffect = 'copy'
            })
            // remove styles on hover exit
            element.on('dragleave', event => {
              event.dataTransfer.dropEffect = 'none'
              element.removeClass('over-target')
            })
            // the drop catcher
            element.on('drop', event => {
              event.preventDefault()
              scope.$ctrl.drop(event.dataTransfer)
              scope.$apply()
              // flip drop zone back over
              element.parent().removeClass('drop-in-progress')
              element.removeClass('over-target')
            })
            // cleanup after drag'n'drop ends
            element.on('dragend', event => {
              event.dataTransfer.clearData()
            })
          },
          Directive = {
            'restrict': 'A',
            'scope': {
              'addFiles': '&',
              'updateInput': '=',
            },
            'bindToController': true,
            'controller'      : 'dropZoneController',
            'controllerAs'    : '$ctrl',
            'link'            : link,
            'templateUrl'     : 'core/drag-drop/drag-drop.template.html',
          }
    return Directive
  }

  /* inject dependencies */
  DropZone.$inject = ['$document']

  /* register directive to our module */
  angular
    .module('core.dragDrop')
    .directive('dropZone', DropZone)
})(window.angular)
