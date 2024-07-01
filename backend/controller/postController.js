import Post from "../model/postModel.js";

export const create = async(req,res)=>{
    try{
        const postData = new Post(req.body);
        if(!postData){
            return res.status(404).json({msg:"Post data not found"});
        }

        const savedData = await postData.save();
        res.status(200).json({savedData,msg:"Post Added Successfully!"});

    }catch (error){
        res.status(500).json({error:error});
    }
}

export const getAll = async(req,res)=>{
    try{
        const postData = await Post.find();
        if(!postData){
            return res.status(404).json({msg:"Data Not found"});
        }
        res.status(200).json(postData);
    }
    catch (error) {
        res.status(500).json({error:error});
    }
}

export const getOne = async(req,res)=>{
    try{
        const id = req.params.id;
        const postExist = await Post.findById(id);
        if(!postExist){
            return res.status(404).json({msg:"Post Not found"});
        }
        res.status(200).json(postExist);
    }
    catch (error) {
        res.status(500).json({error:error});
    }
}

export const update = async(req,res)=>{
    try{
        const id = req.params.id;
        const postExist = await Post.findById(id);
        if(!postExist){
            return res.status(404).json({msg:"Post Not found"});
        }

        const updatedData = await Post.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json({updatedData,msg:"Post Updated Successfully!"});
    }
    catch (error) {
        res.status(500).json({error:error});
    }
}

export const deletePost = async(req,res)=>{
    try{
        const id = req.params.id;
        const postExist = await Post.findById(id);

        if(!postExist){
            return res.status(404).json({msg:"Post Not found"});
        }
        await Post.findByIdAndDelete(id);
        res.status(200).json({msg:"Post Deleted Successfully!"});

    }
    catch (error){
        res.status(500).json({error:error});
    }
}

export const getAllByUser = async (req, res) => {
    try {
        const author = req.params.author;
        const postData = await Post.find({ author: author });
        if (!postData) {
            return res.status(404).json({ msg: "Data Not found" });
        }
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}