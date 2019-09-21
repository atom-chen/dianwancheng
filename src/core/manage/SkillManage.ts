/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
class SkillManage {
    public static instance: SkillManage = null;
    
    private skills:Array<any>;
    public constructor() {
        if(SkillManage.instance) {
            throw new Error("Instance is alreally exist");
        }
    }

    public static getInstance(): SkillManage {
        if(this.instance == null) {
            this.instance = new SkillManage();
        }
        return this.instance;
    }
    public playSkill(res,xx,yy,cb=null): void {
        this.skills = this.skills || [];
        var mc: egret.MovieClip;
        if(this.skills[res]) {
            mc = this.skills[res];
        } else {
            mc = QuickManage.createMc(res);
        }
        mc.x = xx;
        mc.y = yy;
        mc.gotoAndStop(1);
        mc.play(1);
        PanelManage.tipsLayer.addChild(mc);
        EventManage.addEvent(this,mc,egret.Event.COMPLETE,function() {
            if(mc.parent)
                mc.parent.removeChild(mc);
            SkillManage.getInstance().skills[res]=mc;
            cb();
        });
    }
}