/**
 * matchesSelector helper v0.2.0
 *
 * @augments {Object} this - global object
 * @name matchesSelector
 *   @param {Element} elem
 *   @param {String} selector
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( global, ElemProto ) {

  'use strict';

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

  // ----- match ----- //

  function match( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  }


  // ----- appendToFragment ----- //

  function appendToFragment( elem ) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild( elem );
  }

  // ----- query ----- //

  // fall back to using QSA
  // thx @jonathantneal https://gist.github.com/3062955
  function query( elem, selector ) {
    // append to fragment if no parent
    if ( !elem.parentNode ) {
      appendToFragment( elem );
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
  }

  // ----- matchChild ----- //

  function matchChild( elem, selector ) {
    if ( !elem.parentNode ) {
      appendToFragment( elem );
    }
    return match( elem, selector );
  }

  // ----- matchesSelector ----- //

  var matchesSelector;

  if ( matchesMethod ) {
    // IE9 supports matchesSelector, but doesn't work on orphaned elems
    // check for that
    var div = document.createElement('div');
    var supportsOrphans = match( div, 'div' );
    matchesSelector = supportsOrphans ? match : matchChild;
  } else {
    matchesSelector = query;
  }

  // add to global namespace
  global.matchesSelector = matchesSelector;

})( this, Element.prototype );
