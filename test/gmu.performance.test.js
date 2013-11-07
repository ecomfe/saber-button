define(function() {

    var ui = {};
    var Button = gmu.Button;
    var task = require( 'performance.test' );

    var wrapper = $( '#setupWrapper' )[0];
    var outputer = $( '#outputer [data-for="gmu"]' )[0];

    // api compatible 
    ui.init = function ( container ) {
        // return [].slice.call(
        //     container.querySelectorAll( '[data-ui]' )
        // ).map(function ( node ) {
        //     return new Button( node );
        // });

        // return $('.btn').button();

        return $( '[data-ui]', container ).map(function() {
            return new Button( this );
        });
    };
    Button.prototype.dispose = Button.prototype.destroy;

    describe( 'Button - GMU', function () {

        task({
            ui: ui,
            Button: Button,
            wrapper: wrapper,
            outputer: outputer,
            key: 'gmu'
        });

    });


});
