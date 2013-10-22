/**
 * Saber UI
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * @file 按钮控件
 * @author zfkun(zfkun@msn.com)
 */

define( function ( require ) {

    var ui = require( 'saber-ui' );
    var Lang = require( 'saber-lang' );
    var DOM = require( 'saber-dom' );
    var Control = require( 'saber-control' );

    /**
     * 按钮控件
     * 
     * @extends module:Control
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
         * @type {string}
         * @private
         */
        type: 'Button',

        init: function() {
            if ( !this.onClick ) {
                this.main.addEventListener(
                    'click',
                    this.onClick = this.emit.bind( this, 'click' )
                );
            }
        },

        /**
         * 创建控件主元素
         * 
         * @param {Object} options 构造函数传入的配置参数
         * @return {HTMLElement}
         * @override
         */
        createMain: function() {
            return document.createElement('BUTTON');
        },

        /**
         * 重新渲染视图
         * 
         * 首次渲染时, 不传入 changes 参数
         * @param {Object=} changes 变更过的属性的集合
         * @override
         */
        repaint: function( changes ) {
            // if ( !this.rendered ) return;
            var main = this.main;

            // 首次渲染时, changes 不传入
            // 非首次渲染, changes 必须传入
            // see `Button#render` and `Control#setProperties`
            if ( !changes ) {
                if ( this.hasOwnProperty( 'height' ) ) {
                    DOM.setStyle( 'height', this.height );
                    DOM.setStyle( 'lineHeight', this.height );
                }

                if ( this.hasOwnProperty( 'width' ) ) {
                    DOM.setStyle( 'width', this.width );
                }

                main.innerHTML = this.content;

                return;
            }
            else {
                Control.prototype.repaint.call( this, changes );

                if ( changes.hasOwnProperty( 'height' ) ) {
                    DOM.setStyle( 'height', this.height );
                    DOM.setStyle( 'lineHeight', this.height );
                }

                if ( changes.hasOwnProperty( 'width' ) ) {
                    DOM.setStyle( 'width', this.width );
                }

                if ( changes.hasOwnProperty( 'content' ) ) {
                    main.innerHTML = this.content;
                }
            }
        },

        /**
         * 设置内容
         *
         * @param {string} content 要设置的内容.
         * @public
         */
        setContent: function ( content ) {
            this.setProperties({ 'content': content });
        }

    };

    Lang.inherits( Button, Control );

    ui.register( Button );

    return Button;
});
