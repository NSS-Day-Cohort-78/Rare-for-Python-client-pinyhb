import { createContext, useState } from "react"

export const CategoryContext = createContext()

export const CategoryProvider = ({ children }) => {
	const [categories, setCategories] = useState([])

	const getAllCategories = () => {
		fetch(`http://localhost:8088/categories`)
			.then(res => res.json())
			.then(setCategories)
	}

	return (
		<CategoryContext.Provider value={{ categories, getAllCategories }}>
			{children}
		</CategoryContext.Provider>
	)
}
