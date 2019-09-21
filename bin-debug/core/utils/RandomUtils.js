var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by yangsong on 2014/11/23.
 */
var RandomUtils = (function () {
    function RandomUtils() {
    }
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    RandomUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    RandomUtils.limitInteger = function ($from, $end) {
        return Math.round(this.limit($from, $end));
    };
    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    RandomUtils.randomArray = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    /**
 * 在一个数组中随机获取一个元素
 * @param arr 数组
 * @returns {any} 随机出来的结果
 */
    RandomUtils.randomArray2 = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        var ss = arr[index];
        arr.splice(index, 1);
        return ss;
    };
    return RandomUtils;
}());
__reflect(RandomUtils.prototype, "RandomUtils");
