define(function() {

    var ui = require( 'esui' );
    var Button = require( 'esui/button' );
    var task = require( 'performance.test' );
    var $ = function( s ) { return document.querySelector( s ); };

    var wrapper = $( '#setupWrapper' );
    var outputer = $( '#outputer [data-for="esui"]' );

    describe( 'Button - ESUI', function () {

        task({
            ui: ui,
            Button: Button,
            wrapper: wrapper,
            outputer: outputer
        });

    });

});
