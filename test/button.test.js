define(function() {

    var Button = require( 'saber-button' );

    describe( 'Button', function() {
        
        describe( 'Public API' , function() {

            it( '`new`', function () {
                var b = new Button({ content: 'b1' });
                expect( b instanceof Button ).toBeTruthy();
            });

            it( '`get`', function () {
                var b = new Button({
                    content: '.main',
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
                    content: '.main',
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
                var b = new Button({ content: '.appendTo' });
                var wrap = document.querySelector( '#demo' );
                b.appendTo( wrap );

                expect(
                    wrap.contains( b.get( 'main' ) )
                    && wrap.lastChild === b.get( 'main' )
                ).toBeTruthy();
            });

            it( '`insertBefore`', function () {
                var b = new Button({ content: '.insertBefore' });
                var wrap = document.querySelector( '#demo' );
                b.insertBefore( wrap.firstChild );

                expect(
                    wrap.contains( b.get( 'main' ) )
                    && wrap.firstChild === b.get( 'main' )
                ).toBeTruthy();
            });

            it( '`enable`', function () {
                var b = new Button( { content: 'test' } );
                b.enable();

                expect( b.isDisabled() ).toEqual( false );
                expect( !!b.disabled ).toEqual( false );
                expect( !!b.get( 'disabled' ) ).toEqual( false );
                expect( b.hasState( 'disabled' ) ).toEqual( false );
            });

            it( '`disable`', function () {
                var b = new Button( { content: 'test' } );
                b.disable();

                expect( b.isDisabled() ).toBeTruthy();
                expect( b.disabled ).toBeTruthy();
                expect( b.get( 'disabled' ) ).toBeTruthy();
                expect( b.hasState( 'disabled' ) ).toBeTruthy();
            });

            it( '`show`', function () {
                var b = new Button( { content: 'test' } );
                b.show();

                expect( b.isHidden() ).toEqual( false );
                expect( !!b.hidden ).toEqual( false );
                expect( !!b.get( 'hidden' ) ).toEqual( false );
                expect( b.hasState( 'hidden' ) ).toEqual( false );
            });

            it( '`hide`', function () {
                var b = new Button( { content: 'test' } );
                b.hide();

                expect( b.isHidden() ).toBeTruthy();
                expect( b.hidden ).toBeTruthy();
                expect( b.get( 'hidden' ) ).toBeTruthy();
                expect( b.hasState( 'hidden' ) ).toBeTruthy();
            });

        });
    });

});
