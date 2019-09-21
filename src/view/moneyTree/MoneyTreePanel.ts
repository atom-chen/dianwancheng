class MoneyTreePanel extends eui.Component implements fany.IDispose {
	constructor() {
		super();
		this.skinName = "resource/skins/moneytree/MoneyTreeSkin.exml";
	}
	public btnClose: eui.Image;
	public btnCharge: eui.Image;
	public grpNoTips: eui.Group;
	public labLevel: eui.Label;
	public btnGetCoin: eui.Image;
	public grpLoding: eui.Group;
	public imgload: eui.Image;
	public labload: eui.Label;
	public btnUp: eui.Image;
	public grpUpTip: eui.Group;
	public labUpMoney: eui.Label;
	public labUpInfo: eui.Label;

	private lMax: number = 0;
	private closeRect: eui.Rect;
	protected childrenCreated(): void {
		EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
		EventManage.addButtonEvent(this, this.btnCharge, egret.TouchEvent.TOUCH_TAP, this.onTouchCharge.bind(this));
		EventManage.addButtonEvent(this, this.btnGetCoin, egret.TouchEvent.TOUCH_TAP, this.onTouchGetCoin.bind(this));
		EventManage.addButtonEvent(this, this.btnUp, egret.TouchEvent.TOUCH_TAP, this.onTouchUp.bind(this));
		EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
		Net.send(Protocol.HALL_MONEYTREE_LIST, {}, this.treeList.bind(this));
	}

	private treeList(msg): void {
		if (msg.code == 200) {
			if (msg.data.level == 0) {
				this.initNo();
			}
			else {
				this.initHave(msg.data);
			}
		}
	}

	private onTouchClose(): void {
		this.dispose();
	}

	private onTouchCharge(): void {
		PanelManage.openShop();
	}

	private onTouchGetCoin(): void {
		if (this.lMax == 0) {
			TipsManage.showTips(ErrorMessage.errorMsg(404));
			return;
		}
		Net.send(Protocol.HALL_MONEYTREE_GET, {}, this.getCoinCallback.bind(this));
	}

	private getCoinCallback(msg): void {
		if (msg.code == 200) {
			GlobalData.user.gold = msg.gold;
			lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
			EffectUtils.coinsFly(this, 116, 557);
			this.updateLoding(0, this.lMax);
		}
		else {
			TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
		}
	}

	private onTouchUp(): void {
		PanelManage.openShop();
	}

	private initHave(data): void {
		this.btnCharge.visible = false;
		this.grpNoTips.visible = false;
		this.labLevel.text = data.level + '级';
		this.btnGetCoin.visible = true;
		this.grpLoding.visible = true;
		this.btnUp.visible = true;
		this.grpUpTip.visible = true;
		this.updateLoding(data.gold, data.max);
	}

	private initNo(): void {
		this.btnCharge.visible = true;
		this.grpNoTips.visible = true;
		this.labLevel.text = '未获得';
		this.btnGetCoin.visible = false;
		this.grpLoding.visible = false;
		this.btnUp.visible = false;
		this.grpUpTip.visible = false;
	}

	private updateLoding(cur, max): void {
		this.lMax = max;
		this.labload.text = cur + '/' + max;
		this.imgload.width = 400 * (cur / max);
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
