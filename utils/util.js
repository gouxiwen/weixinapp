function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 星星转换成数组
function getswitchstars(stars) {
  // var stars = "45";
  var num = stars.substring(0,1);
  var num1 = stars.substring(1,2);
  // console.log("num1"+num1)
  var starsArray = [];
  for(var i=0;i<5;i++){
    if(i<num){
      starsArray.push(1);
    }else if(num1==5&&i==num){
      starsArray.push(2);
    }else{
      starsArray.push(0);
    }
  }
  return starsArray;
  console.log(starsArray);
}
module.exports = {
  formatTime: formatTime,
  getswitchstars: getswitchstars
}
