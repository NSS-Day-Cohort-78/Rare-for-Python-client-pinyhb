import React, { useContext, useEffect, useState } from "react"
import { PostContext } from "./PostProvider"
import { PostList } from "./PostList"
import { SearchBar } from "./SearchBar"
import { useParams } from "react-router-dom"
import { FilterCategory } from "./FilterCategory"

export const Posts = () => {
	const { posts, getAllPosts } = useContext(PostContext)

	const [filteredPosts, setFilteredPosts] = useState()
	const { user } = useParams()

	useEffect(() => {
		getAllPosts()
	}, [])

	useEffect(() => {
		if (user) {
			const userPosts = posts.filter(p => p.user.id === parseInt(user))
			setFilteredPosts(userPosts)
		} else {
			setFilteredPosts(posts)
		}
	}, [posts, user])

	return (
		<>
			<div className="p-5">
				<SearchBar setFilteredPosts={setFilteredPosts} posts={posts} />
				<FilterCategory
					setFilteredPosts={setFilteredPosts}
					posts={posts}
				/>
			</div>
			<div className="p-5">
				<table className=" table is-bordered is-fullwidth">
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{filteredPosts &&
							filteredPosts.map(
								post =>
									post.approved && (
										<PostList key={post.id} post={post} />
									)
							)}
					</tbody>
				</table>
			</div>
		</>
	)
}
