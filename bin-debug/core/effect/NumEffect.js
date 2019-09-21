var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跳动数字
 * @author  fany
 *
 */
var NumEffect = (function () {
    function NumEffect(txt, result, cb) {
        this.txt = null;
        this.result = 0;
        this.txt = txt;
        this.result = result;
        this.cb = cb;
        this.tweenNum();
    }
    Object.defineProperty(NumEffect.prototype, "num", {
        get: function () {
            var n = "";
            if (this.txt) {
                n = this.txt.text;
            }
            return QuickManage.moneyStr2number(n);
        },
        set: function (value) {
            if (this.txt) {
                this.txt.text = QuickManage.moneyStr(Math.ceil(value));
            }
            if (value == this.result) {
                if (this.cb) {
                    this.cb();
                }
                this.dispose();
            }
        },
        enumerable: true,
        configurable: true
    });
    NumEffect.prototype.tweenNum = function () {
        egret.Tween.get(this).to({ num: this.result }, 1000);
    };
    NumEffect.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this.txt = null;
        this.result = 0;
        this.cb = null;
    };
    return NumEffect;
}());
__reflect(NumEffect.prototype, "NumEffect");
