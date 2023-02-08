const  router = require('express').Router()

const Post = require('../model/Post')
// const CryptoJS = require('crypto-js')

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndAuthor} = require('./verifyToken')

//CREATE NEW POST

router.post('/', async(req,res)=>{
          try {     
                    const newPost = new Post(req.body)
                    const savedPost= await newPost.save();
//                     const allPost = await Post.find().sort({createdAt:-1})
                    res.status(200).json(savedPost)
          }catch (error) {
                    res.status(500).json(error)
          }
})

// UPDATE POST //post id

router.put("/:id", async(req,res)=>{            //verifyTokenAndAuthor 
          try {
                    const updatedPost = await Post.findByIdAndUpdate(
                              req.params.id,{
                              $set: req.body
                              },{new:true}
                    ) 
                    res.status(200).json(updatedPost)
          } catch (error) {
                    res.status(500).json(error)
          }        
})

// DELETE POST

router.delete("/:id", async(req,res)=>{
                                                                                                      //verifyTokenAndAuthor 
          try {
                    const deletedPost = await Post.findByIdAndDelete(req.params.id)

                    const Posts = await Post.find().sort({createdAt:-1}) 
                    res.status(200).json(Posts)
          } catch (error) {
                    res.status(500).json(error)
          }

})


//GET SINGLE POST

router.get("/find/:id", async(req,res)=>{
          try {
                    const post = await Post.findById(req.params.id)
                    res.status(200).json(post)
          } catch (error) {
                    res.status(500).json(error)
          }

})

//GET ALL POSTS

router.get("/", async(req,res)=>{
          const queryName = req.query.author
          const queryCategory = req.query.category;
//           console.log(queryCategory)
//           console.log(queryName)

          try {
                    let posts = ""
                     if(queryName  && queryCategory )
                     {
                               posts = await Post.find({categories:{
                              $in: [queryCategory]},
                              username:queryName})    
                             
                    }else if(queryName){
                             posts = await Post.find({username:queryName})
                             
                    }else if(queryCategory){
                             posts = await Post.find({categories:{$in:[queryCategory],
                              }})              
                    }else{
                               posts = await Post.find().sort({createdAt:-1})
                    }
//                     else{
//                               Posts = await Post.find() 
//                     }

                    // const users = query? await User.find().sort({ _id: -1 }).limit(5):await User.find();

                    res.status(200).json(posts)

          } catch (error) {
                    res.status(500).json(error)
          }

})

module.exports = router