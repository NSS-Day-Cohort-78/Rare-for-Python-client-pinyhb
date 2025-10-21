import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { PostList } from "./PostList"

export const Posts = () => {
	const { posts, getAllPosts } = useContext(PostContext)

	useEffect(() => {
		getAllPosts()
	}, [])
	return (
		<>
			<table className="table is-bordered is-fullwidth">
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Date</th>
						<th>Category</th>
						<th>Tags</th>
					</tr>
				</thead>

				<tbody>
					{posts.map(post => (
						<PostList key={post.id} post={post} />
					))}
				</tbody>
			</table>
		</>
	)
}
