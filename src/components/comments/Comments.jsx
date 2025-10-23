import React, { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CommentsContext } from "./CommentsProvider"
import { CommentsList } from "./CommentsList"
import "./comment.css"

export const Comments = () => {
	const { id } = useParams()

	const navigate = useNavigate()
	const { getAllComments, comments } = useContext(CommentsContext)
	useEffect(() => {
		getAllComments(id)
	}, [])

	return (
		<div className=" container p-5">
			<h1 className="title center">
				{comments && comments[0]?.post.title}
			</h1>
			<button className="button" onClick={() => navigate(`/posts/${id}`)}>
				Back to Post
			</button>
			{comments &&
				comments.map(c => <CommentsList key={c.id} comment={c} />)}
		</div>
	)
}
