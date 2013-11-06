/**
 * Saber UI
 * Copyright 2013 Baidu Inc. All rights reserved.
 * 
 * @file 按钮控件
 * @author zfkun(zfkun@msn.com)
 */

define(function ( require ) {

    var lang = require( 'saber-lang' );
    var dom = require( 'saber-dom' );
    var Control = require( 'saber-control' );
    var helper = require( 'saber-control/helper' );
    var component = require( 'saber-ui/component' );

    /**
     * 按钮控件
     * 
     * @constructor
     * @exports Button
     * @class
     * @extends Control
     * @requires saber-lang
     * @requires saber-dom
     * @requires saber-control
     * @requires saber-control/helper
     * @requires saber-ui/component
     * @fires Button#click
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

        /**
         * 按钮显示文字
         * 
         * @private
         * @type {string}
         * @default ''
         */
        content: '',

        init: function ( options ) {
            var me = this;

            helper.addDOMEvent(
                this,
                this.main,
                'click',
                function ( event ) {
                    if ( !me.isDisabled() && !me.isHidden() ) {
                        /**
                         * @event Button#click
                         * @param {Object} ev 事件参数对象
                         * @param {string} ev.type 事件类型
                         * @param {Control} ev.target 触发事件的控件对象
                         * @param {Object} event MouseEvent对象
                         */
                        me.emit( 'click', event );
                    }
                }
            );


            var properties = lang.extend( {
                content: this.content
            }, options );


            var innerDiv = this.main.firstChild;
            if ( !properties.content 
                && innerDiv 
                && innerDiv.nodeName.toLowerCase() !== 'div'
            ) {
                properties.content = this.main.innerHTML;
            }

            this.setProperties( properties );
        },

        /**
         * 创建控件主元素
         * 
         * @override
         * @return {HTMLElement}
         */
        createMain: function () {
            return document.createElement( 'BUTTON' );
        },

        /**
         * 重新渲染视图
         * 首次渲染时, 不传入 changes 参数
         * 
         * @override
         * @param {Object=} changes 变更过的属性的集合
         */
        repaint: function ( changes ) {
            var main = this.main;

            // 首次渲染时, changes 不传入. see `Control#render`
            // 非首次渲染, changes 必传入. see `Control#setProperties`
            // 这里做下处理节约代码量
            changes = changes || this;

            if ( changes.hasOwnProperty( 'height' ) ) {
                dom.setStyle( main, 'height', this.height );
                // dom.setStyle( main, 'lineHeight', this.height );
            }

            if ( changes.hasOwnProperty( 'width' ) ) {
                dom.setStyle( main, 'width', this.width );
            }

            if ( changes.hasOwnProperty( 'content' ) ) {
                main.innerHTML = this.content;
            }

            // 父类方法最后调用处理
            Control.prototype.repaint.call( this, changes );
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

    component.register( Button );

    return Button;

});
