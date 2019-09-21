/**
  * 游戏特效汇总
  * by zhaoxin
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 使用方法如：EffectUtils.rotationEffect()
  */
var EffectUtils;
(function (EffectUtils) {
    // 存储旋转对象
    var rotationArr = [];
    function numEffect(obj, num, cb) {
        if (cb === void 0) { cb = null; }
        var n = "";
        if (obj) {
            n = obj.text;
        }
        var nownum = QuickManage.moneyStr2number(n);
        if (nownum == num) {
            return;
        }
        var neffect = new NumEffect(obj, num, cb);
    }
    EffectUtils.numEffect = numEffect;
    //对象旋转特效
    //obj   旋转对象
    //time  旋转一周用时，毫秒
    function rotationEffect(obj, time) {
        if (time === void 0) { time = 1000; }
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        if (this.rotationArr[obj.hashCode]) {
            return;
        }
        if ((this.rotationArr[obj.hashCode] == null) || !this.rotationArr[obj.hashCode]) {
            this.rotationArr[obj.hashCode] = true;
        }
        var onComplete1 = function () {
            if (this.rotationArr[obj.hashCode] && (obj != null)) {
                obj.rotation = 0;
                egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
            }
        };
        obj.rotation = 0;
        egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
    }
    EffectUtils.rotationEffect = rotationEffect;
    //对象闪烁特效- 一直闪烁循环
    //obj         闪烁对象
    //interval    闪烁总工时间
    function blinkEffect(obj, interval) {
        if (interval === void 0) { interval = 1000; }
        var onComplete1 = function () {
            egret.Tween.get(obj).to({ alpha: 0 }, interval).call(onComplete2);
        };
        var onComplete2 = function () {
            egret.Tween.get(obj).to({ alpha: 1 }, interval).call(onComplete1);
        };
        egret.Tween.get(obj).to({ alpha: 0 }, interval).call(onComplete2);
    }
    EffectUtils.blinkEffect = blinkEffect;
    //取消对象旋转
    //obj    旋转对象
    function removeRotationEffect(obj) {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }
    EffectUtils.removeRotationEffect = removeRotationEffect;
    //抖动对象特效
    //类似ios密码输入错误的特效
    function shakeObj(obj) {
        var shakeNum = 80;
        var oldX = obj.x;
        egret.Tween.get(obj).to({ x: obj.x - 10 }, shakeNum);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        }, this, shakeNum * 2);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x - 20 }, shakeNum);
        }, this, shakeNum * 3);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        }, this, shakeNum * 4);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: oldX }, shakeNum);
        }, this, shakeNum * 5);
    }
    EffectUtils.shakeObj = shakeObj;
    //抖动对象特效
    // 1：抖动  2：震动
    function shakeScreen(effectType) {
        if (effectType === void 0) { effectType = 1; }
        var panel = GameConfig.curPanel;
        var shakeNum = 40;
        var oldX = panel.x;
        var oldY = panel.y;
        if (effectType == 1) {
            egret.Tween.get(panel).to({ x: panel.x - 10 }, shakeNum);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x - 20 }, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x + 20 }, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: oldX }, shakeNum);
            }, this, shakeNum * 5);
        }
        else {
            egret.Tween.get(panel).to({ x: panel.x - 10, y: panel.y }, shakeNum);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x + 20, y: panel.y }, shakeNum);
            }, this, shakeNum * 2);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 15 }, shakeNum);
            }, this, shakeNum * 3);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y - 20 }, shakeNum);
            }, this, shakeNum * 4);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: panel.x, y: panel.y + 10 }, shakeNum);
            }, this, shakeNum * 5);
            egret.setTimeout(function () {
                egret.Tween.get(panel).to({ x: oldX, y: oldY }, shakeNum);
            }, this, shakeNum * 6);
        }
    }
    EffectUtils.shakeScreen = shakeScreen;
    /**
    * str             提示内容
    * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
    * isWarning       是否是警告，警告是红色
    */
    function showTips(str, effectType, isWarning) {
        if (str === void 0) { str = ""; }
        if (effectType === void 0) { effectType = 1; }
        if (isWarning === void 0) { isWarning = false; }
        switch (effectType) {
            case 1: {
                TipsUtils.showTipsDownToUp(str, isWarning);
                break;
            }
            case 2: {
                TipsUtils.showTipsLeftOrRight(str, isWarning, true);
                break;
            }
            case 3: {
                TipsUtils.showTipsLeftOrRight(str, isWarning, false);
                break;
            }
            case 4: {
                TipsUtils.showTipsFromCenter(str, isWarning);
                break;
            }
            case 5: {
                TipsUtils.showTipsBigToSmall(str, isWarning);
                break;
            }
            default: {
            }
        }
    }
    EffectUtils.showTips = showTips;
    function playButtonEffect(obj, cb) {
        if (cb === void 0) { cb = null; }
        if (this.isPlayEffectPlay) {
            return;
        }
        var acx = obj.anchorOffsetX;
        var acy = obj.anchorOffsetY;
        obj.anchorOffsetX = obj.width / 2;
        obj.anchorOffsetY = obj.height / 2;
        var xx = (obj.anchorOffsetX - acx);
        var yy = (obj.anchorOffsetY - acy);
        obj.x += xx;
        obj.y += yy;
        var onComplete2 = function () {
            this.isPlayEffectPlay = false;
            obj.anchorOffsetX = acx;
            obj.anchorOffsetY = acy;
            obj.x -= xx;
            obj.y -= yy;
            obj.scaleX = 1;
            obj.scaleY = 1;
            if (cb != null) {
                cb();
            }
        };
        var onComplete1 = function () {
            egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1 }, 100).call(onComplete2, this);
        };
        egret.Tween.get(obj).to({ scaleX: 0.8, scaleY: 0.8 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }
    EffectUtils.playButtonEffect = playButtonEffect;
    //========================== a lot of effect will coming! ============================
    var isPlayEffectPlay = false;
    /**
    * 给显示对象增加特效
    * obj           对象
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    function playEffect(obj, cartoonType, cb) {
        if (cartoonType === void 0) { cartoonType = 1; }
        if (cb === void 0) { cb = null; }
        if (this.isPlayEffectPlay) {
            return;
        }
        this.isPlayEffectPlay = true;
        var onComplete2 = function () {
            this.isPlayEffectPlay = false;
            cb();
        };
        var onComplete1 = function () {
            if (cartoonType == 1) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            }
            else if (cartoonType == 2) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            }
            else if (cartoonType == 3) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }
    EffectUtils.playEffect = playEffect;
    //果冻效果，一般给按钮用
    function playEffect2(obj, callback) {
        if (callback === void 0) { callback = function () { }; }
        var onComplete1 = function () {
            egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(callback, this);
        };
        egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }
    EffectUtils.playEffect2 = playEffect2;
    //从外到里
    function playEffect3(effectTips, tt, callback) {
        if (tt === void 0) { tt = 800; }
        if (callback === void 0) { callback = function () { }; }
        effectTips.alpha = 0;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        var onComplete2 = function () {
            callback();
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            onComplete2();
        }, this, tt);
    }
    EffectUtils.playEffect3 = playEffect3;
    //从小变大
    function playEffect4(obj, callback) {
        if (callback === void 0) { callback = function () { }; }
        obj.scaleX = 0.1;
        obj.scaleY = 0.1;
        var onComplete1 = function () {
            callback();
        };
        egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut).call(onComplete1, this);
    }
    EffectUtils.playEffect4 = playEffect4;
    function playRoleActionEffect1(who, hitx, hity, callback, speed) {
        if (hitx === void 0) { hitx = 0; }
        if (hity === void 0) { hity = 0; }
        if (callback === void 0) { callback = function () { }; }
        if (speed === void 0) { speed = 200; }
        var xx = who.x;
        var yy = who.y;
        who.anchorOffsetX = who.width / 2;
        who.anchorOffsetY = who.height / 2;
        who.x += who.anchorOffsetX;
        who.y += who.anchorOffsetY - 10;
        if (who.parent)
            who.parent.setChildIndex(who, who.parent.numChildren - 1);
        var onComplete2 = function () {
            egret.Tween.get(who).to({ x: xx, y: yy }, speed);
            callback();
        };
        var onComplete1 = function () {
            who.anchorOffsetX = 0;
            who.anchorOffsetY = 0;
            who.x -= who.width / 2;
            who.y -= who.height / 2 - 10;
            who.scaleX = 1;
            who.scaleY = 1;
            egret.Tween.get(who).to({ x: hitx - 10, y: hity }, speed).call(onComplete2, this);
        };
        egret.Tween.get(who).to({ scaleX: 1.2, scaleY: 1.2 }, speed).call(onComplete1, this);
    }
    EffectUtils.playRoleActionEffect1 = playRoleActionEffect1;
    function playRoleActionEffect2(who, callback, speed) {
        if (callback === void 0) { callback = function () { }; }
        if (speed === void 0) { speed = 400; }
        var xx = who.x;
        var yy = who.y;
        who.anchorOffsetX = who.width / 2;
        who.anchorOffsetY = who.height / 2;
        who.x += who.anchorOffsetX;
        who.y += who.anchorOffsetY - 10;
        if (who.parent)
            who.parent.setChildIndex(who, who.parent.numChildren - 1);
        var onComplete2 = function () {
            egret.Tween.get(who).to({ x: xx, y: yy }, speed);
            callback();
        };
        var onComplete1 = function () {
            who.anchorOffsetX = 0;
            who.anchorOffsetY = 0;
            who.x -= who.width / 2;
            who.y -= who.height / 2 - 10;
            who.scaleX = 1;
            who.scaleY = 1;
            callback();
            //egret.Tween.get(who).to({ x: hitx - 10,y: hity },speed).call(onComplete2,this);
        };
        egret.Tween.get(who).to({ scaleX: 1.4, scaleY: 1.4 }, speed).call(onComplete1, this);
    }
    EffectUtils.playRoleActionEffect2 = playRoleActionEffect2;
    //从大变小，慢慢消失
    function playEffect5(effectTips, tt, callback) {
        if (tt === void 0) { tt = 800; }
        if (callback === void 0) { callback = function () { }; }
        effectTips.alpha = 0;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        var onComplete1 = function () {
            callback();
        };
        var onComplete2 = function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 800).call(onComplete1, this);
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            onComplete2();
        }, this, tt);
    }
    EffectUtils.playEffect5 = playEffect5;
    /**
    * 给显示对象增加持续放大特效
    * obj           对象
    */
    function playScaleEffect(obj) {
        var onComplete1 = function () {
            if (obj != null) {
                var onComplete2 = function () {
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self);
                };
                obj.alpha = 1;
                egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self);
            }
        };
        onComplete1();
    }
    EffectUtils.playScaleEffect = playScaleEffect;
    /**
    * 显示对象上线浮动特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         浮动高度
    * todo          多个对象跳动
    */
    function flyObj(obj, time, space) {
        if (space === void 0) { space = 50; }
        var onComplete1 = function () {
            if (obj != null) {
                var onComplete2 = function () {
                    egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ y: obj.y + space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }
    EffectUtils.flyObj = flyObj;
    /**
    * 显示对象摇头特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         摇头幅度
    * todo          多个对象摇头
    * 注意：需要将对象的注册点位置：0.5,1
    */
    function rockObj(obj, time, space) {
        if (space === void 0) { space = 20; }
        var onComplete1 = function () {
            if (obj != null) {
                var onComplete2 = function () {
                    egret.Tween.get(obj).to({ rotation: -space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ rotation: space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }
    EffectUtils.rockObj = rockObj;
    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    function typerEffect(obj, content, interval) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        var strArr = content.split("");
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);
        }
    }
    EffectUtils.typerEffect = typerEffect;
    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(macIconShake("this.btnIcon", 100));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     */
    function macIconShake(obj, initY) {
        //抖动频率[时间，移动距离]，可修改
        var arr = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];
        var str = "egret.Tween.get(" + obj + ")";
        for (var i = 0, len = arr.length; i < len; i++) {
            str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    }
    EffectUtils.macIconShake = macIconShake;
    /**
     * 开始闪烁
     * @param obj
     */
    function startFlicker(obj, alphaTime) {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj]);
    }
    EffectUtils.startFlicker = startFlicker;
    /**
     * 停止闪烁
     * @param obj
     */
    function stopFlicker(obj) {
        egret.Tween.removeTweens(obj);
    }
    EffectUtils.stopFlicker = stopFlicker;
    /**
     * 金币飞行的效
     */
    function coinsFly(obj, startX, startY, endX, endY) {
        if (endX === void 0) { endX = 140; }
        if (endY === void 0) { endY = 64; }
        var interval = 0;
        var coinsNum = 0;
        var flyEffect = function () {
            if (coinsNum > 8) {
                clearInterval(interval);
                coinsNum = 0;
                return;
            }
            coinsNum++;
            var coin = new eui.Image('gold');
            coin.x = startX;
            coin.y = startY;
            coin.scaleX = 0.6;
            coin.scaleY = 0.6;
            obj.addChild(coin);
            egret.Tween.get(coin).to({ x: endX, y: endY, scaleX: 1.1, scaleY: 1.1 }, 600)
                .wait(100)
                .call(function () {
                obj.removeChild(coin);
            }, [obj, coin]);
        };
        interval = setInterval(flyEffect.bind(this), 100);
    }
    EffectUtils.coinsFly = coinsFly;
})(EffectUtils || (EffectUtils = {}));
