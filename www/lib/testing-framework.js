define("testing-framework", ["require", "exports", "esprima", "underscore"],
  function (require, exports, parser, _) {


    function containsFunctionality(tree, functionality) {
      if (tree["type"] === functionality) {
        return true;
      }
      return _.some(tree, function(attrValue) {
        if (_.isArray(attrValue)) {
           return _.some(attrValue, function (subTree) {
             return containsFunctionality(subTree, functionality);
           });
        }
      });
    };

    function containsFunctionalityStructure(tree, functionalityStructure) {
      if (tree["type"] === functionalityStructure["type"]) {
        // If the top level ones match and the required structure doesn't have
        // any levels left, we're done!
        if (!_.has(functionalityStructure, "body")) {
          return true;
        }
        // but if there are still levels left, we need to check everything under us
        // for the rest of the structure.
        else {
          structure = functionalityStructure["body"];
        }
      }
      return _.some(tree, function(attrValue, key) {
        return _.some(structure, function (subStructure) {

          if (!_.isArray(attrValue) && _.isObject(attrValue)) {
            return containsFunctionalityStructure(attrValue, subStructure);
          }
          else if (_.isArray(attrValue)) {
            return _.some(attrValue, function (subTree) {
              return containsFunctionalityStructure(subTree, subStructure);
            });
          }
        });
      });
    };

    /**
     * Checks whether a snippet of javascript code contains all required bits of
     * functionality.
     *
     * @param  {string}   code                      The snippet of code to check
     * @param  {string[]} requiredFunctionalityList List of required statement
     *                                              types.
     * @return {boolean}                            Whether or not they are all
     *                                              present.
     */
    exports.whitelist = function(code, requiredFunctionalityList) {
      var parsedCode = parser.parse(code);

      return _.every(requiredFunctionalityList, function (functionality) {
        return containsFunctionality(parsedCode, functionality);
      });
    };

    /**
     * Checks whether a snippet of javascript code contains none of the unwanted
     * bits of functionality.
     *
     * @param  {string}   code                      The snippet of code to check
     * @param  {string[]} requiredFunctionalityList List of bad statement types.
     * @return {boolean}                            Whether or not they are all
     *                                              absent.
     */
    exports.blacklist = function(code, requiredFunctionalityList) {
      var parsedCode = parser.parse(code);

      return _.every(requiredFunctionalityList, function (functionality) {
        return !containsFunctionality(parsedCode, functionality);
      });
    };

    /**
     * Checks whether a snippet of javascript has the desired structure.
     *
     * The structure passed in must be of the form
     * [{
     * 	 "type" : "outermostfunctionality"
     * 	 "body" : [{ "type" : "second level funcitonality", "body": ...}, ...]
     * }, ...]
     *
     * @param {string} code              The code to check.
     * @param {object} requiredStructure The structure to compare against.
     */
    exports.hasStructure = function(code, requiredStructure) {
      if (_.isEmpty(requiredStructure)) { return true; }
      var parsedCode = parser.parse(code);

      return containsFunctionalityStructure(parsedCode, requiredStructure);
    };
  }
);
