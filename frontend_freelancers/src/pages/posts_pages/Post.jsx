import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFreelanceContext } from '../../context/FreelanceContext';
import { Markup } from 'interweave';

export const Post = () => {

    const params = useParams();

    const { onGetPost } = useFreelanceContext();
    const [post, setPost] = useState({
        title: '',
        body: '',
        author: '',
        post_at: '',
        comments: {}
    });
    const [comments, setComments] = useState([])

    useEffect(() => {
        const loadPost = async () => {
            const post = await onGetPost(params.user, params.post_id);
            setPost({
                title: post.post[0].post_title,
                info: post.post[0].post_info,
                author: post.post[0].user_name,
                post_at: post.post[0].post_at
            });
            const comments = setComments([post.comments])
            return {post, comments};
        }
        loadPost();
    }, []);
 

    return (
        <>
            <div className="post-container">
                <div className="post-header">
                    <div className="post-info">
                        <p>
                            {post.author}
                        </p>
                        <p>
                            {post.post_at}
                        </p>
                    </div>
                    <p>
                        {post.title}
                    </p>
                </div>
                <div className="post-body">
                    <Markup content={post.info}/>
                </div>
            </div>
            <div className="comments-container">
                {comments.map(comment => 
                    comment.map(data => 
                        <div className="comment-container" key={data.comment_id}>
                            <div className="comment-header">
                                <p>
                                    {data.user_name}
                                </p>
                                <p>
                                    {data.comment_at}
                                </p>
                            </div>
                            <div className="comment-content">
                                <p>
                                    {data.comment_content}
                                </p>
                            </div>
                            <div className="comment-footer">
                                <span>
                                    {data.comment_likes}
                                </span>
                                <span>
                                    {data.comment_dislikes}
                                </span>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    )
}
