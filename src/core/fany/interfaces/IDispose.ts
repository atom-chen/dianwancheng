/**
 * Created by fany on 2015/7/22.
 * @module fany
 * @class IDispose
 * @constructor
 **/
module fany {
    /**
     * 销毁类接口
     */
    export interface IDispose{
        dispose(): void;
        setTouchEnabled():void;
    }
}