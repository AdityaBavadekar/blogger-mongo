import express from 'express';
const router = express.Router();
import Post from '../models/post.js';
import User from '../models/user.js';

function collectBasicLocals(req) {
    return {
        loggedIn: req.session.user ? true : false,
        user: req.session.user
    }
}

// Main Home page
router.get('/', async (req, res) => {
    var { author } = req.query;
    var selectionClause = {}
    if (author == 'ME'){
        author = req.session.user ? req.session.user.uid : null;
        selectionClause = {
            author: author
        }
    }
    
    try {
        const locals = collectBasicLocals(req);
        const postsData = await Post.find(selectionClause).sort({ createdAt: 'desc' });
        
        for (let index = 0; index < postsData.length; index++) {
            const post = postsData[index];
            post.content = post.content.substring(0,100) + '...';
            post['authorUid'] = post.author;
            const authorName = await User.find({ uid: post.author })
            post.author = authorName[0].name;
            postsData[index] = post;
        }
        res.render('index.ejs', { locals, posts: postsData });
    } catch (error) {
        console.log("Error in Home Page", error);
    }
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    if (!postId) {
        return res.render('not-found');
    }
    Post.findById(postId)
    .then(post => {
        if(!post) {
            return res.render('not-found');
        }
        User.find({uid : post.author})
        .then(user => {
            if(user.length == 0) {
                return res.render('not-found');
            }
            const locals = collectBasicLocals(req);
            locals.title = post.title;
            res.render('post', { locals:locals, post: post, author: user[0] });
        })
        .catch(err => {
            console.log("Error in finding user by id", err);
            res.render('/not-found');
        })
    })
    .catch(err => {
        console.log("Error in finding post by id", err);
        res.render('/not-found');
    })
})

router.get('/about', (req, res) => {
    const locals = collectBasicLocals(req);
    locals.title = "About Blogger";
    res.render('about', { locals });
})

router.get('/new', (req, res) => {
    const locals = collectBasicLocals(req);
    // if (!req.session.user) {
    //     console.log("User not logged in");
    //     return res.redirect('/login');
    // }
    res.render('create-new', {post:null, author:null, locals});
})

export default router;
