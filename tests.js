test( 'matchesSelector', function() {

  equal( typeof matchesSelector, 'function', 'typeof is function' );

  var alpha = document.getElementById('alpha');

  equal( matchesSelector( alpha, '#alpha' ), true, '[#alpha] matches #alpha' );
  equal( matchesSelector( alpha, '.item' ), true, '[#alpha] matches .item' );
  equal( matchesSelector( alpha, 'div' ), true, '[#alpha] matches div' );

});
