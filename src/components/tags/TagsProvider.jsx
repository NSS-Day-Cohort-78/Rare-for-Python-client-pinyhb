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

	const updateTag = (id, body) => {
		return fetch(`http://localhost:8088/tags/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}

	const deleteTag = id => {
		return fetch(`http://localhost:8088/tags/${id}`, {
			method: "DELETE"
		})
	}

	const createTag = body => {
		return fetch(`http://localhost:8088/tags`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
	}
	return (
		<TagsContext.Provider
			value={{
				tags,
				getAllTags,
				tag,
				setTag,
				getTagById,
				updateTag,
				deleteTag,
				createTag
			}}>
			{children}
		</TagsContext.Provider>
	)
}
