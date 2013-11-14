define(function() {

    var ui = require( 'saber-ui' );
    var Button = require( 'saber-button' );
    var container = document.getElementById( 'demo' );
    var getText = function( node ) {
        return node.textContent || node.innerText;
    };

    describe( 'Button', function () {

        it('should be a constructor', function () {
            expect( typeof Button ).toEqual( 'function' );
        });

        it('should be instantiable', function () {
            var b = new Button();
            expect( typeof b ).toEqual( 'object' );
            expect( b instanceof Button ).toBeTruthy();
        });

        describe( 'create via script', function () {
            it(
                'should create a `<button>` element as its main element',
                function () {
                    var button = new Button();
                    button.appendTo( container );
                    expect(
                        container.querySelectorAll( 'button' ).length
                    ).toBeGreaterThan( 0 );
                }
            );
        });


        describe('created via HTML', function () {

            var button;
            beforeEach(function () {
                var html = '<div data-ui="type: Button;id: test;">Test Button <span>123</span></div>';
                container.innerHTML = html;
                ui.init( container );
                button = ui.get( 'test' );
            });

            it('should be able to create from HTML', function () {
                expect( button ).toBeDefined();
            });

            it('should read `content` from HTML element', function () {
                expect( button.get( 'content' ) ).toBe( 'Test Button <span>123</span>' );
            });

        });
        
        describe( 'public api' , function () {

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
                b.appendTo( container );

                expect(
                    container.contains( b.get( 'main' ) )
                    && container.lastChild === b.get( 'main' )
                ).toBeTruthy();
            });

            it( '`insertBefore`', function () {
                var b = new Button( { content: '.insertBefore' } );
                b.insertBefore( container.firstChild );

                expect(
                    container.contains( b.get( 'main' ) )
                    && container.firstChild === b.get( 'main' )
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
                b.appendTo( container );

                expect( b.content ).toEqual( 'customText' );
                expect( b.get( 'content' ) ).toEqual( 'customText' );
                expect( getText( b.main ) ).toEqual( 'customText' );
            });

        });

        describe( 'event api', function () {
            var events = {};
            var handler = function ( ev ) {
                events[ ev.type ] = arguments.length > 1
                    ? [].slice.call( arguments, 1 )
                    : true;
            };

            var b = new Button({
                content: '.events',
                
                // way 1
                onBeforeinit: handler,
                onInit: handler,
                onAfterinit: handler,
                onBeforerender: handler,
                onAfterrender: handler
            });

            // way 2
            b.on( 'beforedispose', handler )
            .on( 'afterdispose', handler )
            .on( 'show', handler )
            .on( 'click', handler )
            .on( 'propertychange', handler );

            // way 3
            b.onhide = handler;
            b.onenable = handler;
            b.ondisable = handler;


            b.appendTo( container );
            b.main.click();
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

    });

});
