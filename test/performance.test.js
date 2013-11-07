define(function() {


    return function ( options ) {
        var ui = options.ui;
        var Button = options.Button;
        var wrapper = options.wrapper;
        var outputer = options.outputer;

        describe( 'created via HTML', function () {
            // buttons.length := Math.pow( 2, POWER )
            var POWER = options.power || 9;
            var EXPECT_TIME = options.expectTime || 1000; // ms
            var logs = []; // logs of result
            var buttons = []; // instances of Button

            // AOP
            afterEach(function () {
                // dispose all buttons & empty wrapper
                buttons.forEach(function ( button ) {
                    button.dispose && button.dispose();
                });
                buttons = [];
                wrapper.innerHTML = '';

                // output result stat
                var log = logs[ logs.length - 1 ];
                outputer.innerHTML += ''
                    + '<li>'
                    + log.size + ' : ' + log.time + '<i>ms</i>'
                    + '</li>';
            });


            function doTask( html, power ) {
                html = html || '';
                power = power || 0;

                while ( power-- > 0 ) {
                    html += html;
                }
                wrapper.innerHTML = html;

                var time = Date.now();
                buttons = ui.init( wrapper );
                time = Date.now() - time;
                
                logs.push({
                    size: buttons.length,
                    time: time
                });

                return logs[ logs.length - 1 ];
            }


            it( 'basic structure HTML', function () {
                var html = '<div '
                    + ' data-ui=" '
                        + 'type:Button;'
                    + ' " '
                    + '>test</div>';
                var log = doTask( html, POWER );

                expect( log.time ).toBeLessThan( EXPECT_TIME );
            });

            it('basic structure HTML with `skin` option', function () {
                var html = '<div '
                    + ' data-ui=" '
                        + 'type:Button;'
                        + 'skin:winter;'
                    + ' " '
                    + '>test</div>';
                var log = doTask( html, POWER );

                expect( log.time ).toBeLessThan( EXPECT_TIME );
            });

            it('basic structure HTML with `content` option', function () {
                var html = '<div '
                    + ' data-ui=" '
                        + 'type:Button;'
                        + 'content:newcontent;'
                    + ' " '
                    + '>test</div>';
                var log = doTask( html, POWER );

                expect( log.time ).toBeLessThan( EXPECT_TIME );
            });

            it('basic structure HTML with `skin` and `content` option', function () {
                var html = '<div '
                    + ' data-ui=" '
                        + 'type:Button;'
                        + 'skin:winter;'
                        + 'content:newcontent;'
                    + ' " '
                    + '>test</div>';
                var log = doTask( html, POWER );

                expect( log.time ).toBeLessThan( EXPECT_TIME );
            });

            it('basic structure HTML with more options', function () {
                var html = '<div '
                    + ' data-ui=" '
                        + 'type:Button;'
                        + 'skin:winter;'
                        + 'width:100px;'
                        + 'height:100px;'
                        + 'disabel:true;'
                        + 'hidden:true;'
                        + 'content:newcontent;'
                    + ' " '
                    + '>test</div>';
                var log = doTask( html, POWER );

                expect( log.time ).toBeLessThan( EXPECT_TIME );
            });

            it('basic structure HTML with more options and custom attribute/class', function () {
                var html = '<div '
                    + ' class="a b c d e" '
                    + ' data-myattr="test" '
                    + ' data-ui=" '
                        + 'type:Button;'
                        + 'skin:winter;'
                        + 'width:100px;'
                        + 'height:100px;'
                        + 'disabel:true;'
                        + 'hidden:true;'
                        + 'content:newcontent;'
                    + ' " '
                    + '>test</div>';
                var log = doTask( html, POWER );

                expect( log.time ).toBeLessThan( EXPECT_TIME );
            });

        });

    };

});
