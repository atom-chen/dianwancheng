var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 2014/11/22.
 * 对象池类
 */
var ObjectPool = (function () {
    /**
     * 构造函数
     */
    function ObjectPool() {
        this._objs = new Array();
    }
    /**
     * 放回一个对象
     * @param obj
     */
    ObjectPool.prototype.push = function (obj) {
        this._objs.push(obj);
    };
    /**
     * 取出一个对象
     * @returns {*}
     */
    ObjectPool.prototype.pop = function (extraKey) {
        if (this._objs.length == 0) {
            return null;
        }
        if (extraKey) {
            for (var i = this._objs.length - 1, obj = void 0; i > -1; i--) {
                obj = this._objs[i];
                if (obj.extraKey == extraKey) {
                    this._objs.splice(i, 1);
                    return obj;
                }
            }
        }
        return this._objs.pop();
    };
    /**
     * 所有缓存对象执行的函数
     */
    ObjectPool.prototype.execute = function (funcName) {
        if (funcName == null) {
            return;
        }
        for (var i = this._objs.length - 1, obj = void 0; i > -1; i--) {
            obj = this._objs[i];
            obj[funcName]();
        }
    };
    /**
     * 清除所有缓存对象
     */
    ObjectPool.prototype.clear = function (funcName) {
        for (var obj = void 0; this._objs.length > 0;) {
            obj = this._objs.pop();
            if (funcName) {
                obj[funcName]();
            }
        }
    };
    /**
     * 取出一个对象
     * @param refKey Class
     * @param extraKey 标识值
     * @param classZ Class
     * @return Object
     *
     */
    ObjectPool.pop = function (refKey, extraKey) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var pool = ObjectPool._pools[refKey];
        if (pool == null) {
            pool = new ObjectPool();
            ObjectPool._pools[refKey] = pool;
        }
        var obj = pool.pop(extraKey);
        if (obj) {
            return obj;
        }
        if (extraKey) {
            var classZ = egret.getDefinitionByName(refKey);
            obj = new classZ(extraKey);
            obj.extraKey = extraKey;
            obj.ObjectPoolKey = refKey;
        }
        else {
            var classZ = egret.getDefinitionByName(refKey);
            var argsLen = args.length;
            if (argsLen == 0) {
                obj = new classZ();
            }
            else if (argsLen == 1) {
                obj = new classZ(args[0]);
            }
            else if (argsLen == 2) {
                obj = new classZ(args[0], args[1]);
            }
            else if (argsLen == 3) {
                obj = new classZ(args[0], args[1], args[2]);
            }
            else if (argsLen == 4) {
                obj = new classZ(args[0], args[1], args[2], args[3]);
            }
            else if (argsLen == 5) {
                obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
            }
            obj.ObjectPoolKey = refKey;
        }
        return obj;
    };
    /**
     * 放入一个对象
     * @param obj
     *
     */
    ObjectPool.push = function (obj) {
        if (obj == null) {
            return false;
        }
        var refKey = obj.ObjectPoolKey;
        if (refKey == null) {
            return false;
        }
        //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
        var pool = ObjectPool._pools[refKey];
        if (pool == null) {
            return false;
        }
        pool.push(obj);
        return true;
    };
    /**
     * 清除所有对象
     */
    ObjectPool.clear = function () {
        var pool;
        for (var rekKey in ObjectPool._pools) {
            pool = ObjectPool._pools[rekKey];
            pool.clear();
        }
        ObjectPool._pools = {};
    };
    /**
     * 清除某一类对象
     * @param classZ Class
     * @param funcName 清除对象需要执行的函数
     */
    ObjectPool.erase = function (refKey, funcName) {
        var pool = ObjectPool._pools[refKey];
        if (pool == null) {
            pool.clear(funcName);
        }
        delete ObjectPool._pools[refKey];
    };
    /**
     * 缓存中对象统一执行一个函数
     * @param classZ Class
     * @param funcName 要执行的函数名称
     */
    ObjectPool.execute = function (refKey, funcName) {
        var pool = ObjectPool._pools[refKey];
        if (pool == null) {
            pool.execute(funcName);
        }
    };
    return ObjectPool;
}());
ObjectPool._pools = {};
__reflect(ObjectPool.prototype, "ObjectPool");
