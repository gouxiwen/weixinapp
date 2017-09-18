var app = getApp();
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intheaters:{},
    comingsoon:{},
    top250:{},
    searchUrl:{},
    focus: false,
    blur: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  onLoad: function (options) {
    console.log("test页面加载");
    var intheatersurl = app.globalData.url+"/v2/movie/in_theaters?start=0&count=3";
    var comingsoonurl = app.globalData.url+"/v2/movie/coming_soon?start=0&count=3";
    var top250url = app.globalData.url +"/v2/movie/top250?start=0&count=3";
    this.getmovielist(intheatersurl, "intheaters","正在热映");
    this.getmovielist(comingsoonurl, "comingsoon", "即将上映");
    this.getmovielist(top250url, "top250", "top250");
  },
  getmovielist:function (url,key,tit) {
    var that = this;
    // 向豆瓣api发送请求
    wx.request({
      url: url,
      method:"get",
      header:{"Content-Type":"json"},
      success:function (res) {
        // console.log(res.data);
        that.getmovieMessage(res.data, key, tit);
      }
    })
  },
  // 获取电影数据
  getmovieMessage: function (msg, key, tit){
    var movies = [];
    for (var i in msg.subjects){
      var obj = msg.subjects[i];
      var title = obj.title;
      // console.log(title.length)
      if(title.length>6){
       title = title.substring(0,6)+"...";
      }
      var average = obj.rating.average;
      var img = obj.images.large;
      var id = obj.id;
      var stars = obj.rating.stars;
      movies[i] = {
        title: title,
        average:average,
        img:img,
        id:id,
        stars: util.getswitchstars(stars)
      }
    }
    //动态数据加载
    var datas = {};
    datas[key]= {
      tit: tit,
      movies: movies
    }
    this.setData (datas);
    // console.log(movies);
    // console.log(key);
  },
  // 跳转到更多
  toMore:function (event) {
    var tit = event.currentTarget.dataset.tit;
    wx.navigateTo({
      url: "/pages/test/movie-more/movie-more?tit=" + tit
    })
 },
//  搜索
  onfocus:function (event) {
    this.setData({
      focus: true,
      blur: false
    })
  },
  onblur:function (event) {
  var text = event.detail.value;
  console.log(text);
  var searchUrl = app.globalData.url +"/v2/movie/search?q="+text;
  this.getmovielist(searchUrl, "searchUrl", "");
  },
  closesearch: function () {
    this.setData({
     focus: false,
      blur: true
    })
  },
  // 跳转详情页面
  toDetail: function (event) {
    var postid = event.currentTarget.dataset.postid;
    console.log("详情" + postid);
    wx.navigateTo({
      url: 'detail/detail?id=' + postid,
    })
  }
})