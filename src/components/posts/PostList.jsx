import React from "react"
import { useNavigate } from "react-router-dom"

export const PostList = ({ post }) => {
	const navigate = useNavigate()

	return (
		<tr
			className="is-clickable"
			onClick={() => navigate(`/posts/${post.id}`)}>
			<td>{post.title}</td>
			<td>
				{post.user.first_name} {post.user.last_name}
			</td>
			<td>{post.category.label}</td>
		</tr>
	)
}
