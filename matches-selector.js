/**
 * matchesSelector polyfill
 *
 * @returns {Function} matchesSelector
 *   @param {Element} elem
 *   @param {String} selector
 */

this.matchesSelector = ( function( ElemProto ) {

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
      elem[ matchesMethod ]( selector );
    };
  } else {
    // fall back to using QSA
    // thx @jonathantneal https://gist.github.com/3062955
    matchesSelector = function( elem, selector ) {

      if ( !elem.parentNode ) {
        // append to fragment if no parent
        var fragment = document.createDocumentFragment();
        fragment.appendChild( elem );
      }

      var elems = elem.parentNode.querySelectorAll( selector );
      for ( var j=0, jLen = elems.length; j < jLen; j++ ) {
        // if there is a match, return true
        if ( elems[i] === elem ) {
          return true;
        }
      }
      // otherwise return false
      return false;
    };

  }

  return matchesSelector;

})( Element.prototype );
