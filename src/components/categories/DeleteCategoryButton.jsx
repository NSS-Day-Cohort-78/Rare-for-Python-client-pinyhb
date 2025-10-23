import React, { useContext, useState } from "react"
import { CategoryContext } from "./CategoryProvider"

export const DeleteCategoryButton = id => {
	const [toggleModal, setToggleModal] = useState(false)
	const { deleteCategory } = useContext(CategoryContext)

	return !toggleModal ? (
		<button className="button" onClick={() => setToggleModal(true)}>
			Delete
		</button>
	) : (
		<div>
			<p>Are you sure you want to delete?</p>
			<button className="button" onClick={deleteCategory(id)}>
				Confirm
			</button>
			<button className="button" onClick={() => setToggleModal(false)}>
				Cancel
			</button>
		</div>
	)
}
