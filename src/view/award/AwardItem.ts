class AwardItem extends eui.Component implements fany.IDispose {
	constructor() {
		super();
		this.skinName = "resource/skins/award/AwardItemSkin.exml";
	}

	public grpExchange: eui.Group;
	public btnTouch: eui.Image;
	public labTitle: eui.Label;
	public labInfo: eui.Label;
	public labGold: eui.Label;
	public imgGift: eui.Image;
	public grpRecord: eui.Group;
	public labRecordTime: eui.Label;
	public labRecordInfo: eui.Label;
	private _id: string = '';

	protected childrenCreated(): void {
		EventManage.addButtonEvent(this, this.btnTouch, egret.TouchEvent.TOUCH_TAP, this.onTouchExchange.bind(this));
	}

	public setData(data, type): void {
		if (type == 1) {
			this.setExchange(data);
		}
		else if (type == 2) {
			this.setSelfRecord(data);
		}
		else if (type == 3) {
			this.setAllRecord(data);
		}
	}

	private setExchange(data): void {
		this.grpExchange.visible = true;
		this.grpRecord.visible = false;
		this.labTitle.text = data.name;	//礼物名称
		this.labInfo.text = data.desc;	//礼物描述
		this.labGold.text = QuickManage.moneyStr(data.need_count);	//所需奖券
		// data.rule  vip
		this.imgGift.source = GlobalData.cdnResUrl + "resource/assets/noload/icon/" + data.icon + ".png";	//图片
		this._id = data._id;
	}

	private setAllRecord(data): void {
		this.grpExchange.visible = false;
		this.grpRecord.visible = true;
		this.labRecordInfo.text = 'vip' + data.vip + '玩家' + data.name + '兑换了' + data.award;
		this.labRecordTime.text = (new Date(data.time)).toLocaleString();
	}

	private setSelfRecord(data): void {
		this.grpExchange.visible = false;
		this.grpRecord.visible = true;
		this.labRecordInfo.text = '兑换了' + data.award;
		this.labRecordTime.text = (new Date(data.time)).toLocaleString();
	}

	private onTouchExchange(): void {
		Net.send(Protocol.HALL_GIFT_EXCHANGE, { giftId: this._id }, this.exchangeCB.bind(this));
	}

	private exchangeCB(msg): void {
		if (msg.code == 200) {
			lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.GIFT_ON_EXCHANGE, msg.data));
			TipsManage.showTips('兑换奖品成功！');
		}
		else {
			TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
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