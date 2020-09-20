export function debounce(func, delay) {
  let timer = null

  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt) {
  //1.获取年份
  //y:匹配y +：1个或者多个  y+：匹配一个或者多个y  y*：0个或者多个y y？：0个或1个y
  //RegExp.$1：匹配到的结果，就是yyyy
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ' ' ).substr(4 - RegExp.$1.length));
    // fmt.replace('匹配到的字符串', '替换的结果')
    //date.getFullYear() + ' '  -> 数字＋空字符串=字符串
    //substr字符串截取函数：substr(数字) -> 从第几位开始截取
  }
  let o={
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      'S+': date.getSeconds()
  };
  for(let k in o){
      if (new RegExp(`(${k})` ).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
  }
  return fmt ;
};
//单位数的时间格式化表示函数：4 -> 04
function padLeftZero (str) {
  return ( '00' + str). substr(str.length);
};

