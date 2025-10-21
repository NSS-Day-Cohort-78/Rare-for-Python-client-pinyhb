import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostList } from "./PostList"
import { SearchBar } from "./SearchBar"

export const Posts = () => {
	const { posts, getAllPosts } = useContext(PostContext)
	const [filteredPosts, setFilteredPosts] = useState()

	useEffect(() => {
		getAllPosts()
	}, [])

	useEffect(() => {
		setFilteredPosts(posts)
	}, [posts])

	return (
		<>
			<div className="p-5">
				<SearchBar setFilteredPosts={setFilteredPosts} posts={posts} />
			</div>
			<div className="p-5">
				<table className=" table is-bordered is-fullwidth">
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
						{filteredPosts &&
							filteredPosts.map(post => (
								<PostList key={post.id} post={post} />
							))}
					</tbody>
				</table>
			</div>
		</>
	)
}
