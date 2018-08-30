const mongoose=require('mongoose'); //引入mongoose功能模块
const Schema=mongoose.Schema;  //调用 mongoose 提供的 Schema 接口，创建一个新的接口 Schema
//Schema 会映射 mongoDB 数据库的一个collection集合
//一个collection 类似于一个类
const MovieSchema= new Schema(   
    {
    title:{type:String,required:true},
    post:{type:String},
    director: { type: String },
    data: { type: String },
    score: { type: String },
   },
{timestamps:true}

);
module.exports = mongoose.model('Movie', MovieSchema);