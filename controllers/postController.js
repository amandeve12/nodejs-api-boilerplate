const Post = require("../models/Post");

const addPost = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const post = await Post.create({
            title: title.trim(),
        });

        return res.status(201).json({ 
            success: true,
            post,
        });
    } catch (error) {
        console.error("❌ Add post error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create post",
        });
    }
};


const getPost =  async (req,res)=>{
    const posts = await Post.find({})
    return res.status(201).json({
        sucesss:true,
        data :posts
    })
}


const getDelete =  async (req,res)=>{
const {id} = req.query

if(!id) res.status(400).json({success:false, 
                message: "Id is required",

})

    const posts = await Post.deleteOne({_id:id})
    return res.status(201).json({
        sucesss:true,
        data :posts
    })

}

module.exports = { addPost,getPost,getDelete};