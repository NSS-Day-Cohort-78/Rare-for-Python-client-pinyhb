import { createContext, useState } from "react"

export const TagsContext = createContext()

export const TagsProvider = ({ children }) => {
	const [tags, setTags] = useState([])

	const getAllTags = () => {
		fetch(`http://localhost:8088/tags`)
			.then(res => res.json())
			.then(setTags)
	}

	return (
		<TagsContext.Provider value={{ tags, getAllTags }}>
			{children}
		</TagsContext.Provider>
	)
}
