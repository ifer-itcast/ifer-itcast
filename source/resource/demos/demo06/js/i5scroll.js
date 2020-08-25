~(function ($, window, document, undefined) {
    class Scroll {
        constructor(eles, opts) {
            this.$eles = eles;
            opts = opts || {};
            this.defaults = {
                speed: 'normal'
            };
            this.options = $.extend(true, {}, this.defaults, opts);
            this.options.speed = this.handleSpeed(this.options.speed);
            this.init();
        }
        init() {
            this.handleEve();
        }
        handleSpeed(sp) {
            switch (sp) {
                case 'slow':
                    return 50;
                case 'normal':
                    return 30;
                case 'fast':
                    return 15;
            }
        }
        handleEve() {
            const _this = this;
            this.$eles.each(function (i, domEle) {
                _this.cloneNode(domEle);
                _this.initValue(domEle);
                _this.wrapDiv(domEle);
                _this.move(domEle);
                _this.handleHover(domEle);
            });
        }
        cloneNode(ele) {
            $(ele).children().clone().appendTo($(ele));
        }
        initValue(ele) {
            ele.num = 0;
            const o = $(ele).parents(":hidden").eq($(ele).parents(":hidden").length - 1);
            o.css({
                display: 'block'
            });
            // ele.h = parseInt($(ele).outerHeight(true) / 2);
            // To prevent the father setting display: flex; from affecting the height of the child element
            let sum = 0;
            $(ele).children().each(function (i, item) {
                sum += $(item).outerHeight(true);
            });
            ele.h = sum / 2;
            o.css({
                display: 'none'
            });
        }
        wrapDiv(ele) {
            $(ele).wrap($(`<div style="height: ${ele.h}px; overflow: hidden;">`));
        }
        move(ele) {
            clearInterval(ele.timer);
            ele.timer = setInterval(() => {
                if (Math.abs(ele.num) === ele.h) {
                    ele.num = 0;
                } else {
                    $(ele).css('transform', 'translateY(' + ele.num + 'px)');
                }
                ele.num--;
            }, this.options.speed);
        }
        handleHover(ele) {
            const _this = this;
            $(ele).hover(function () {
                clearInterval(ele.timer);
            }, function () {
                _this.move(ele);
            });
        }
    }
    $.fn.i5Scroll = function (options) {
        new Scroll(this, options);
    };
})(jQuery, window, document);