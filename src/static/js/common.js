// import Vue from 'vue';

/* 是否手机号码*/
export const validatePhone = (value) => {
  const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
  if (!reg.test(value) && value != '') {
    return false;
  }
  return true;
}
// const validatePhone = (rule, value,callback) => {
//   const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
//   if(value==''||value==undefined||value==null){
//     callback();
//   }else {
//     if ((!reg.test(value)) && value != '') {
//       callback(new Error('手机号码不合法'));
//     } else {
//       callback();
//     }
//   }
// }

/* 判断值为空 */
export const isEmpty = (value) => {
  // 判断字符串
  if(value === 'undefined' || value === '' || value === 'null'){
    return true;
  }
  // 判断数组
  if(Array.prototype.isPrototypeOf(value) && value.length === 0){
    return true;
  }
  // 判断对象
  if(Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0){
    return true;
  }
  return false;
}


// export default function (Vue) { 
//   Vue.prototype.$commonJs = {
//     validatePhone,
//     isEmpty
//   }
// }
