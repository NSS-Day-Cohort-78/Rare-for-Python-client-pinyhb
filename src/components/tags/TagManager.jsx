import React, { useContext, useEffect } from "react"
import { TagsContext } from "./TagsProvider"
import { TagsList } from "./TagsList"

export const TagManager = () => {
	const { tags, getAllTags } = useContext(TagsContext)

	useEffect(() => {
		getAllTags()
	}, [])
	return (
		<div className="container">
			<h1 className="title">Tag Management</h1>

			<div className="container">
				{tags.map(t => (
					<TagsList key={t.id} tag={t} />
				))}
			</div>
		</div>
	)
}
