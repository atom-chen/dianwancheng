class VipItem extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = 'resource/skins/vip/VipItemSkin.exml';
    }
    public imgVip: eui.Image;
    public labTitle: eui.Label;
    public labInfo0: eui.Label;
    public labInfo1: eui.Label;
    private labInfo2: eui.Label;
    // private index: number = -1;

    private baseRate: number = 100;
    private baseMoney: number = 15;
    // private mArr = [20, 50, 100, 200, 500];

    protected childrenCreated() {

    }

    public setVipMoney(vip): void {
        if ((parseInt(GlobalData.user.vip) + 1) >= parseInt(vip.id + "")) {
            this.labTitle.text = '累计充值' + vip.money / 100 + '元';
        } else {
            this.labTitle.text = '累计充值???元';
        }
        this.imgVip.source = 'vip.v' + vip.id;
        this.labInfo0.text = '签到奖励多送' + vip.id + '倍金币';
        this.labInfo1.text = '救济金每日每次领取' + QuickManage.moneyStr(vip.jjg) + '金币';
        if (parseInt(vip.id + "") == 1) {
            this.labInfo2.text = '金鲨银鲨游戏可以上庄';
        } else if (parseInt(vip.id + "") == 5) {
            this.labInfo2.text = '百人牛牛和百人金花尊享VIP专属座位';
        } else if (parseInt(vip.id + "") == 6) {
            this.labInfo2.text = '百人牛牛游戏可以上庄';
        } else if (parseInt(vip.id + "") == 8) {
            this.labInfo2.text = '百人金花游戏可以上庄';
        } else if (parseInt(vip.id + "") == 10) {
            this.labInfo2.text = '大厅可以发布全服公告';
        }
    }

    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }

}