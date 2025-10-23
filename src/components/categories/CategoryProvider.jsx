import { createContext, useState } from "react"

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState([])
	const [category, setCategory] = useState({})

	const getAllCategories = () => {
		fetch(`http://localhost:8088/categories`)
			.then(res => res.json())
			.then(setCategories)
	}

	const getCategoryById = id => {
		fetch(`http://localhost:8088/categories/${id}`)
			.then(res => res.json())
			.then(setCategory)
	}

	const createCategory = category => {
		return fetch(`http://localhost:8088/categories`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify(category)
		})
	}

	const deleteCategory = id => {
		return fetch(`http://localhost:8088/categories/${id}`, {
			method: "DELETE"
		})
	}

	const updateCategory = updatedCategory => {
		return fetch(`http://localhost:8088/categories/${updatedCategory.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedCategory)
		})
	}

	return (
		<CategoryContext.Provider
			value={{
				categories,
				category,
				getAllCategories,
				getCategoryById,
				createCategory,
				deleteCategory,
				updateCategory
			}}>
			{children}
		</CategoryContext.Provider>
	)
}
