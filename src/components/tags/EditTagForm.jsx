import React, { useCallback, useContext, useEffect } from "react"
import { useParams } from "react-router-dom"

export const EditTagForm = () => {
	const { id } = useParams()
	const { tag, getTagById } = useContext()

	useEffect(() => {
		getTagById(id)
	}, [])
	return (
		<div className="container">
			<h1 className="title">Edit Tag</h1>
			<form className="container">
				<fieldset>
					<input type="text" />
				</fieldset>
			</form>
		</div>
	)
}
