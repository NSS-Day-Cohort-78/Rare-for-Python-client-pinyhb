import React, { useContext, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useNavigate } from "react-router-dom"

export const AddCategory = () => {
	const { createCategory } = useContext(CategoryContext)
	const [label, setLabel] = useState({ label: "" })

	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		if (label !== "") {
			createCategory(label).then(() => navigate("/"))
		} else {
			window.alert("fill out the form")
		}
	}
	return (
		<div className="container">
			<h1>Add Category</h1>
			<form onSubmit={handleSubmit}>
				<fieldset className="field is-flex is-flex-direction-column is-align-items-center">
					<label className="label">Category</label>
					<input
						className="input"
						type="text"
						placeholder="Category"
						value={label.label}
						onChange={e => {
							const copyLabel = { ...label }
							copyLabel.label = e.target.value
							setLabel(copyLabel)
						}}
					/>
				</fieldset>
				<button className="button is-fullwidth">Submit</button>
			</form>
		</div>
	)
}
