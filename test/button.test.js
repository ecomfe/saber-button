define(function() {

    var lang = require( 'saber-lang' );
    var Button = require( 'saber-button' );

    describe( 'Button', function () {
        
        describe( 'Public API' , function () {

            it( '`new`', function () {
                var b = new Button( { content: 'new' } );
                expect( b instanceof Button ).toBeTruthy();
            });

            it( '`get`', function () {
                var b = new Button({
                    content: '.get',
                    foo: 'foo',
                    bar: [1, 2, 3]
                });
                b.set( 'saber', 'yes' );
                expect( b.get( 'id' ) ).toEqual( b.id );
                expect( b.get( 'main' ) ).toEqual( b.main );
                expect( b.get( 'disabled' ) ).toEqual( b.disabled );
                expect( b.get( 'hidden' ) ).toEqual( b.hidden );
                expect( b.get( 'options' ) ).toEqual( b.options );
                expect( b.get( 'content' ) ).toEqual( b.content );
                expect(
                    b.foo === b.options.foo && b.get( 'foo' ) === b.foo
                ).toBeTruthy();
                expect(
                    b.bar === b.options.bar && b.get( 'bar' ) === b.bar
                ).toBeTruthy();
                expect( b.get( 'saber' ) === 'yes' ).toBeTruthy();
            });

            it( '`set`', function () {
                var b = new Button({
                    content: '.set',
                    foo: 'foo',
                    bar: [1, 2, 3]
                });
                var bar = { x: 'y' };
                b.set( 'foo', 'bar' );
                b.set( 'bar', bar );
                b.set( 'saber', 'yes' );

                expect( b.get( 'foo' ) ).toEqual( 'bar' );
                expect( b.get( 'bar' ) ).toEqual( bar );
                expect( b.get( 'saber' ) ).toEqual( 'yes' );
            });

            it( '`appendTo`', function () {
                var b = new Button( { content: '.appendTo' } );
                var wrap = document.querySelector( '#demo' );
                b.appendTo( wrap );

                expect(
                    wrap.contains( b.get( 'main' ) )
                    && wrap.lastChild === b.get( 'main' )
                ).toBeTruthy();
            });

            it( '`insertBefore`', function () {
                var b = new Button( { content: '.insertBefore' } );
                var wrap = document.querySelector( '#demo' );
                b.insertBefore( wrap.firstChild );

                expect(
                    wrap.contains( b.get( 'main' ) )
                    && wrap.firstChild === b.get( 'main' )
                ).toBeTruthy();
            });

            it( '`enable`', function () {
                var b = new Button( { content: '.enable' } );
                b.enable();

                expect( b.isDisabled() ).toEqual( false );
                expect( !!b.disabled ).toEqual( false );
                expect( !!b.get( 'disabled' ) ).toEqual( false );
                expect( b.hasState( 'disabled' ) ).toEqual( false );
            });

            it( '`disable`', function () {
                var b = new Button( { content: '.disable' } );
                b.disable();

                expect( b.isDisabled() ).toBeTruthy();
                expect( b.disabled ).toBeTruthy();
                expect( b.get( 'disabled' ) ).toBeTruthy();
                expect( b.hasState( 'disabled' ) ).toBeTruthy();
            });

            it( '`show`', function () {
                var b = new Button( { content: '.show' } );
                b.show();

                expect( b.isHidden() ).toEqual( false );
                expect( !!b.hidden ).toEqual( false );
                expect( !!b.get( 'hidden' ) ).toEqual( false );
                expect( b.hasState( 'hidden' ) ).toEqual( false );
            });

            it( '`hide`', function () {
                var b = new Button( { content: '.hide' } );
                b.hide();

                expect( b.isHidden() ).toBeTruthy();
                expect( b.hidden ).toBeTruthy();
                expect( b.get( 'hidden' ) ).toBeTruthy();
                expect( b.hasState( 'hidden' ) ).toBeTruthy();
            });

            it( '`setContent`', function () {
                var b = new Button( { content: '.setContent' } );
                b.setContent( 'customText' );

                expect( b.content ).toEqual( 'customText' );
                expect( b.get( 'content' ) ).toBeTruthy( 'customText' );
            });

        });

        describe( 'Event API', function () {
            var events = {};
            var handler = function ( ev ) {
                events[ ev.type ] = arguments.length > 1
                    ? [].slice.call( arguments, 1 )
                    : true;
            };

            var b = new Button({
                content: '.events',
                onBeforeinit: handler,
                onInit: handler,
                onAfterinit: handler,
                onBeforerender: handler,
                onAfterrender: handler
            });
            b.on( 'beforedispose', handler )
            .on( 'afterdispose', handler )
            .on( 'show', handler )
            .on( 'hide', handler )
            .on( 'enable', handler )
            .on( 'disable', handler )
            .on( 'click', handler )
            .on( 'propertychange', handler );

            b.appendTo( document.querySelector( '#demo' ) );
            b.main.click(); // TODO: touch env
            b.hide();
            b.disable();
            b.show();
            b.enable();
            b.set( 'content', 'new content' );
            b.dispose();


            it( 'beforeinit', function () {
                expect( events.beforeinit ).toBeTruthy();
            });

            it( 'init', function () {
                expect( events.init ).toBeTruthy();
            });

            it( 'afterinit', function () {
                expect( events.afterinit ).toBeTruthy();
            });

            it( 'beforerender', function () {
                expect( events.beforerender ).toBeTruthy();
            });

            it( 'afterrender', function () {
                expect( events.afterrender ).toBeTruthy();
            });

            it( 'beforedispose', function () {
                expect( events.beforedispose ).toBeTruthy();
            });

            it( 'afterdispose', function () {
                expect( events.afterdispose ).toBeTruthy();
            });

            it( 'show', function () {
                expect( events.show ).toBeTruthy();
            });

            it( 'hide', function () {
                expect( events.hide ).toBeTruthy();
            });

            it( 'enable', function () {
                expect( events.enable ).toBeTruthy();
            });

            it( 'disable', function () {
                expect( events.disable ).toBeTruthy();
            });

            it( 'click', function () {
                expect( events.click ).toBeTruthy();
            });

            it( 'propertychange', function () {
                expect(
                    Array.isArray( events.propertychange )
                ).toBeTruthy();
                
                expect( 
                    Object.prototype.toString.call(
                        events.propertychange[0]
                    )
                ).toEqual( '[object Object]' );

                expect(
                    events.propertychange[0].content.name
                ).toEqual( 'content' );
                
                expect(
                    events.propertychange[0].content.oldValue
                ).toEqual( '.events' );

                expect(
                    events.propertychange[0].content.newValue
                ).toEqual( 'new content' );
            });

        });

        describe( 'DOMEvent API', function () {
            var b = new Button( { content: '.addDOMEvent'  } );
            var count = 0;
            var handler = function ( ev ) {
                count++;
            };

            it( '`addDOMEvent`', function () {
                b.addDOMEvent( b.main, 'click', handler );
                b.main.click(); // +1
                expect( count ).toEqual( 1 );
            });

            it( '`removeDOMEvent`', function () {
                b.main.click(); // +1
                b.main.click(); // +1
                b.removeDOMEvent( b.main, 'click', handler );
                b.main.click(); // nothing
                b.main.click(); // nothing
                expect( count ).toEqual( 3 );
            });

            it( '`clearDOMEvents`', function () {
                count = 0;
                b.addDOMEvent( b.main, 'click', handler );
                b.addDOMEvent( b.main, 'click', handler );
                b.addDOMEvent( b.main, 'click', handler );
                b.main.click(); // `capture` is false
                b.clearDOMEvents( b.main );
                b.main.click();
                expect( count ).toEqual( 1 );
            });

        });

    });

});
