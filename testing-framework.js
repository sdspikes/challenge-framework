var parser = require('esprima');
var _ = require('underscore');


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
}

module.exports = {

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
  whitelist: function(code, requiredFunctionalityList) {
    var parsedCode = parser.parse(code);

    return _.every(requiredFunctionalityList, function (functionality) {
      return containsFunctionality(parsedCode, functionality);
    });
  },
}
