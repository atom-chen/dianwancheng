/**
  * 简单音乐管理类
  * by fany
  * (c) copyright false,0,0,2016 - 2035
  * All Rights Reserved.
  */
var MusicManage;
(function (MusicManage) {
    function initMusic() {
        var data = GlobalData.configData;
        this.bg = document.createElement('audio');
        this.bg.src = data.data.musicurl;
        document.body.appendChild(this.bg);
    }
    MusicManage.initMusic = initMusic;
    function playBgMuisc(v) {
        if (v === void 0) { v = 1; }
        if (GlobalData.isMusic) {
            MusicManage.bg.loop = true;
            MusicManage.bg.volume = 0.4;
            this.bg.play(-1);
        }
    }
    MusicManage.playBgMuisc = playBgMuisc;
    function closeBgMuisc() {
        MusicManage.bg.pause();
    }
    MusicManage.closeBgMuisc = closeBgMuisc;
    function playMuisc(res, v, loop) {
        if (v === void 0) { v = 1; }
        if (loop === void 0) { loop = 1; }
        if (GlobalData.isMusic) {
            this.sound = RES.getRes(res + "_mp3");
            if (this.sound == null) {
                return;
            }
            this.closeClickMuisc();
            this.channel = MusicManage.sound.play(0, loop);
            this.channel.volume = v;
        }
    }
    MusicManage.playMuisc = playMuisc;
    function closeClickMuisc() {
        if (this.channel) {
            this.channel.stop();
            this.channel = null;
        }
    }
    MusicManage.closeClickMuisc = closeClickMuisc;
    function closeMuisc() {
        this.closeClickMuisc();
        this.closeGameBgMuisc();
    }
    MusicManage.closeMuisc = closeMuisc;
    function playGameBgMuisc(res, v, loop) {
        if (v === void 0) { v = 1; }
        if (loop === void 0) { loop = 1; }
        if (GlobalData.isMusic) {
            this.sound1 = RES.getRes(res + "_mp3");
            if (this.sound1 == null) {
                return;
            }
            this.closeBgMuisc();
            this.closeGameBgMuisc();
            this.channel1 = MusicManage.sound1.play(0, loop);
            this.channel1.volume = v;
        }
    }
    MusicManage.playGameBgMuisc = playGameBgMuisc;
    function closeGameBgMuisc() {
        if (this.channel1) {
            this.channel1.stop();
            this.channel1 = null;
        }
    }
    MusicManage.closeGameBgMuisc = closeGameBgMuisc;
})(MusicManage || (MusicManage = {}));
