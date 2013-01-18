# matchesSelector helper

[`matchesSelector`](https://developer.mozilla.org/en-US/docs/DOM/Element.mozMatchesSelector) is pretty hot, but has [vendor-prefix baggage](http://caniuse.com/#search=matchesSelector). This helper function takes care of that, without augmenting `Element.prototype`.

``` js
matchesSelector( elem, selector );

matchesSelector( myElem, 'div.my-hawt-selector' );

// this DOES NOT polyfill myElem.matchesSelector
```
