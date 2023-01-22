export const Comments = ({comments}) => {
    return (
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
    )
}
