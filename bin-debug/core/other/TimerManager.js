var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Timer管理器
 */
var TimerManager = (function () {
    /**
     * 构造函数
     */
    function TimerManager() {
        if (TimerManager.instance) {
            throw new Error("Instance is alreally exist");
        }
        this._handlers = {};
        this._currTime = egret.getTimer();
        this._lastTime = this._currTime;
        this._totalTime = 0;
        this._currFrame = 0;
        this._timeScale = 1;
        this._realRate = 30;
        egret.MainContext.instance.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    TimerManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new TimerManager();
        }
        return this.instance;
    };
    /**
     * 设置时间参数
     * @param timeScale
     */
    TimerManager.prototype.setTimeScale = function (timeScale) {
        this._timeScale = timeScale;
    };
    /**
     *
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    TimerManager.prototype.setTimer = function (key, method, thisObject, delay, repeatCount, complateMethod, complateMethodObj) {
        if (delay === void 0) { delay = 0; }
        if (repeatCount === void 0) { repeatCount = 0; }
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        this.create(key, false, delay, repeatCount, method, thisObject, complateMethod, complateMethodObj);
    };
    /**
     *
     * 定时执行
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param delay 执行间隔:帧频
     * @param repeatCount 执行次数, 0为无限次
     * @param complateMethod 完成执行函数
     * @param complateMethodObj 完成执行函数所属对象
     *
     */
    TimerManager.prototype.setFrame = function (key, method, thisObject, delay, repeatCount, complateMethod, complateMethodObj) {
        if (delay === void 0) { delay = 0; }
        if (repeatCount === void 0) { repeatCount = 0; }
        if (complateMethod === void 0) { complateMethod = null; }
        if (complateMethodObj === void 0) { complateMethodObj = null; }
        this.create(key, true, delay, repeatCount, method, thisObject, complateMethod, complateMethodObj);
    };
    /**
     * 清理
     * @param method 要移除的函数
     * @param methodObj 要移除的函数对应的对象
     */
    TimerManager.prototype.remove = function (key) {
        var handler = this._handlers[key];
        if (handler == null) {
            return;
        }
        handler.dispose();
        ObjectPool.push(handler);
        delete this._handlers[key];
    };
    Object.defineProperty(TimerManager.prototype, "realRate", {
        //平均帧频(Frame/Sec)
        get: function () {
            return this._realRate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimerManager.prototype, "currentFrame", {
        //当前运行多少帧
        get: function () {
            return this._currFrame;
        },
        enumerable: true,
        configurable: true
    });
    TimerManager.prototype.create = function (key, useFrame, delay, repeatCount, method, methodObj, complateMethod, complateMethodObj) {
        //参数监测
        if (delay < 0 || repeatCount < 0 || method == null) {
            return;
        }
        //先删除相同函数的计时
        this.remove(key);
        //创建
        var handler = ObjectPool.pop("TimerHandler");
        handler.userFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.delay = delay;
        handler.method = method;
        handler.methodObj = methodObj;
        handler.complateMethod = complateMethod;
        handler.complateMethodObj = complateMethodObj;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers[key] = handler;
    };
    /**
     * 每帧执行函数
     * @param frameTime
     */
    TimerManager.prototype.onEnterFrame = function (event) {
        this._currFrame++;
        this._currTime = egret.getTimer();
        this._totalTime += this._currTime - this._lastTime;
        this._realRate = this._currFrame * 1000 / this._totalTime;
        this._lastTime = this._currTime;
        var handler;
        var t;
        for (var key in this._handlers) {
            handler = this._handlers[key];
            t = handler.userFrame ? this._currFrame : this._currTime;
            if (t >= handler.exeTime) {
                handler.method.call(handler.methodObj, (this._currTime - handler.dealTime) * this._timeScale);
                handler.dealTime = this._currTime;
                handler.exeTime += handler.delay;
                if (!handler.repeat) {
                    if (handler.repeatCount > 1) {
                        handler.repeatCount--;
                    }
                    else {
                        if (handler.complateMethod) {
                            handler.complateMethod.apply(handler.complateMethodObj);
                        }
                        this.remove(key);
                    }
                }
            }
        }
    };
    return TimerManager;
}());
TimerManager.instance = null;
__reflect(TimerManager.prototype, "TimerManager");
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔*/
        this.delay = 0;
        /**重复执行次数*/
        this.repeatCount = 0;
        /**执行时间*/
        this.exeTime = 0;
        /**上次的执行时间*/
        this.dealTime = 0;
    }
    /**清理*/
    TimerHandler.prototype.dispose = function () {
        this.method = null;
        this.methodObj = null;
        this.complateMethod = null;
        this.complateMethodObj = null;
    };
    return TimerHandler;
}());
__reflect(TimerHandler.prototype, "TimerHandler");
