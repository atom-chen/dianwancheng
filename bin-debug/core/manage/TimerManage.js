/**
  * 定时器统一管理
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 定时器统一管理
  */
var TimerManage;
(function (TimerManage) {
    function init() {
        this.secondHash = [];
        this.notSecondHash = [];
        this.timerHash = [];
        //        this._timer = new egret.Timer(1000);
        //        this._timer.addEventListener(egret.TimerEvent.TIMER,timerHandle);
        //        this._timer.start();
    }
    TimerManage.init = init;
    function timerHandle(evt) {
        //        for each(var obj: Object in secondHash.getValues()){
        //            if(obj.isStop == false) {//如果计时器是停止状态，则不执行
        //                objTickHandle(obj);
        //            }
        //        }
        for (var tt in this.secondHash) {
            var obj = this.secondHash[tt];
            if (obj.isStop == false) {
                this.objTickHandle(obj);
            }
        }
    }
    TimerManage.timerHandle = timerHandle;
    /**
     * 计时器执行
   */
    function objTickHandle(item) {
        if (item.onTimer != null) {
            var onTimer = item.onTimer;
            onTimer();
        }
        if (item.repeatCount >= 0) {
            item.repeatCount--;
        }
        if (item.repeatCount == 0) {
            if (item.onComplete != null) {
                var onComplete = item.onComplete;
                onComplete();
            }
            this.secondHash[item.key] = null;
            delete this.secondHash[item.key];
        }
    }
    TimerManage.objTickHandle = objTickHandle;
    /**
     * 只执行1000毫秒的计时器
     * @param object 类
     * @param delay 间隔毫秒
     * @param onTimer 计时器执行函数
     * @param onComplete 计时器完成函数
     * @param repeatCount 计时器执行次数， 默认值的  0  代表不限次数
     * @param flag 标识，只用于一个类中要建立两个计器时。
     *
     */
    function addTimer(object, delay, onTimer, onComplete, repeatCount, flag) {
        if (onComplete === void 0) { onComplete = null; }
        if (repeatCount === void 0) { repeatCount = 0; }
        if (flag === void 0) { flag = ""; }
        if (repeatCount == 0) {
            repeatCount = -1;
        }
        if (delay == 1000) {
            var className = egret.getQualifiedClassName(object);
            var key = className + flag;
            var item = { key: key, object: object, isStop: false, onTimer: onTimer, onComplete: onComplete, repeatCount: repeatCount, flag: flag };
            TimerManage.secondHash[key] = item;
            if (this._timer == null) {
                this.secondHash = [];
                this.notSecondHash = [];
                this.timerHash = [];
                this._timer = new egret.Timer(1000);
                this._timer.addEventListener(egret.TimerEvent.TIMER, timerHandle);
                this._timer.start();
            }
        }
        else {
            this.addDifferentTimer(object, delay, onTimer, onComplete, repeatCount, flag);
        }
    }
    TimerManage.addTimer = addTimer;
    /**
     * 执行 非 1000毫秒的计时器
     * @param object 类
     * @param onTimer 计时器执行函数
     * @param onComplete 计时器完成函数
     * @param repeatCount 计时器执行次数， 默认值的  -1  代表不限次数
     * @param flag 标识，只用于一个类中要建立两个计器时。
     *
     */
    function addDifferentTimer(object, delay, onTimer, onComplete, repeatCount, flag) {
        if (onComplete === void 0) { onComplete = null; }
        if (repeatCount === void 0) { repeatCount = -1; }
        if (flag === void 0) { flag = ""; }
        var sameDelay = false;
        /*先检查是否已经建立了这样的计时器*/
        //        for each(var obj: Object in notSecondHash.getValues()){
        //            if(obj.delay == delay) {
        //                sameDelay = true;
        //                break;
        //            }
        //        }
        for (var tt in this.notSecondHash) {
            var obj = this.notSecondHash[tt];
            if (obj.delay == delay) {
                sameDelay = true;
                break;
            }
        }
        /*如果没有，则建立*/
        if (!sameDelay) {
            var timer = new egret.Timer(delay);
            timer.addEventListener(egret.TimerEvent.TIMER, this.notSecondTimer, this);
            timer.start();
            TimerManage.timerHash[delay] = timer;
        }
        var className = egret.getQualifiedClassName(object);
        var key = className + flag;
        var item = { key: key, delay: delay, isStop: false, object: object, onTimer: onTimer, onComplete: onComplete, repeatCount: repeatCount, flag: flag };
        this.notSecondHash[key] = item;
    }
    TimerManage.addDifferentTimer = addDifferentTimer;
    function notSecondTimer(event) {
        var timer = event.currentTarget;
        var delay = timer.delay;
        for (var tt in this.notSecondHash) {
            var obj = this.notSecondHash[tt];
            if (obj.delay == delay && obj.isStop == false) {
                this.notSecondTickHandle(obj);
            }
        }
    }
    TimerManage.notSecondTimer = notSecondTimer;
    /**
     * 计时器执行
   */
    function notSecondTickHandle(item) {
        var onTimer = item.onTimer;
        if (onTimer != null) {
            onTimer();
        }
        if (item.repeatCount >= 0) {
            item.repeatCount--;
        }
        if (item.repeatCount == 0) {
            if (item.onComplete != null) {
                var onComplete = item.onComplete;
                onComplete();
            }
            this.notSecondTimerComplete(item);
        }
    }
    TimerManage.notSecondTickHandle = notSecondTickHandle;
    function notSecondTimerComplete(item) {
        if (item == null) {
            return;
        }
        this.notSecondHash[item.key] = null;
        delete this.notSecondHash[item.key];
        //        for each(var obj: Object in notSecondHash.getValues()){
        //            if(obj.delay == item.delay) {
        //                return;
        //            }
        //        }
        for (var tt in this.notSecondHash) {
            var obj = this.notSecondHash[tt];
            if (obj.delay == item.delay) {
                return;
            }
        }
        var timer = this.timerHash[item.delay];
        if (timer) {
            timer.removeEventListener(egret.TimerEvent.TIMER, notSecondTimer, this);
            TimerManage.timerHash[item.delay];
            delete TimerManage.timerHash[item.delay];
        }
    }
    TimerManage.notSecondTimerComplete = notSecondTimerComplete;
    /**
     * 删除要执行的对象
     * @param object
     * @param flag
     
     */
    function removeTimer(object, flag) {
        if (flag === void 0) { flag = ""; }
        var className = egret.getQualifiedClassName(object);
        var key = className + flag;
        this.notSecondTimerComplete(this.notSecondHash[key]);
        this.secondHash[key] = null;
        this.notSecondHash[key] = null;
        delete this.secondHash[key];
        delete this.notSecondHash[key];
    }
    TimerManage.removeTimer = removeTimer;
    /**
     * 停止计时器
     * @param object
     * @param flag
     
     */
    function stopTimer(object, flag) {
        if (flag === void 0) { flag = ""; }
        var className = egret.getQualifiedClassName(object);
        var key = className + flag;
        var item = this.secondHash[key];
        if (item == null) {
            item = this.notSecondHash[key];
        }
        if (item) {
            item.isStop = true;
        }
    }
    TimerManage.stopTimer = stopTimer;
    /**
     * 启动计时器
     * @param object
     * @param flag
     
     */
    function startTimer(object, flag) {
        if (flag === void 0) { flag = ""; }
        var className = egret.getQualifiedClassName(object);
        var key = className + flag;
        var item = this.secondHash[key];
        if (item == null) {
            item = this.notSecondHash[key];
        }
        if (item) {
            item.isStop = false;
        }
    }
    TimerManage.startTimer = startTimer;
})(TimerManage || (TimerManage = {}));
