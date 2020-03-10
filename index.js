//Mongoose module
let mongoose = require("mongoose");

//Connecting to mongoose database
mongoose
    .connect("mongodb://localhost/kan") //connect is a promises type method. so giving the promises.
    .then(()=>console.log("Database is connected"))
    .catch(error=>console.log("Something went wrong",error.message));

//Schema will be stored in the mongoose's schema method.
let courseSchema = new mongoose.Schema({
    name:{type:String},
    courses:[String],
    isPublished:{type: Boolean},
    price:{type: Number},
    date: {type: Date, default: Date.now()}
});

//Model = Collection = Tables
let courseModel = mongoose.model("courses",courseSchema); ;//courses is the name of collection and it should be in courseSchema type

async function createCourse(){
    let data = new courseModel({
        name:"MAK",
        courses:["NodeJS","Backend"],
        isPublished:true,
        price:2000
    });
    let item = await data.save();
    console.log(item);
};
//createCourse();

async function fetchCourses(){
    let courses = await courseModel
        //.find({name:"MAK"})
        //.find({price: {$gt:100,$lte:600} })
        // .find({
        //     price:{
        //         $in:[100,200,600]        //Include prices with 100,200 and 600 only
        //     }
        // })
        .find()
        //.and([{name:"MAK"}],[{price:200}])
        .or([{name:"MAK"}],[{price:200}]) //adding conditions as an arrays
        .sort("-name") //- for descending
        .select("-price -isPublished")//use -to exclude
        .limit(3)
        ;
}
fetchCourses();











