/**
 *
 * @author  fany
 *
 */
class UserInfo {
    private _nickname: string;
    private _headurl: string;
    private _sex: string = "1";
    private _seat: string = "-1";
    private _quan: string;
    private _state: string;//1,空闲 2,准备 3，倍住  4，游戏中。。  5， 
    private _gold: string;
    private _vip: string;
    private _taskstate: string;
    private _emailstate: string;
    private _isOneLogin: string;
    private _hasRecharge: boolean;
    private _difen: string;
    // private _iscandial: boolean;
    private _rate: number;

    public get rate(): number {
        return this._rate;
    }
    public set rate(value: number) {
        this._rate = value;
    }

    public get difen(): string {
        return this._difen;
    }

    public set difen(value: string) {
        this._difen = value;
    }
    public get idd(): string {
        return this._idd;
    }

    public set idd(value: string) {
        this._idd = value;
    }
    private _idd: string;
    public constructor() {
    }
    public get hasRecharge(): boolean {
        return this._hasRecharge;
    }
    public set hasRecharge(values) {
        this._hasRecharge = values;
    }
    public get isOneLogin(): string {
        return this._isOneLogin;
    }
    public set isOneLogin(values) {
        this._isOneLogin = values;
    }
    public get taskstate(): string {
        return this._taskstate;
    }
    public set taskstate(values) {
        this._taskstate = values;
    }
    public get emailstate(): string {
        return this._vip;
    }
    public set emailstate(values) {
        this._emailstate = values;
    }
    public get vip(): string {
        return this._vip;
    }
    public set vip(values) {
        this._vip = values;
    }
    public get gold(): string {
        return this._gold;
    }
    public set gold(values) {
        this._gold = values;
    }
    /**
     * 用户状态
     */
    public get state(): string {
        return this._state;
    }
    /**
     * 用户状态
     */
    public set state(values) {
        this._state = values;
    }
    /**
     * 用户当前点券
     */
    public get quan(): string {
        return this._quan;
    }
    /**
     * 用户当前点券
     */
    public set quan(values) {
        this._quan = values;
    }
    /**
     * 用户当前座位
     */
    public get seat(): string {
        return this._seat;
    }
    /**
     * 用户当前座位
     */
    public set seat(values) {
        this._seat = values;
    }
    /**
     * 用户头像
     */
    public get headurl(): string {
        return this._headurl;
    }
    /**
     * 用户头像
     */
    public set headurl(values) {
        this._headurl = values;
    }
    /**
     * 昵称
     */
    public get nickname(): string {
        return this._nickname;
    }
    /**
     * 昵称
     */
    public set nickname(values) {
        this._nickname = values;
    }
    /**
     * 性别
     */
    public get sex(): string {
        return this._sex;
    }
    /**
     * 性别
     */
    public set sex(values) {
        this._sex = values;
    }

    // //是否可以抽奖
    // public get iscanDial(): boolean {
    //     return this._iscandial;
    // }

    // public set iscanDial(values) {
    //     this._iscandial = values;
    // }
}
