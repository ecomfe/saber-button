define(function() {

    var ui = require( 'saber-ui' );
    var Button = require( 'saber-button' );
    var task = require( 'performance.test' );
    var $ = function( s ) { return document.querySelector( s ); };

    var wrapper = $( '#setupWrapper' );
    var outputer = $( '#outputer [data-for="saber"]' );

    describe( 'Button - Saber', function () {

        task({
            ui: ui,
            Button: Button,
            wrapper: wrapper,
            outputer: outputer
        });

    });

});
