/**
  * 游戏特效汇总
  * by zhaoxin
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 使用方法如：EffectUtils.rotationEffect()
  */

module EffectUtils {
    // 存储旋转对象
    var rotationArr: Array<any> = [];
    export function numEffect(obj, num: number, cb = null): void {
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
    //对象旋转特效
    //obj   旋转对象
    //time  旋转一周用时，毫秒
    export function rotationEffect(obj, time: number = 1000): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        if (this.rotationArr[obj.hashCode]) {
            return;
        }
        if ((this.rotationArr[obj.hashCode] == null) || !this.rotationArr[obj.hashCode]) {
            this.rotationArr[obj.hashCode] = true;
        }
        var onComplete1: Function = function () {
            if (this.rotationArr[obj.hashCode] && (obj != null)) {
                obj.rotation = 0;
                egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
            }
        };
        obj.rotation = 0;
        egret.Tween.get(obj).to({ rotation: 360 }, time).call(onComplete1, this);
    }
    //对象闪烁特效- 一直闪烁循环
    //obj         闪烁对象
    //interval    闪烁总工时间
    export function blinkEffect(obj, interval: number = 1000): void {
        var onComplete1: Function = function () {
            egret.Tween.get(obj).to({ alpha: 0 }, interval).call(onComplete2);
        }
        var onComplete2: Function = function () {
            egret.Tween.get(obj).to({ alpha: 1 }, interval).call(onComplete1);
        }
        egret.Tween.get(obj).to({ alpha: 0 }, interval).call(onComplete2);
    }
    //取消对象旋转
    //obj    旋转对象
    export function removeRotationEffect(obj): void {
        if (this.rotationArr == null) {
            this.rotationArr = [];
        }
        this.rotationArr[obj.hashCode] = false;
    }
    //抖动对象特效
    //类似ios密码输入错误的特效
    export function shakeObj(obj): void {
        var shakeNum = 80;
        var oldX: number = obj.x;
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


    //抖动对象特效
    // 1：抖动  2：震动
    export function shakeScreen(effectType: number = 1): void {
        var panel = GameConfig.curPanel;
        var shakeNum = 40;
        var oldX: number = panel.x;
        var oldY: number = panel.y;

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
        } else {
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

    /**
    * str             提示内容
    * effectType      动画类型 1：从下到上弹出 2：从左至右弹出 3：从右至左弹出 4：从中间弹出渐渐消失 5：从大变小 等等
    * isWarning       是否是警告，警告是红色
    */
    export function showTips(str: string = "", effectType: number = 1, isWarning: boolean = false): void {
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
                // TODO: Implemente default case
            }
        }

    }

    export function playButtonEffect(obj, cb = null): void {
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
        var onComplete2: Function = function () {
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
        var onComplete1: Function = function () {
            egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1 }, 100).call(onComplete2, this);
        };
        egret.Tween.get(obj).to({ scaleX: 0.8, scaleY: 0.8 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }
    //========================== a lot of effect will coming! ============================

    var isPlayEffectPlay: Boolean = false;
    /**
    * 给显示对象增加特效
    * obj           对象
    * cartoonType   动画类型 1:【可爱】按下变小，放开弹大 2:按下变小，放开轻微弹大 3：按下变小，放开变大
    */
    export function playEffect(obj, cartoonType: number = 1, cb = null): void {
        if (this.isPlayEffectPlay) {
            return;
        }
        this.isPlayEffectPlay = true;
        var onComplete2: Function = function () {
            this.isPlayEffectPlay = false;
            cb();
        };
        var onComplete1: Function = function () {
            if (cartoonType == 1) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(onComplete2, this);
            } else if (cartoonType == 2) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.backOut).call(onComplete2, this);
            } else if (cartoonType == 3) {
                egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 100).call(onComplete2, this);
            }
        };
        egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }
    //果冻效果，一般给按钮用
    export function playEffect2(obj, callback = function () { }): void {
        var onComplete1: Function = function () {
            egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, x: obj.x - obj.width / 4, y: obj.y - obj.height / 4 }, 500, egret.Ease.elasticOut).call(callback, this);
        };
        egret.Tween.get(obj).to({ scaleX: 0.5, scaleY: 0.5, x: obj.x + obj.width / 4, y: obj.y + obj.height / 4 }, 100, egret.Ease.sineIn).call(onComplete1, this);
    }
    //从外到里
    export function playEffect3(effectTips, tt = 800, callback = function () { }): void {
        effectTips.alpha = 0;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        var onComplete2: Function = function () {
            callback();
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            onComplete2();
        }, this, tt);
    }
    //从小变大
    export function playEffect4(obj, callback = function () { }): void {
        obj.scaleX = 0.1;
        obj.scaleY = 0.1;
        var onComplete1: Function = function () {
            callback();
        };
        egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1 }, 800, egret.Ease.elasticOut).call(onComplete1, this);
    }
    export function playRoleActionEffect1(who, hitx = 0, hity = 0, callback = function () { }, speed = 200): void {
        var xx = who.x;
        var yy = who.y;
        who.anchorOffsetX = who.width / 2;
        who.anchorOffsetY = who.height / 2;
        who.x += who.anchorOffsetX;
        who.y += who.anchorOffsetY - 10;
        if (who.parent)
            who.parent.setChildIndex(who, who.parent.numChildren - 1);
        var onComplete2: Function = function () {
            egret.Tween.get(who).to({ x: xx, y: yy }, speed);
            callback();
        };
        var onComplete1: Function = function () {
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
    export function playRoleActionEffect2(who, callback = function () { }, speed = 400): void {
        var xx = who.x;
        var yy = who.y;
        who.anchorOffsetX = who.width / 2;
        who.anchorOffsetY = who.height / 2;
        who.x += who.anchorOffsetX;
        who.y += who.anchorOffsetY - 10;
        if (who.parent)
            who.parent.setChildIndex(who, who.parent.numChildren - 1);
        var onComplete2: Function = function () {
            egret.Tween.get(who).to({ x: xx, y: yy }, speed);
            callback();
        };
        var onComplete1: Function = function () {
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
    //从大变小，慢慢消失
    export function playEffect5(effectTips, tt = 800, callback = function () { }): void {
        effectTips.alpha = 0;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;
        var onComplete1: Function = function () {
            callback();
        };
        var onComplete2: Function = function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 800).call(onComplete1, this);
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            onComplete2();
        }, this, tt);
    }
    /**
    * 给显示对象增加持续放大特效
    * obj           对象
    */
    export function playScaleEffect(obj): void {
        var onComplete1: Function = function () {
            if (obj != null) {
                var onComplete2: Function = function () {
                    obj.scaleX = 1;
                    obj.scaleY = 1;
                    egret.Tween.get(obj).to({ alpha: 1 }, 1000).call(onComplete1, self)
                };
                obj.alpha = 1;
                egret.Tween.get(obj).to({ scaleX: 1.5, scaleY: 1.5, alpha: 0 }, 1000).call(onComplete2, self)
            }
        };

        onComplete1();

    }

    /**
    * 显示对象上线浮动特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         浮动高度
    * todo          多个对象跳动
    */
    export function flyObj(obj, time, space: number = 50): void {
        var onComplete1: Function = function () {
            if (obj != null) {
                var onComplete2: Function = function () {
                    egret.Tween.get(obj).to({ y: obj.y - space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ y: obj.y + space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }

    /**
    * 显示对象摇头特效
    * obj           对象
    * time          浮动时间 毫秒
    * space         摇头幅度
    * todo          多个对象摇头
    * 注意：需要将对象的注册点位置：0.5,1
    */
    export function rockObj(obj, time, space: number = 20): void {
        var onComplete1: Function = function () {
            if (obj != null) {
                var onComplete2: Function = function () {
                    egret.Tween.get(obj).to({ rotation: -space }, time).call(onComplete1, this);
                };
                egret.Tween.get(obj).to({ rotation: space }, time).call(onComplete2, this);
            }
        };
        onComplete1();
    }

    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    export function typerEffect(obj, content: string = "", interval: number = 200): void {
        var strArr: Array<any> = content.split("");
        var len: number = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);
        }
    }


    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(macIconShake("this.btnIcon", 100));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     */
    export function macIconShake(obj: string, initY: number): string {
        //抖动频率[时间，移动距离]，可修改
        var arr: Array<any> = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];

        var str: string = "egret.Tween.get(" + obj + ")";
        for (var i: number = 0, len: number = arr.length; i < len; i++) {
            str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    }

    /**
     * 开始闪烁
     * @param obj
     */
    export function startFlicker(obj: egret.DisplayObject, alphaTime: number): void {
        obj.alpha = 1;
        egret.Tween.get(obj).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime).call(this.startFlicker, this, [obj]);
    }

    /**
     * 停止闪烁
     * @param obj
     */
    export function stopFlicker(obj: egret.DisplayObject): void {
        egret.Tween.removeTweens(obj);
    }

    /**
     * 金币飞行的效
     */
    export function coinsFly(obj: egret.DisplayObjectContainer, startX, startY, endX = 140, endY = 64): void {
        var interval: number = 0;
        var coinsNum: number = 0;
        var flyEffect: Function = function () {
            if (coinsNum > 8) {
                clearInterval(interval);
                coinsNum = 0;
                return;
            }
            coinsNum++;
            var coin: eui.Image = new eui.Image('gold');
            coin.x = startX;
            coin.y = startY;
            coin.scaleX = 0.6;
            coin.scaleY = 0.6;
            obj.addChild(coin);
            egret.Tween.get(coin).to({ x: endX, y: endY, scaleX: 1.1, scaleY: 1.1 }, 600)
                .wait(100)
                .call(function () {
                    obj.removeChild(coin);
                }, [obj, coin])
        }
        interval = setInterval(flyEffect.bind(this), 100);
    }

}