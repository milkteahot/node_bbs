var express = require("express");
var router = express.Router();
var Post = reuqre("../models/Post");

//Index
router.get("/", function(req,res){
    Post.find({}) // 나중에 생성된 data가 위로 오도록 정렬.
    .sort("-createdAt") // db에서 data를 어떻게 찾을지, 정렬할지를 함수로 표현
    //정렬할 항목명을 문자열로 넣으면 오름차순 정렬, -를 앞에 붙이면 내림차순, {createdAt:1}, {createdAt:-1} <-두가지 이상으로 정렬인 경우.
    .exec(function(err, posts){ // exec 안의 함수에서 해당 data를 받아와서 할일을 정한다.
        if(err) return res.json(err);
        res.render("posts/index", {posts:posts});
    });
});

//New
router.get("/new", function(req,res){
    res.render("posts/new");
});

//create
router.post("/", function(req,res){
    Post.create(req.body, function(err,post){
        if(err) return res.json(err);
        res.redirect("/posts");
    });
});

// show
router.get("/:id", function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render("posts/show", {post:post});
    });
  });
  
  // edit
  router.get("/:id/edit", function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render("posts/edit", {post:post});
    });
  });
  
  // update
  router.put("/:id", function(req, res){
    req.body.updatedAt = Date.now(); // 2
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect("/posts/"+req.params.id);
    });
  });
  
  // destroy
  router.delete("/:id", function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect("/posts");
    });
  });
  
  module.exports = router;