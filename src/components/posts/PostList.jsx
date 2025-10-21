import React from "react"
import { useNavigate } from "react-router-dom"

export const PostList = ({ post }) => {
	const navigate = useNavigate()

	return (
		<tr>
			<td
				className="is-clickable"
				onClick={() => navigate(`/posts/${post.id}`)}>
				{post.title}
			</td>
			<td
				className="is-clickable"
				onClick={() => navigate(`/user-posts/${post.user.id}`)}>
				{post.user.first_name} {post.user.last_name}
			</td>
			<td>{post.category.label}</td>
		</tr>
	)
}
