import React from "react"

export const CommentsList = ({ comment }) => {
	return (
		<div className=" p-5 comment container is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
			<h2>{comment.category.label}</h2>
			<p>{comment.content}</p>
			<p>{comment.author.username}</p>
		</div>
	)
}
