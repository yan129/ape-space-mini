/* 是否手机号码*/
export function validatePhone(rule, value,callback) {
  const reg =/^[1][3,4,5,7,8][0-9]{9}$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('手机号不合法'));
    } else {
      callback();
    }
  }
}
