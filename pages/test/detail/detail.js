// detail.js
var util = require("../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    casts: [],
    castsName:'',
    genres:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收来自url的id
    var postid = options.id;
    var detailurl = app.globalData.url + "/v2/movie//subject/"+postid;
    this.getmovielist(detailurl);
  },
  getmovielist: function (url) {
    var that = this;
    // 向豆瓣api发送请求
    wx.request({
      url: url,
      method: "get",
      header: { "Content-Type": "json" },
      success: function (res) {
        console.log(res.data);
        that.getmovieMessage(res.data);
      }
    })
  },
  getmovieMessage: function (msg) {
    var original_title = msg.original_title;
    var image = msg.images.large;
    var countries = msg.countries.join("/");
    var year = msg.year;
    var collect_count = msg.collect_count;
    var comments_count = msg.comments_count;
    var stars = msg.rating.stars;
    var average = msg.rating.average;
    var director = msg.directors[0].name;
    var casts = msg.casts;
    var genres = msg.genres.join("、");
    var summary = msg.summary;
    var castsName = [];
    for (var i in casts) {
      castsName[i] = casts[i].name;
    }
    this.setData({
      original_title: original_title,
      image: image,
      countries: countries,
      year: year,
      collect_count: collect_count,
      comments_count: comments_count,
      stars: util.getswitchstars(stars) ,
      average: average,
      director: director,
      casts: casts,
      castsName: castsName.join("/"),
      genres: genres,
      summary: summary
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }
})