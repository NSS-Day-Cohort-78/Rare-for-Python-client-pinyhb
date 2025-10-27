import { createContext, useState } from "react"

export const TagsContext = createContext()

export const TagsProvider = ({ children }) => {
	const [tags, setTags] = useState([])
	const [tag, setTag] = useState({})

	const getAllTags = () => {
		fetch(`http://localhost:8088/tags`)
			.then(res => res.json())
			.then(setTags)
	}

	const getTagById = id => {
		fetch(`http://localhost:8088/tags/${id}`)
			.then(res => res.json())
			.then(setTag)
	}
	return (
		<TagsContext.Provider value={{ tags, getAllTags, tag, getTagById }}>
			{children}
		</TagsContext.Provider>
	)
}
