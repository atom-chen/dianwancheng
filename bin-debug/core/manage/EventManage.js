var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 监听事件管理器,方便处理监听移除，防止遗漏
*
* 监听语法：
*
*       EventManage.addEvent(this,dispatch,Event.COMPLETE,func);
*
* 只监听一次,事件回调后自动一出监听
*        EventManage.addOnceEvent(this,dispatch,Event.COMPLETE,func);
*
* 移除监听的用法一共有8种：
* 	000 删除所有关于监听者的所有事件,通常在类销毁时使用一次 EventManage.removeEvent(this);
* 	001 指定相同回调函数的所有监听 EventManage.removeEvent(this,null,null,func);
* 	010 指定事件名的所有监听 EventManage.removeEvent(this,null,Event.COMPLETE);
* 	011 指定事件名，指定回调函数的所有监听 EventManage.removeEvent(this,null,Event.COMPLETE,func);
* 	100 删除指定通知者 和 监听者之间的所有监听 EventManage.removeEvent(this,dispatch);
* 	101 删除通知者 和 监听者之间使用同一回调函数的所有监听 EventManage.removeEvent(this,dispatch,null,func);
* 	110 删除通知者 和 监听者之间指定事件的所有监听 EventManage.removeEvent(this,dispatch,Event.COMPLETE);
* 	111 明确删除指定的事件监听 EventManage.removeEvent(this,dispatch,Event.COMPLETE,func);
*
*EventManage历史：
* AS2 1.0(2008 - 1 - 26 AS2版)
* AS3 1.0(2009) 版本需要在监听类内部申请EventManage_List用来存储时间信息。
* AS3 2.0(2010) 版本所有事件信息都集中在EventManage类中处理。
* AS3 3.0(2011) 版本针对AS3特性，重写了一遍，性能大幅提升。
* TS 1.0(2015) 版本针对ts特性，又重写了一遍，时代变化太快了。
* @author 交流联系方式 442924754@qq.com 梦之神仔
**/
var EventManage = (function () {
    function EventManage() {
    }
    /**
    * addEvent (监听者, 通知者, 事件名称, 回调函数,冒泡阶段,优先级,是否弱引用)
    * EventManage.addEvent(this,loader,Event.COMPLETE, fun);
    *
    * @param key  监听者
    * @param dispatch  通知者
    * @param event  事件名称
    * @param func   回调函数
    * @param useCapture 冒泡阶段
    * @param priority   优先级
    * @param useWeakReference   是否弱引用
    */
    EventManage.addEvent = function (key, dispatch, event, func, useCapture, priority, useWeakReference) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        if ('touchEnabled' in dispatch) {
            dispatch.touchEnabled = true;
        }
        dispatch.addEventListener(event, func, key, useCapture, priority, useWeakReference);
        EventManage.instances.push([key, dispatch, event, func, useCapture, priority, useWeakReference]);
    };
    /**
    * 只监听到一次事件就删除监听，无需手动删除监听
    * 用法同addEvent方法.
    *
    * @param key  监听者
    * @param dispatch  通知者
    * @param event  事件名称
    * @param func   回调函数
    * @param useCapture 冒泡阶段
    * @param priority   优先级
    * @param useWeakReference   是否弱引用
    */
    EventManage.addOnceEvent = function (key, dispatch, event, func, useCapture, priority, useWeakReference) {
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        EventManage.addEvent(key, dispatch, event, func, useCapture, priority, useWeakReference);
        var onceFun = function (e) {
            EventManage.removeEvent(key, dispatch, event, onceFun, useCapture);
            EventManage.removeEvent(key, dispatch, event, func, useCapture);
        };
        EventManage.addEvent(key, dispatch, event, onceFun, useCapture, priority, useWeakReference);
    };
    /**
     * 添加带效果的按钮事件
     * 用法同addEvent方法.
     *
     * @param key  监听者
     * @param dispatch  通知者
     * @param event  事件名称
     * @param func   回调函数
     * @param useCapture 冒泡阶段
     * @param priority   优先级
     * @param useWeakReference   是否弱引用
     */
    EventManage.addButtonEvent = function (key, dispatch, event, func, music, useCapture, priority, useWeakReference) {
        if (music === void 0) { music = "button_click_sound"; }
        if (useCapture === void 0) { useCapture = false; }
        if (priority === void 0) { priority = 0; }
        if (useWeakReference === void 0) { useWeakReference = false; }
        var onceFun = function (e) {
            EventManage.removeEvent(key, dispatch, event, onceFun, useCapture);
            EffectUtils.playButtonEffect(dispatch, onceFun2.bind(key, e, func));
            if (GlobalData.isMusic && music != "") {
                MusicManage.playMuisc(music);
            }
        };
        var onceFun2 = function (e, func) {
            EventManage.addEvent(key, dispatch, event, onceFun, useCapture, priority, useWeakReference);
            func(e);
        };
        EventManage.addEvent(key, dispatch, event, onceFun, useCapture, priority, useWeakReference);
    };
    /**
    * 移除监听的用法一共有8种：
    * 	000 删除所有关于监听者的所有事件,通常在类销毁时使用一次 EventManage.removeEvent(this);
    * 	001 指定相同回调函数的所有监听 EventManage.removeEvent(this,null,null,func);
    * 	010 指定事件名的所有监听 EventManage.removeEvent(this,null,Event.COMPLETE);
    * 	011 指定事件名，指定回调函数的所有监听 EventManage.removeEvent(this,null,Event.COMPLETE,func);
    * 	100 删除指定通知者 和 监听者之间的所有监听 EventManage.removeEvent(this,dispatch);
    * 	101 删除通知者 和 监听者之间使用同一回调函数的所有监听 EventManage.removeEvent(this,dispatch,null,func);
    * 	110 删除通知者 和 监听者之间指定事件的所有监听 EventManage.removeEvent(this,dispatch,Event.COMPLETE);
    * 	111 明确删除指定的事件监听 EventManage.removeEvent(this,dispatch,Event.COMPLETE,func);
    *
    * @param key  监听者
    * @param dispatch  通知者
    * @param event  事件名称
    * @param func   回调函数
    * @param useCapture 冒泡阶段
    * @param priority   优先级
    * @param useWeakReference   是否弱引用
    */
    EventManage.removeEvent = function (key, dispatch, event, func, useCapture) {
        if (dispatch === void 0) { dispatch = null; }
        if (event === void 0) { event = null; }
        if (func === void 0) { func = null; }
        if (useCapture === void 0) { useCapture = false; }
        if (!key) {
            console.log("监听者参数不能为空！");
            return;
        }
        ;
        var infos;
        var instances;
        var instances_lib = EventManage.instanceslib;
        var type = 0;
        var prevkey;
        var instances_arr;
        var hasClear = true;
        dispatch ? type |= 4 : 0;
        event ? type |= 2 : 0;
        func ? type |= 1 : 0;
        var removeEventFun = function () {
            hasClear = true;
            switch (type) {
                case 0 /*000*/:
                    infos[EventManage.DISPATHCH].removeEventListener(infos[EventManage.EVENT], infos[EventManage.FUNCTION], key, infos[EventManage.USECAPTURE]);
                    break;
                case 1 /*001*/:
                    if (infos[EventManage.FUNCTION] == func) {
                        infos[EventManage.DISPATHCH].removeEventListener(infos[EventManage.EVENT], infos[EventManage.FUNCTION], key, infos[EventManage.USECAPTURE]);
                    }
                    else {
                        hasClear = false;
                    }
                    break;
                case 2 /*010*/:
                    if (infos[EventManage.EVENT] == event) {
                        infos[EventManage.DISPATHCH].removeEventListener(infos[EventManage.EVENT], infos[EventManage.FUNCTION], key, infos[EventManage.USECAPTURE]);
                    }
                    else {
                        hasClear = false;
                    }
                    break;
                case 3 /*011*/:
                    if (infos[EventManage.EVENT] == event && infos[EventManage.FUNCTION] == func) {
                        infos[EventManage.DISPATHCH].removeEventListener(infos[EventManage.EVENT], infos[EventManage.FUNCTION], key, infos[EventManage.USECAPTURE]);
                    }
                    else {
                        hasClear = false;
                    }
                    break;
                case 4 /*100*/:
                    if (infos[EventManage.DISPATHCH] == dispatch) {
                        infos[EventManage.DISPATHCH].removeEventListener(infos[EventManage.EVENT], infos[EventManage.FUNCTION], key, infos[EventManage.USECAPTURE]);
                    }
                    else {
                        hasClear = false;
                    }
                    break;
                case 5 /*101*/:
                    if (infos[EventManage.DISPATHCH] == dispatch && infos[EventManage.FUNCTION] == func) {
                        infos[EventManage.DISPATHCH].removeEventListener(infos[EventManage.EVENT], infos[EventManage.FUNCTION], key, infos[EventManage.USECAPTURE]);
                    }
                    else {
                        hasClear = false;
                    }
                    break;
                case 6 /*110*/:
                    if (infos[EventManage.DISPATHCH] == dispatch && infos[EventManage.EVENT] == event) {
                        infos[EventManage.DISPATHCH].removeEventListener(infos[EventManage.EVENT], infos[EventManage.FUNCTION], key, infos[EventManage.USECAPTURE]);
                    }
                    else {
                        hasClear = false;
                    }
                    break;
                case 7 /*111*/:
                    if (infos[EventManage.DISPATHCH] == dispatch && infos[EventManage.EVENT] == event && infos[EventManage.FUNCTION] == func) {
                        infos[EventManage.DISPATHCH].removeEventListener(event, func, key, useCapture);
                    }
                    else {
                        hasClear = false;
                    }
                    break;
            }
        };
        var len;
        var i;
        instances = instances_lib.get(key);
        if (instances) {
            len = instances.length;
            for (i = len - 1; i >= 0; i--) {
                infos = instances[i];
                removeEventFun();
                if (hasClear) {
                    instances.splice(i, 1);
                }
            }
            if (!instances.length) {
                instances_lib.del(key);
            }
        }
        instances = EventManage.instances;
        len = instances.length;
        instances = instances.reverse();
        for (i = len - 1; i >= 0; i--) {
            infos = instances[i];
            if (infos[EventManage.KEY] == key) {
                removeEventFun();
            }
            else {
                hasClear = false;
            }
            if (hasClear) {
                instances.pop();
            }
            else {
                if (prevkey == infos[EventManage.KEY]) {
                    instances_arr.push(instances.pop());
                }
                else {
                    prevkey = instances[instances.length - 1][EventManage.KEY];
                    instances_arr = instances_lib.get(prevkey);
                    if (!instances_arr) {
                        instances_arr = [instances.pop()];
                        instances_lib.add(infos[EventManage.KEY], instances_arr);
                    }
                    else {
                        instances_arr.push(instances.pop());
                    }
                }
            }
        }
    };
    return EventManage;
}());
/**
* 已监听类作为索引分支存储监听队列
*/
EventManage.instanceslib = new Dictionary();
/**
* 临时监听队列
*/
EventManage.instances = [];
/**
* 索引：使用监听时外面传递进来的this
*/
EventManage.KEY = 0;
/**
* 索引：被监听广播的对象
*/
EventManage.DISPATHCH = 1;
/**
* 索引：事件名
*/
EventManage.EVENT = 2;
/**
* 索引：监听广播所执行的函数
*/
EventManage.FUNCTION = 3;
/**
* 索引：冒泡阶段
*/
EventManage.USECAPTURE = 4;
/**
* 索引：监听收到广播的优先级
*/
EventManage.PRIORITY = 5;
/**
* 索引：是否弱引用
*/
EventManage.USEWEAKREFERENCE = 6;
EventManage.isclick = false;
__reflect(EventManage.prototype, "EventManage");
