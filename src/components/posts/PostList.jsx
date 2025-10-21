import React from "react"
import { useNavigate } from "react-router-dom"

export const PostList = ({ post }) => {
	const navigate = useNavigate()

	const navToEditPost = () => {
		navigate(`/edit-post/${post.id}`)
	}

	return (
		<tr>
			<td>{post.title}</td>
			<td>
				{post.user.first_name} {post.user.last_name}
			</td>
			<td>{post.publication_date}</td>
			<td>{post.category.label}</td>
			<td><button onClick={navToEditPost}>Edit</button></td>
			<td>put tags here</td>
		</tr>
	)
}
