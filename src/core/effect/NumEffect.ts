/**
 * 跳动数字
 * @author  fany
 *
 */
class NumEffect {
    private txt: any = null;
    private result: number = 0;
    private cb: Function;
    public constructor(txt, result, cb) {
        this.txt = txt;
        this.result = result;
        this.cb = cb;
        this.tweenNum();
    }
    public get num(): number {
        var n = "";
        if (this.txt) {
            n = this.txt.text;
        }
        return QuickManage.moneyStr2number(n);
    }

    public set num(value) {
        if (this.txt) {
            this.txt.text = QuickManage.moneyStr(Math.ceil(value));
        }
        if (value == this.result) {

            if (this.cb) {
                this.cb();
            }
            this.dispose();
        }
    }
    private tweenNum(): void {
        egret.Tween.get(this).to({ num: this.result }, 1000);
    }
    private dispose(): void {
        egret.Tween.removeTweens(this);
        this.txt = null;
        this.result = 0;
        this.cb = null;
    }
}
