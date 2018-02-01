(function (angular) {
  'use strict';

  /* create directive */
  function DropZone($document) {
    let link = (scope, element, attrs) => {
        // prevent browser from hijacking drag'n'drop
        $document.on('dragover', event => {
          if (!event.target.attributes['drop-zone']) {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'none';
          }
        });
        $document.on('drop', event => {
          event.stopPropagation();
          event.preventDefault();
        });
        // add styles on hover
        element.on('dragover', event => {
          //
        });
        element.on('drop', event => {
          scope.drop(event.dataTransfer);
          scope.$apply();
        });
        // cleanup after drag'n'drop ends
        element.on('dragend', event => {
          event.dataTransfer.clearData();
        });
      },
      Directive = {
        'restrict': 'A',
        'scope': {
          'drop': '<doDrop'
        },
        'link': link
      };
    return Directive;
  }

  /* inject dependencies */
  DropZone.$inject = ['$document'];

  /* register directive to our module */
  angular
    .module('core.dragDrop')
    .directive('dropZone', DropZone);
}(window.angular));
