import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"

export const FilterCategory = ({ setFilteredPosts, posts }) => {
	const { categories, getAllCategories } = useContext(CategoryContext)
	const [selectedCategory, setSelectedCategory] = useState(0)

	useEffect(() => {
		getAllCategories()
	}, [])

	const handleChange = e => {
		if (selectedCategory > 0) {
			setSelectedCategory(parseInt(e.target.value))
			const filtered = posts.filter(
				p => p.category.id === selectedCategory
			)
			setFilteredPosts(filtered)
		} else {
			setFilteredPosts(posts)
		}
	}
	return (
		<select
			onChange={handleChange}
			name="categories"
			id="filter-categories"
			value={selectedCategory}>
			<option value="0">Select a category</option>
			{categories &&
				categories.map(c => (
					<option key={c.id} value={c.id}>
						{c.label}
					</option>
				))}
		</select>
	)
}
