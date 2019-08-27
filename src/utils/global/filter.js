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

export {
    isDeviceWarn,
    getOneDecimal
}