import { pool } from '../config/dbconfig.js';

// GETTING EVERY POST
const getPosts = async (req, res) => {
    try {
        const [posts] = await pool.query('SELECT users.user_name, posts.* FROM posts LEFT JOIN users ON posts.post_author_id = users.user_id');
        res.json(posts);
    } catch (error) {
        console.log(error);
    }
}

// GETTING POST DEPENDING ON AUTHOR AND POST ID [WITH ITS COMMENTS]
const getPost = async (req, res) => {
    try {
        // SELECTING POST DATA
        const [post] = await pool.query(`
        SELECT 
        u.user_name, u.user_nick, p.*
        FROM posts AS p
        INNER JOIN users AS u
        ON p.post_author_id=u.user_id
        WHERE u.user_name=  ?
        AND p.post_id = ?`, [req.params.user, req.params.id]);

        // SELECTING COMMENT DATA BY POST [WE TAKE POST ID BY PARAMS]
        const [comments] = await pool.query(`
        SELECT c.comment_id, c.comment_content, c.comment_at, c.comment_likes, c.comment_dislikes, u.user_name, p.post_id
        FROM comments AS c
        LEFT JOIN users AS u
        ON c.comment_author_id = u.user_id
        LEFT JOIN posts AS p
        ON c.comment_post_id = p.post_id
        WHERE p.post_id = ?
        ORDER BY c.comment_at DESC`, [req.params.id]);

        // SENDING AN OBJECT WITH POST AND COMMENT DATA
        res.json({post, comments});
    } catch (error) {
        console.log(error);
    }
}

// LETS CREATE A POST :D
const onCreateNewPost = async (req, res) => {
    try {
        const {user_id, postTitle, postInfo}  = req.body[0];
        const [newPost] = await pool.query(`
            INSERT INTO posts
            (post_author_id, post_title, post_info)
            VALUES (?, ?, ?)
        `, [user_id, postTitle, postInfo]);
        res.send('publicación creada');
    } catch (error) {
        console.log(req.body[0])
    }
}

// ADD A COMMENT IN A POST
const onCreateNewComment = async (req, res) => {
    try {
        const {user_id, post_id, comment} = req.body[0];
        const [newComment] = await pool.query(`
            INSERT INTO comments
            (comment_author_id, comment_post_id, comment_content)
            VALUES (?, ?, ?)
        `, [user_id, post_id, comment]);
        res.send('comentario publicado');
    } catch (error) {
        console.log(error);
    }
}

export { onCreateNewPost, getPost, getPosts, onCreateNewComment }