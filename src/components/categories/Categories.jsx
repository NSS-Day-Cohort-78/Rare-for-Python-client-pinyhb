import { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"
import { DeleteCategoryButton } from "./DeleteCategoryButton"
import { useNavigate } from "react-router-dom"

export const Categories = () => {
    const { categories, getAllCategories } = useContext(CategoryContext)
    const [allCategories, setAllCategories] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getAllCategories()
    }, [])

    useEffect(() => {
        const setAlphaOrder = categories.sort((a, b) => {
            return a.label.localeCompare(b.label)
        })
        console.log("Alphabetical categories:", setAlphaOrder)
        setAllCategories(setAlphaOrder)
    }, [categories])

    const handleAddCategory = () => navigate("/add-category")

    return (
        <>
            <div className="p-5 container">
                <h1>All Categories</h1>
                <table className="table is-bordered is-flex">
                    <tbody>
                        {allCategories.map(category => 
                            {return (<tr key={category.id} id={category.id}>
                                <td className="is-flex is-align-items-center">       
                                    {category.label}
                                        <button className="button m-3">Edit</button>
                                        <DeleteCategoryButton />
                                </td>
                            </tr>)}
                        )}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <button className="button" onClick={handleAddCategory}>Create New Category</button>
            </div>
        </>
    )
}