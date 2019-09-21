var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author  fany
 *
 */
var UserInfo = (function () {
    function UserInfo() {
        this._sex = "1";
        this._seat = "-1";
    }
    Object.defineProperty(UserInfo.prototype, "rate", {
        get: function () {
            return this._rate;
        },
        set: function (value) {
            this._rate = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "difen", {
        get: function () {
            return this._difen;
        },
        set: function (value) {
            this._difen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "idd", {
        get: function () {
            return this._idd;
        },
        set: function (value) {
            this._idd = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "hasRecharge", {
        get: function () {
            return this._hasRecharge;
        },
        set: function (values) {
            this._hasRecharge = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "isOneLogin", {
        get: function () {
            return this._isOneLogin;
        },
        set: function (values) {
            this._isOneLogin = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "taskstate", {
        get: function () {
            return this._taskstate;
        },
        set: function (values) {
            this._taskstate = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "emailstate", {
        get: function () {
            return this._vip;
        },
        set: function (values) {
            this._emailstate = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "vip", {
        get: function () {
            return this._vip;
        },
        set: function (values) {
            this._vip = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "gold", {
        get: function () {
            return this._gold;
        },
        set: function (values) {
            this._gold = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "state", {
        /**
         * 用户状态
         */
        get: function () {
            return this._state;
        },
        /**
         * 用户状态
         */
        set: function (values) {
            this._state = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "quan", {
        /**
         * 用户当前点券
         */
        get: function () {
            return this._quan;
        },
        /**
         * 用户当前点券
         */
        set: function (values) {
            this._quan = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "seat", {
        /**
         * 用户当前座位
         */
        get: function () {
            return this._seat;
        },
        /**
         * 用户当前座位
         */
        set: function (values) {
            this._seat = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "headurl", {
        /**
         * 用户头像
         */
        get: function () {
            return this._headurl;
        },
        /**
         * 用户头像
         */
        set: function (values) {
            this._headurl = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "nickname", {
        /**
         * 昵称
         */
        get: function () {
            return this._nickname;
        },
        /**
         * 昵称
         */
        set: function (values) {
            this._nickname = values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserInfo.prototype, "sex", {
        /**
         * 性别
         */
        get: function () {
            return this._sex;
        },
        /**
         * 性别
         */
        set: function (values) {
            this._sex = values;
        },
        enumerable: true,
        configurable: true
    });
    return UserInfo;
}());
__reflect(UserInfo.prototype, "UserInfo");
