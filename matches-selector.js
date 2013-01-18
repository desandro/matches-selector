/**
 * matchesSelector polyfill
 *
 * @augments {Object} this - global object
 * @name matchesSelector
 *   @param {Element} elem
 *   @param {String} selector
 */

( function( global, ElemProto ) {

  var methods = [
    'matchesSelector',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ];

  var matchesMethod;
  for ( var i=0, len = methods.length; i < len; i++ ) {
    var method = methods[i];
    if ( ElemProto[ method ] ) {
      matchesMethod = method;
      break;
    }
  }

  var matchesSelector;

  if ( matchesMethod ) {
    // use native matchesSelector method if available
    matchesSelector = function( elem, selector ) {
      return elem[ matchesMethod ]( selector );
    };
  } else {
    // fall back to using QSA
    // thx @jonathantneal https://gist.github.com/3062955
    matchesSelector = function( elem, selector ) {

      // append to fragment if no parent
      if ( !elem.parentNode ) {
        var fragment = document.createDocumentFragment();
        fragment.appendChild( elem );
      }

      // match elem with all selected elems of parent
      var elems = elem.parentNode.querySelectorAll( selector );
      for ( var j=0, jLen = elems.length; j < jLen; j++ ) {
        // return true if match
        if ( elems[j] === elem ) {
          return true;
        }
      }
      // otherwise return false
      return false;
    };

  }

  // add to global namespace
  global.matchesSelector = matchesSelector;

})( this, Element.prototype );
