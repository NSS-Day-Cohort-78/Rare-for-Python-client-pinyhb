import React, { useState } from "react"

export const SearchBar = ({ setFilteredPosts, posts }) => {
	const [searchTerm, setSearchTerm] = useState("")

	const handleChange = e => {
		setSearchTerm(e.target.value)
	}
	const handleKeyDown = () => {
		const filtered = posts.filter(p =>
			p.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredPosts(filtered)
	}
	return (
		<div className="field has-addons">
			<p className="control">
				<input
					className="mx-2 input"
					type="text"
					placeholder="Search by title"
					value={searchTerm}
					onChange={handleChange}
					
				/>
			</p>
			<p className="control">
			<button onClick={handleKeyDown} className="button">Search</button>
			</p>
		</div>			
	)
}
