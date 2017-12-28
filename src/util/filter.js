/**
 * filter
 * create by Tony.Jing
 * 2017-08-01
 */

/**
 * 格式化时间
 * 
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
    var newDate = new Date(parseInt(str) * 1000);
        //获取日期
        var yy = newDate.getFullYear();
        var mm = newDate.getMonth()+1;
        if(mm.toString().length == 1){
            mm = '0'+mm;
        }
        var dd = newDate.getDate();
        if(dd.toString().length == 1){
            dd = '0'+dd;
        }
        var newLastDate = yy + '/' + mm + '/' +dd;
        //获取具体时间点
        var newTimeHH = newDate.getHours();
        if(newTimeHH.toString().length == 1){
            newTimeHH = '0'+newTimeHH;
        }
        var newTimeMM = newDate.getMinutes();
        if(newTimeMM.toString().length == 1){
            newTimeMM = '0'+newTimeMM;
        }
        var newTimeSS = newDate.getSeconds();
        if(newTimeSS.toString().length == 1){
            newTimeSS = '0'+newTimeSS;
        }
        var newTime = newTimeHH + ":" + newTimeMM + ":" + newTimeSS;
        var nTime = newLastDate +"  "+ newTime;
        return nTime;
}

/**
 * 账号积分转金额
 * 
 * @param {number} score
 * @returns 转换后的账号金额
 */
export const scoreToM = (score) => {
    return score/100;
}
