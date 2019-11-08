var mongoose = require("mongoose");

//schema
var postSchema = mongoose.Schema({ // 스키마 구성 4가지
    title:{type:String, required:true}, 
    body:{type:String},
    createdAt:{type:Date, default:Date.now}, // Date.now 는 현재시간 리턴, default에 함수명을 넣으면 해당 함수의 return 이 기본값 됨.
    updateAt:{type:Date},
}, {
    toObject:{virtuals:true} // 
});

// virtuals // 실제 db에 저장되진 않지만 model에서는 db에 있는 다른 항목과 동일하게 사용 가능.
postSchema.virtual("createdDate")
.get(function(){
  return getDate(this.createdAt);
});

postSchema.virtual("createdTime")
.get(function(){
  return getTime(this.createdAt);
});

postSchema.virtual("updatedDate")
.get(function(){
  return getDate(this.updatedAt);
});

postSchema.virtual("updatedTime")
.get(function(){
  return getTime(this.updatedAt);
});

// model & export
var Post = mongoose.model("post", postSchema);
module.exports = Post;

// functions
function getDate(dateObj){
  if(dateObj instanceof Date)
    return dateObj.getFullYear() + "-" + get2digits(dateObj.getMonth()+1)+ "-" + get2digits(dateObj.getDate());
}

function getTime(dateObj){
  if(dateObj instanceof Date)
    return get2digits(dateObj.getHours()) + ":" + get2digits(dateObj.getMinutes())+ ":" + get2digits(dateObj.getSeconds());
}

function get2digits(num){
  return ("0" + num).slice(-2);
}