import React from "react"

export const PostList = ({ post }) => {
	return (
		<tr>
			<td>{post.title}</td>
			<td>
				{post.user.first_name} {post.user.last_name}
			</td>
			<td>{post.publication_date}</td>
			<td>{post.category.label}</td>
			<td>put tags here</td>
		</tr>
	)
}
