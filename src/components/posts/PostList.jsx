import React from "react"

export const PostList = ({ post }) => {
	return (
		<tr>
			<td>{post.title}</td>
			<td>{post.user_id}</td>
			<td>{post.publication_date}</td>
			<td>{post.category_id}</td>
			<td>put tags here</td>
		</tr>
	)
}
