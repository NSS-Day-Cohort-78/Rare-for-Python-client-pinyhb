import React, { useContext, useEffect, useState } from "react"
import { CategoryContext } from "../categories/CategoryProvider"

export const FilterCategory = ({ setFilteredPosts, posts }) => {
	const { categories, getAllCategories } = useContext(CategoryContext)
	const [selectedCategory, setSelectedCategory] = useState(0)

	useEffect(() => {
		getAllCategories()
	}, [])

	const handleChange = e => {
		setSelectedCategory(parseInt(e.target.value))
	}

	useEffect(() => {
		if (selectedCategory > 0) {
			const filtered = posts.filter(
				p => p.category.id === selectedCategory
			)
			setFilteredPosts(filtered)
		} else {
			setFilteredPosts(posts)
		}
	}, [selectedCategory])
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
		// <div className="dropdown is-active">
		// 	<div className="dropdown-trigger">
		// 		<button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
		// 			<span>Dropdown button</span>
		// 			<span class="icon is-small">
		// 				<i class="fas fa-angle-down" aria-hidden="true"></i>
		// 			</span>
		// 		</button>
		// 	</div>
		// <div className="dropdown-menu" id="dropdown-menu" role="menu">
		// 	<div 
		// 		className="dropdown-content"
		// 		onChange={handleChange}
		// 		name="categories"
		// 		id="filter-categories"
		// 		value={selectedCategory}>
		// 	{/* <option value="0">Select a category</option> */}
		// 		{categories &&
		// 			categories.map(c => (
		// 				<a href="/" key={c.id} value={c.id} className="dropdown-item">
		// 					{c.label}
		// 				</a>
		// 			))}
		// 	</div>
		// </div>	
		// </div>
	)
}
