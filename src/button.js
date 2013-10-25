/**
 * Saber UI
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * @file 按钮控件
 * @author zfkun(zfkun@msn.com)
 */

define(function ( require ) {

    var ui = require( 'saber-ui' );
    var lang = require( 'saber-lang' );
    var dom = require( 'saber-dom' );
    var Control = require( 'saber-control' );

    /**
     * 按钮控件
     * 
     * @extends module:Control
     * @requires ui
     * @requires lang
     * @requires dom
     * @requires Control
     * @exports Button
     */
    var Button = function() {
        Control.apply( this, arguments );
    };

    Button.prototype = {

        /**
         * 控件类型标识
         * 
         * @private
         * @type {string}
         */
        type: 'Button',

        init: function () {
            var me = this;
            me.addDOMEvent(
                me.main,
                'click',
                function ( ev ) {
                    if ( !me.isDisabled() && !me.isHidden() ) {
                        me.emit.call( me, 'click', ev );
                    }
                }
            );
        },

        // /**
        //  * 销毁控件
        //  * 
        //  * @override
        //  */
        // dispose: function () {
        //     // 调用父类清理先
        //     Control.prototype.dispose.call( this );

        //     // 清理Button类相关DOM事件
        //     var fn = this.onClick;
        //     if ( fn ) {
        //         this.main.removeEventListener( 'click', fn );
        //         fn = this.onClick = null;
        //         delete this.onClick;
        //     }
        // },

        /**
         * 创建控件主元素
         * 
         * @override
         * @param {Object} options 构造函数传入的配置参数
         * @return {HTMLElement}
         */
        createMain: function() {
            return document.createElement('BUTTON');
        },

        /**
         * 重新渲染视图
         * 首次渲染时, 不传入 changes 参数
         * 
         * @override
         * @param {Object=} changes 变更过的属性的集合
         */
        repaint: function( changes ) {
            // if ( !this.rendered ) return;
            var main = this.main;

            // 首次渲染时, changes 不传入
            // 非首次渲染, changes 必须传入
            // see `Button#render` and `Control#setProperties`
            if ( !changes ) {
                if ( this.hasOwnProperty( 'height' ) ) {
                    dom.setStyle( 'height', this.height );
                    dom.setStyle( 'lineHeight', this.height );
                }

                if ( this.hasOwnProperty( 'width' ) ) {
                    dom.setStyle( 'width', this.width );
                }

                main.innerHTML = this.content;

                return;
            }
            else {
                Control.prototype.repaint.call( this, changes );

                if ( changes.hasOwnProperty( 'height' ) ) {
                    dom.setStyle( 'height', this.height );
                    dom.setStyle( 'lineHeight', this.height );
                }

                if ( changes.hasOwnProperty( 'width' ) ) {
                    dom.setStyle( 'width', this.width );
                }

                if ( changes.hasOwnProperty( 'content' ) ) {
                    main.innerHTML = this.content;
                }
            }
        },

        /**
         * 设置按钮内容
         * 
         * @public
         * @param {string} content 要设置的按钮内容
         */
        setContent: function ( content ) {
            this.setProperties( { 'content': content } );
        }

    };

    lang.inherits( Button, Control );

    ui.register( Button );

    return Button;

});
