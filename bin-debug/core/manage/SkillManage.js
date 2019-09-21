var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
var SkillManage = (function () {
    function SkillManage() {
        if (SkillManage.instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    SkillManage.getInstance = function () {
        if (this.instance == null) {
            this.instance = new SkillManage();
        }
        return this.instance;
    };
    SkillManage.prototype.playSkill = function (res, xx, yy, cb) {
        if (cb === void 0) { cb = null; }
        this.skills = this.skills || [];
        var mc;
        if (this.skills[res]) {
            mc = this.skills[res];
        }
        else {
            mc = QuickManage.createMc(res);
        }
        mc.x = xx;
        mc.y = yy;
        mc.gotoAndStop(1);
        mc.play(1);
        PanelManage.tipsLayer.addChild(mc);
        EventManage.addEvent(this, mc, egret.Event.COMPLETE, function () {
            if (mc.parent)
                mc.parent.removeChild(mc);
            SkillManage.getInstance().skills[res] = mc;
            cb();
        });
    };
    return SkillManage;
}());
SkillManage.instance = null;
__reflect(SkillManage.prototype, "SkillManage");
