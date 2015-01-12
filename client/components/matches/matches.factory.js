(function() {
  'use strict';

  angular.module('matchesFactory', [])
    .factory('makeMatches', makeMatches);

    function makeMatches() {

      function getMatchHTML(string, regex) {
        var match,
            indexes,
            added = 0,
            matches = {};

        // The nature of .exec() requires that a while loop not be used unless the global tag is present
        if (regex.global) {
          while (match = regex.exec(string)) {
            matches[match.index] = match[0];
          }
        } else {
           if (match = regex.exec(string)) {
             matches[match.index] = match[0];
           }
        };

        // indexes must be sorted in ascending order
        indexes = Object.keys(matches).sort(function(a,b){ return a-b });

        // loop through indexes and wrap matches in span tags
        string = string.split('');

        for (var i = 0; i < indexes.length; i++ ) {
          string.splice(parseInt(indexes[i])+added, 0, '<span class="hilight">') + string;
          string.splice(parseInt(indexes[i])+matches[indexes[i]].length+added+1, 0, '</span>') + string;
          added += 2;
        }

        return string.join('');
      }


      return {
        getMatchHTML: getMatchHTML
      };
    }

})();