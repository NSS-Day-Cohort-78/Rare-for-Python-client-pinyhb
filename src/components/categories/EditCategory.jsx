import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"

export const EditCategory = () => {
    const { category, getCategoryById } = useContext(CategoryContext)
    const [ categoryObj, setCategoryObj ] = useState({})
    const { updatedCategory, updateCategory } = useContext(CategoryContext)
    const { id } = useParams()
    const categoryId = parseInt(id)
    const navigate = useNavigate()

    useEffect(() => {
         getCategoryById(categoryId)
    }, [])

    useEffect(() => {
        setCategoryObj(category)
    }, [category])

    const handleSave = e => {
        e.preventDefault()

        const categoryToUpdate = {
            ...categoryObj,
            label: categoryObj.label
        }

        updateCategory(categoryToUpdate)
            .then(() => {
                navigate("/categories")
                console.log("Category updated!", categoryToUpdate)
            }) 
            .catch(error => {
				console.error("Error updating category:", error)
			}) 

    }

    const handleCancel = () => navigate("/categories")

    return (
        <>
            <div className="p-5 container">
                <h1>Edit Category</h1>
                <form>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                className="input"
                                type="text"
                                placeholder="Type here"
                                value={categoryObj.label || ""}
                                onChange={e => {
                                    const categoryCopy = { ...categoryObj }
                                    categoryCopy.label = e.target.value
                                    setCategoryObj(categoryCopy)
                                }}
                            />
                        </div>
                    </div>
                    <div className="field is-flex is-justify-content-center is-grouped">
                        <button onClick={handleSave} className="button is-link m-2">Save</button>
                        <button onClick={handleCancel} className="button is-link is-light m-2">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    )
}