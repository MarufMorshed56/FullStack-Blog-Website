const  router = require('express').Router()

const Post = require('../model/Post')


router.get('/',async(req,res)=>{
          const queryname = req.query.name.toUpperCase();
          //const search = req.params.id
          try{      
//           MongoDB Aggregation was Ideal & but as we have very few Post we are just gettig everything & then filtering on The front end instead of utilizing MongoDB computation power
                                                                                 
                    const  posts =  await Post.find()
                    //let sortedProducts = [...products]
                    
                    let sortedPosts = posts.filter((post)=>{
                              return post.title.toUpperCase().includes(queryname)
                    })
                    
                    res.status(200).json(sortedPosts)

          }catch(error){
                    res.status(500).json(error)
          }
})

module.exports = router