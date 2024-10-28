import express from "express";
import User from "../models/user.js";
import Post from "../models/post.js";

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send('This is Blogs API');
})

apiRouter.post('/auth/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send({msg:'Logged Out'});
});

apiRouter.post('/auth/google', async (req, res) => {
    const {uid, name, email, token} = req.body;

    let user = await User.findOne({uid: uid});
    if (!user) {
        user = new User({uid, name, email, token});
        await user.save();
    }

    req.session.user = user;

    res.status(200).send('User Logged In');
})

apiRouter.post('/post/new', (req, res) => {
    if(!req.session.user){
        return res.status(401).send({msg:'Unauthorized'});
    }

    const {title, content, thumbnail } = req.body;
    if (!title || !content) {
        return res.status(400).send({msg:'Title and Content are required'});
    }

    const authorUid = req.session.user.uid;
    const post = new Post({
        title: title,
        content: content,
        author: authorUid,
        thumbnailUrl: thumbnail
    });
    post.save();
    
    res.status(200).send(JSON.stringify(post));
})

export default apiRouter;