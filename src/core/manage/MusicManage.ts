/**
  * 简单音乐管理类
  * by fany
  * (c) copyright false,0,0,2016 - 2035
  * All Rights Reserved. 
  */
module MusicManage {
    export var sound: egret.Sound;
    export var channel: egret.SoundChannel;
    export var bg: HTMLAudioElement;

    export var sound1: egret.Sound;
    export var channel1: egret.SoundChannel;
    export function initMusic(): void {
        var data = GlobalData.configData;
        this.bg = <HTMLAudioElement>document.createElement('audio');
        this.bg.src = data.data.musicurl;
        document.body.appendChild(this.bg);
    }
    export function playBgMuisc(v = 1): void {
        if (GlobalData.isMusic) {
            MusicManage.bg.loop = true;
            MusicManage.bg.volume = 0.4;
            this.bg.play(-1);
        }
    }
    export function closeBgMuisc(): void {
        MusicManage.bg.pause();
    }
    export function playMuisc(res, v = 1, loop = 1): void {
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
    export function closeClickMuisc(): void {
        if (this.channel) {
            this.channel.stop();
            this.channel = null;
        }
    }

    export function closeMuisc(): void {
        this.closeClickMuisc();
        this.closeGameBgMuisc();
    }

    export function playGameBgMuisc(res, v = 1, loop = 1): void {
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
    export function closeGameBgMuisc(): void {
        if (this.channel1) {
            this.channel1.stop();
            this.channel1 = null;
        }
    }
}


