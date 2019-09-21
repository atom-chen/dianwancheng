/**
 *
 * @author  fany
 *
 */
class FruitInfo {
    private _count: number = 0;
    private _count1: number = 0;
    private _count2: number = 0;
    private _count3: number = 0;

    private _ii: number = 0;
    private _ii1: number = 0;
    private _ii2: number = 0;
    private _ii3: number = 0;

    private _currentArr: Array<any>;
    private _jiange: number = 0;
    private _isGo: boolean = false;
    private _isGo1: boolean = false;
    private _isGo2: boolean = false;
    private _isGo3: boolean = false;
    private _jiedian: number = 0;
    private _endtime: number = 0;
    private _r: any = null;
    private _danzhu: string = "";
    private _timett: number = 0;
    private _timett1: number = 0;
    private _tt: number = 0;
    private _tt1: number = 0;
    private _tt2: number = 0;
    private _result: any = null;
    private _resultc: boolean = false;
    private _daojishicom: boolean = false;
    private _end: number = 0;
    private _endzhuanhuan: number = 0;
    private _ctt: number = 0;
    private _fltt: boolean = false;
    private _xiazhuArr: Array<any>;
    private _xiazhuArr2: Array<any>;
    private _zhiqianArr: Array<any>;
    private _zhuArr: Array<any>;
    private _zhuangnum: number = 0;
    private _changebanker: any = null;

    private _isSys: boolean = false;
    private _collectobj: any = null;
    private _zhuangGold: number = 0;
    private _isChongfuXiazhu: boolean = false;
    private _isYing: boolean = false;
    private _posArr: Array<any>;
    public init() {
    }
    public constructor() {
        this.isChongfuXiazhu = false;
        this.ii = 0;
        this.ii1 = 0;
        this.ii2 = 0;
        this.ii3 = 0;
        this.jiange = 0;
        this.jiedian = 0;
        this.isGo = false;
        this.isGo1 = false;
        this.isGo2 = false;
        this.isGo3 = false;
        this.currentArr = [];

        this.endtime = 0;
        this.r = null;
        this.danzhu = "";
        this.timett = 0;
        this.timett1 = 0;
        this.tt = 0;
        this.tt1 = 0;
        this.tt2 = 0;
        this.result = null;
        this.resultc = false;
        this.daojishicom = false;
        this.end = 0;
        this.endzhuanhuan = 0;
        this.ctt = 0;
        this.fltt = false;
        this.xiazhuArr = [];
        this.xiazhuArr2 = [];
        this.zhiqianArr = [];
        this.zhuArr = [];
        this.zhuangnum = 0;
        this.zhuangGold = 0;
        this.changebanker = null;
        this.isSys = false;
        this.collectobj = null;
        this.posArr = [];
    }
    public get posArr(): Array<any> {
        return this._posArr;
    }
    public set posArr(value: Array<any>) {
        this._posArr = value;
    }
    public get isYing(): boolean {
        return this._isYing;
    }
    public set isYing(value: boolean) {
        this._isYing = value;
    }
    public get isChongfuXiazhu(): boolean {
        return this._isChongfuXiazhu;
    }
    public set isChongfuXiazhu(value: boolean) {
        this._isChongfuXiazhu = value;
    }
    public get zhuangGold(): number {
        return this._zhuangGold;
    }

    public set zhuangGold(value: number) {
        this._zhuangGold = value;
    }
    public get count(): number {
        return this._count;
    }

    public set count(value: number) {
        this._count = value;
    }


    public get ii1(): number {
        return this._ii1;
    }

    public set ii1(value: number) {
        this._ii1 = value;
    }

    public get ii2(): number {
        return this._ii2;
    }

    public set ii2(value: number) {
        this._ii2 = value;
    }

    public get ii3(): number {
        return this._ii3;
    }

    public set ii3(value: number) {
        this._ii3 = value;
    }

    public get currentArr(): Array<any> {
        return this._currentArr;
    }

    public set currentArr(value: Array<any>) {
        this._currentArr = value;
    }

    public get jiange(): number {
        return this._jiange;
    }

    public set jiange(value: number) {
        this._jiange = value;
    }

    public get isGo(): boolean {
        return this._isGo;
    }

    public set isGo(value: boolean) {
        this._isGo = value;
    }

    public get isGo1(): boolean {
        return this._isGo1;
    }

    public set isGo1(value: boolean) {
        this._isGo1 = value;
    }

    public get isGo2(): boolean {
        return this._isGo2;
    }

    public set isGo2(value: boolean) {
        this._isGo2 = value;
    }

    public get isGo3(): boolean {
        return this._isGo3;
    }

    public set isGo3(value: boolean) {
        this._isGo3 = value;
    }

    public get jiedian(): number {
        return this._jiedian;
    }

    public set jiedian(value: number) {
        this._jiedian = value;
    }

    public get endtime(): number {
        return this._endtime;
    }

    public set endtime(value: number) {
        this._endtime = value;
    }

    public get r(): any {
        return this._r;
    }

    public set r(value: any) {
        this._r = value;
    }

    public get danzhu(): string {
        return this._danzhu;
    }

    public set danzhu(value: string) {
        this._danzhu = value;
    }

    public get timett(): number {
        return this._timett;
    }

    public set timett(value: number) {
        this._timett = value;
    }

    public get timett1(): number {
        return this._timett1;
    }

    public set timett1(value: number) {
        this._timett1 = value;
    }

    public get tt(): number {
        return this._tt;
    }

    public set tt(value: number) {
        this._tt = value;
    }

    public get tt1(): number {
        return this._tt1;
    }

    public set tt1(value: number) {
        this._tt1 = value;
    }

    public get tt2(): number {
        return this._tt2;
    }

    public set tt2(value: number) {
        this._tt2 = value;
    }

    public get result(): any {
        return this._result;
    }

    public set result(value: any) {
        this._result = value;
    }

    public get resultc(): boolean {
        return this._resultc;
    }

    public set resultc(value: boolean) {
        this._resultc = value;
    }

    public get daojishicom(): boolean {
        return this._daojishicom;
    }

    public set daojishicom(value: boolean) {
        this._daojishicom = value;
    }

    public get end(): number {
        return this._end;
    }

    public set end(value: number) {
        this._end = value;
    }

    public get endzhuanhuan(): number {
        return this._endzhuanhuan;
    }

    public set endzhuanhuan(value: number) {
        this._endzhuanhuan = value;
    }

    public get ctt(): number {
        return this._ctt;
    }

    public set ctt(value: number) {
        this._ctt = value;
    }

    public get fltt(): boolean {
        return this._fltt;
    }

    public set fltt(value: boolean) {
        this._fltt = value;
    }
    public get xiazhuArr2(): Array<any> {
        return this._xiazhuArr2;
    }

    public set xiazhuArr2(value: Array<any>) {
        this._xiazhuArr2 = value;
    }
    public get xiazhuArr(): Array<any> {
        return this._xiazhuArr;
    }

    public set xiazhuArr(value: Array<any>) {
        this._xiazhuArr = value;
    }

    public get zhiqianArr(): Array<any> {
        return this._zhiqianArr;
    }

    public set zhiqianArr(value: Array<any>) {
        this._zhiqianArr = value;
    }

    public get zhuArr(): Array<any> {
        return this._zhuArr;
    }

    public set zhuArr(value: Array<any>) {
        this._zhuArr = value;
    }

    public get zhuangnum(): number {
        return this._zhuangnum;
    }

    public set zhuangnum(value: number) {
        this._zhuangnum = value;
    }

    public get changebanker(): any {
        return this._changebanker;
    }

    public set changebanker(value: any) {
        this._changebanker = value;
    }

    public get isSys(): boolean {
        return this._isSys;
    }

    public set isSys(value: boolean) {
        this._isSys = value;
    }

    public get collectobj(): any {
        return this._collectobj;
    }

    public set collectobj(value: any) {
        this._collectobj = value;
    }
    public get count1(): number {
        return this._count1;
    }

    public set count1(value: number) {
        this._count1 = value;
    }

    public get count2(): number {
        return this._count2;
    }

    public set count2(value: number) {
        this._count2 = value;
    }

    public get count3(): number {
        return this._count3;
    }

    public set count3(value: number) {
        this._count3 = value;
    }

    public get ii(): number {
        return this._ii;
    }

    public set ii(value: number) {
        this._ii = value;
    }
}
