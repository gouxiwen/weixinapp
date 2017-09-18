// movie-more.js
var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataurl: "",
    isEmpty: true,
    movies: [],
    start: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tit = options.tit;
    this.data.tit = tit;
    var url = "";
    switch (tit) {
      case "正在热映":
        url = app.globalData.url + "/v2/movie/in_theaters";
        this.getmovielist(url);
        break;
      case "即将上映":
        url = app.globalData.url + "/v2/movie/coming_soon";
        this.getmovielist(url);
        break;
      case "top250":
        url = app.globalData.url + "/v2/movie/top250";
        this.getmovielist(url);
        break;
    }
    this.data.dataurl = url;
  },
  getmovielist: function (url) {
    var that = this;
    // 向豆瓣api发送请求
    wx.request({
      url: url,
      method: "get",
      header: { "Content-Type": "json" },
      success: function (res) {
        that.getmovieMessage(res.data);
      }
    })
  },
  // 获取电影数据
  getmovieMessage: function (msg) {
    var movies = [];
    for (var i in msg.subjects) {
      var obj = msg.subjects[i];
      var title = obj.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }
      var average = obj.rating.average;
      var img = obj.images.large;
      var id = obj.id;
      var stars = obj.rating.stars;
      movies[i] = {
        title: title,
        average: average,
        img: img,
        id: id,
        stars: util.getswitchstars(stars)
      }
    }
    var totalmovies = [];
    this.data.start += 20;
    if (!this.data.isEmpty) {
      totalmovies = this.data.movies.concat(movies);
    } else {
      totalmovies = movies;
      this.data.isEmpty = false;
    }
    //动态数据加载

    this.setData({
      movies: totalmovies
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: this.data.tit
    })
  },
  // 上拉加载
  scrolltolower: function (event) {
    console.log("上拉成功");
    // 显示等待加载动画
    wx.showNavigationBarLoading();
    // 拼接刷新的url
    var lowerurl = this.data.dataurl + "?start=" + this.data.start;
    this.getmovielist(lowerurl);
    // 关闭刷新等待动画
    wx.hideNavigationBarLoading();
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 不在scroll-view中使用
  },
  scrolltoupper: function () {
    console.log("下拉成功");
    this.data.isEmpty = true;
    this.data.start = 0;
    movies: [];
    var upperurl = this.data.dataurl + "?start=" + this.data.start;
    this.getmovielist(upperurl);
  },
  // 跳转详情页面
  toDetail: function (event) {
    var postid = event.currentTarget.dataset.postid;
    console.log("详情" + postid);
    wx.navigateTo({
      url: '../detail/detail?id=' + postid,
    })
  }
})