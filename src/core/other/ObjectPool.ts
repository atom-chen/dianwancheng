/**
 * Created by yangsong on 2014/11/22.
 * 对象池类
 */
class ObjectPool {
    
    private static _pools:{[refKey:string]:ObjectPool} = {};
    
    private _objs:Array<any>;

    /**
     * 构造函数
     */
    public constructor() {
        this._objs = new Array<any>();
    }

    /**
     * 放回一个对象
     * @param obj
     */
    public push(obj:any):void {
        this._objs.push(obj);
    }

    /**
     * 取出一个对象
     * @returns {*}
     */
    public pop(extraKey?:any):any {
        if (this._objs.length == 0) {
            return null;
        }
        
        if (extraKey) {
            for (let i = this._objs.length-1, obj:any; i > -1; i--) {
                obj = this._objs[i];
                if (obj.extraKey == extraKey) {
                    this._objs.splice(i, 1);
                    return obj;
                }
            }
        }
            
        return this._objs.pop();
    }
    
    /**
     * 所有缓存对象执行的函数
     */
    public execute(funcName?:string):void {
        if (funcName == null) {
            return;
        }
        
        for (let i = this._objs.length-1, obj:any; i > -1; i--) {
            obj = this._objs[i];
            obj[funcName]();
        }
    }

    /**
     * 清除所有缓存对象
     */
    public clear(funcName?:string):void {
        for (let obj:any; this._objs.length > 0;) {
            obj = this._objs.pop();
            if (funcName) {
                obj[funcName]();
            }
        }
    }

    /**
     * 取出一个对象
     * @param refKey Class
     * @param extraKey 标识值
     * @param classZ Class
     * @return Object
     *
     */
    public static pop(refKey:string, extraKey?:any, ...args:any[]):any {
        let pool:ObjectPool = ObjectPool._pools[refKey];
        
        if (pool == null) {
            pool = new ObjectPool();
            ObjectPool._pools[refKey] = pool;
        }

        let obj:any = pool.pop(extraKey);

        if (obj) {
            return obj;
        }
        
        if (extraKey) {
            let classZ:any = egret.getDefinitionByName(refKey);
            obj = new classZ(extraKey);
            obj.extraKey = extraKey;
            obj.ObjectPoolKey = refKey;
        } else {
            let classZ:any = egret.getDefinitionByName(refKey);
            let argsLen:number = args.length;
            if (argsLen == 0) {
                obj = new classZ();
            } else if (argsLen == 1) {
                obj = new classZ(args[0]);
            } else if (argsLen == 2) {
                obj = new classZ(args[0], args[1]);
            } else if (argsLen == 3) {
                obj = new classZ(args[0], args[1], args[2]);
            } else if (argsLen == 4) {
                obj = new classZ(args[0], args[1], args[2], args[3]);
            } else if (argsLen == 5) {
                obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
            }
            obj.ObjectPoolKey = refKey;
        }
        
        return obj;
    }

    /**
     * 放入一个对象
     * @param obj
     *
     */
    public static push(obj:any):boolean {
        if (obj == null) {
            return false;
        }

        let refKey:any = obj.ObjectPoolKey;

        if (refKey == null) {
            return false;
        }

        //保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
        let pool:ObjectPool = ObjectPool._pools[refKey];
        if (pool == null) {
            return false;
        }
        
        pool.push(obj);
        return true;
    }

    /**
     * 清除所有对象
     */
    public static clear():void {
        let pool:ObjectPool;
        for (let rekKey in ObjectPool._pools) {
            pool = ObjectPool._pools[rekKey];
            pool.clear();
        }
        ObjectPool._pools = {};
    }

    /**
     * 清除某一类对象
     * @param classZ Class
     * @param funcName 清除对象需要执行的函数
     */
    public static erase(refKey:string, funcName?:string):void {

        let pool:ObjectPool = ObjectPool._pools[refKey];
        if (pool == null) {
            pool.clear(funcName)
        }
        
        delete ObjectPool._pools[refKey];
    }

    /**
     * 缓存中对象统一执行一个函数
     * @param classZ Class
     * @param funcName 要执行的函数名称
     */
    public static execute(refKey:string, funcName:string):void {
        let pool:ObjectPool = ObjectPool._pools[refKey];
        if (pool == null) {
            pool.execute(funcName)
        }
    }
}