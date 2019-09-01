// 判断是否增氧机报警
const isDeviceWarn = (warningLevel) => {
    if (!warningLevel) {
        return
    }
    let isDevice = false
    if( warningLevel == 1 || warningLevel == 3 || warningLevel == 11 || warningLevel == 13) {
        isDevice = true
    }
    return isDevice
}
// 判断增氧机失联
const isUnConnect = (warningLevel) => {
    let unConnect = false
    if (warningLevel == 1 || warningLevel == 3) {
        unConnect = true
    }
    return unConnect
}
// 获取一位小数
const getOneDecimal = (value = 0)=>{
    let val =Math.round(parseFloat(value)*10)/10;
	let s = value.toString().split(".");
	if(s.length == 1){
		val = value.toString()+".0";
		return val;
	}
    return val
}
const getTimingText = (openTimeUnix, closeTimeUnix) => {
    if(!openTimeUnix || !closeTimeUnix){
        return
    }
    let res = ''
    let openTiming = openTimingUnix / 3600
    let closeTiming = closeTimingUnix / 3600
    res = `${openTiming}:00-${closeTiming > openTiming ? '': '次日'}${closeTiming}:00`
    return res

}
const warnText = (warningLevel) => {
    let errLogText = ''
    warningLevel == 1  && (errLogText = '失联')
    warningLevel == 3  && (errLogText = '断电失联')
    warningLevel == 5  && (errLogText = '异常停机')
    warningLevel == 7  && (errLogText = '电流过载')
    warningLevel == 9  && (errLogText = '断相')
    warningLevel == 11 && (errLogText = '相序错乱')
    warningLevel == 13 && (errLogText = '电压不稳')
    return {
        detailText,
        errLogText
    }
}
const getSignal = (val) =>{
    let signal = 0
    if(val <= 5){
        signal =  0
    } else if(val >= 6 && val <= 10){
        signal = 1
    } else if(val >= 11 && val <=15) {
        signal = 2
    } else if(val>= 16 && val <= 25){
        signal = 3
    } else if(val >= 26){
        signal = 4
    }
    return signal
}

export {
    isDeviceWarn,
    getOneDecimal,
    isUnConnect,
    getTimingText,
    warnText,
    getSignal
}