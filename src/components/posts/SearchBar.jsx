import React, { useState } from "react"

export const SearchBar = ({ setFilteredPosts, posts }) => {
	const [searchTerm, setSearchTerm] = useState("")

	const handleChange = e => {
		setSearchTerm(e.target.value)
	}
	const handleKeyDown = e => {
		if (e.key === "Enter") {
			const filtered = posts.filter(p =>
				p.title.toLowerCase().includes(searchTerm.toLowerCase())
			)
			setFilteredPosts(filtered)
		}
	}
	return (
		<input
			className=""
			type="text"
			placeholder="Search"
			value={searchTerm}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	)
}
