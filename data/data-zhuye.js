// 轮播
var carousel  = [{
  src: '/images/iqiyi.png'
},
{
  src: '/images/vr.png'
},
{
  src: '/images/wx.png'
}];
// 列表
var post = [{
  header_image: '/images/4.png',
  header_text: 'Sep 20 2016',
  title: '又是蟹肥虾壮时',
  first_image: '/images/crab.png',
  description: '简介',
  foot_text1: '92',
  foot_text2: '62'
},
{
  header_image: '/images/5.png',
  header_text: 'Nov 20 2016',
  title: '比利·林恩的中场战事',
  first_image: '/images/bl.png',
  description: '简介',
  foot_text1: '92',
  foot_text2: '62'
}];

var des = [{
  
  src:"/images/crab.png",
  header_image: '/images/4.png',
  header_nickname: '知乎',
  header_date: '三天前',
  description:"大闸蟹",
  desBody_text: '1.引言',
  desBody_text1: '大量的文字'
},
{
  
  src:"/images/bl.png",
  header_image: '/images/5.png',
  header_nickname: '知乎',
  header_date: '三天前',
  description:"比利·林恩的中场战事",
  desBody_text: '1.引言',
  desBody_text1: '李安是一位绝不会重复自己的导演,本片将极富原创性,李安众所瞩目的新片《比利·林恩漫长的中场休息》正式更名《半场无战事》'
}]
module.exports={
  postlist:post,
  carousel : carousel ,
  des:des
}