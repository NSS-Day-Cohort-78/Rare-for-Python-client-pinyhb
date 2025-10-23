import { createContext, useState } from "react"

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState([])

	const getAllCategories = () => {
		fetch(`http://localhost:8088/categories`)
			.then(res => res.json())
			.then(setCategories)
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

	return (
		<CategoryContext.Provider
			value={{ categories, getAllCategories, createCategory }}>
			{children}
		</CategoryContext.Provider>
	)
}
