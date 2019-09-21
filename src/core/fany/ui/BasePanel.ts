/**
 * 基础面板
 * @author  fany
 *
 */
class BasePanel extends eui.Component implements fany.IDispose {
    
    public constructor() {
        super();
    }
    protected childrenCreated(): void {
        this.setTouchEnabled();
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
