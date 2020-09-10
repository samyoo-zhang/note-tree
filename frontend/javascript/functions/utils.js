
/**
 * 给方法添加try catch 机制
 * @param {Function} callback 执行的方法
 * @param {Object} ctx 执行的主体
 * @param {Array} args 执行方法的入参
 */
export function addTryCatch(callback, ctx = this, args = []) {
  try {
    const result = callback.apply(ctx, args);
    if (result === undefined) {
      return;
    }
    return result;
  } catch (error) {
    error.error('addTryCatch error! | reason:', error)
    return { type: 'error', reason: error }
  }
}

/**
 * 设置cookie
 * @param {String} key cookie键
 * @param {String} value cookie值
 * @param {Number} expiresTime 过期时间,单位天,默认1天
 */
export function setCookie(key, value, expiresTime = 1) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + expiresTime);
  document.cookie = key + "=" + value + "; expires=" + oDate.toDateString();
}

/**
 * 获取cookie
 * @param {String} key cookie键
 */
export function getCookie(key) {
  var arr1 = document.cookie.split("; ");//由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；
  for (var i = 0; i < arr1.length; i++) {
    var arr2 = arr1[i].split("=");//通过=截断，把name=Jack截断成[name,Jack]数组；
    if (arr2[0] == key) {
      return decodeURI(arr2[1]);
    }
  }
}

/**
 * 移除cookie
 * @param {String} key cookie键
 */
export function removeCookie(key) {
  setCookie(key, "", -1); // 把cookie设置为过期
}

/**
 * 创建一个节流机制的函数,仅第一次调用有效
 * @param {Function} callback 回调函数，支持自定参数
 * @param {Number} delay 设定多少间隔后调用，默认300
 * @returns {Function}
 */
export function createThrottle(callback, delay = 300) {
  let start = Date.now()
  return (...arg) => {
    const diff = Date.now() - start
    if (!diff || diff >= delay) {
      start = Date.now()
      callback(...arg)
    }
  }
}

/**
 * 创建一个防抖机制的函数，仅最后一次调用有效
 * @param {Function} callback
 * @param {Number} delay
 * @returns {Function}
 */
export function createDebounce(callback, delay = 500) {
  let timer = null;
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(callback, delay, ...arg)
  }
}

/**
 * 将字符串number转化为数字，如果非数字则返回原值
 * @param {Stirng} value
 * @returns {number}
 */
export function parseQueryNumber(value) {
  const numbered = Number(value)
  return Number.isNaN(numbered) ? value : numbered;
}

/**
 * 获取路由中的query的参数值
 * @param {string} name
 * @returns {string}
 */
export function getQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

/**
 * 置顶函数
 * @param {number} step 单位时间上滑的距离
 * @param {number} time 单位时间,单位:毫秒
 */
export function toTop(step, time) {
  document.documentElement.scrollTop -= time;
  document.body.scrollTop -= time;
  let timer;
  if (document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
    timer = setTimeout(() => this.toTop(i), step);
  } else {
    clearTimeout(timer);
  }
}


/**
 * 阿拉伯数字转中文数字
 * @param {number|string} str 
 */
export function numberToChinese(str) {
  let num = parseFloat(str);
  let strOutput = '',
    strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
  num += '00';
  let intPos = num.indexOf('.');
  if (intPos >= 0) {
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);
  for (let i = 0; i < num.length; i++) {
    strOutput +=
      '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) +
      strUnit.substr(i, 1);
  }
  return strOutput
    .replace(/零角零分$/, '')
    .replace(/零[仟佰拾]/g, '零')
    .replace(/零{2,}/g, '零')
    .replace(/零([亿|万])/g, '$1')
    .replace(/零+元/, '元')
    .replace(/亿零{0,3}万/, '亿')
    .replace(/^元/, '零元');
}

/**
 * 去除文本中的html
 * @param {string} str 
 */
export function cancelMark(str) {
  const reg = /<[a-z0-9]*?>/ig;
  return str.replace(reg, '');
}

/**
 * 格式化时间 时分秒
 * @param {string} val  时间戳,秒
 */
export function clockFmt(val) {
  let seconds = val % 60 || 0;
  let minutes = Math.floor((val / 60) % 60) || 0;
  let hours = Math.floor(val / 60 / 60) || 0;
  seconds < 10 ? '0' + seconds : seconds;
  return `${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
    }:${seconds < 10 ? '0' + seconds : seconds}`;
}

/**
 * 深拷贝
 * @param {Array|Object} obj  深拷贝的对象
 * @param {Number} level 所需拷贝的层级,-1为不限制拷贝层级全量复制
 */
export function deepClone(obj, level = -1) {
  if (!obj && typeof obj !== 'object') {
    throw new Error('error arguments', 'deepClone');
  }
  const newObj = obj.constructor === Array ? [] : {};
  Object.keys(obj).forEach(keys => {
    if (obj[keys] && typeof obj[keys] === 'object') {
      /**
       * 当level大于等于0时,限制复制层级(防止冗余的深复制导致内存溢出)
       * 当level小于0时,不限制复制的层级
       **/
      if (level === 0) {
        return newObj;
      } else {
        newObj[keys] = deepClone(obj[keys], level - 1);
      }
    } else {
      newObj[keys] = obj[keys];
    }
  });
  return newObj;
}