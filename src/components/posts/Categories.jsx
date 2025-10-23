import { useContext, useEffect, useState } from "react"
import { CategoryContext } from "./CategoryProvider"

export const Categories = () => {
    const { categories, getAllCategories } = useContext(CategoryContext)
    const [allCategories, setAllCategories] = useState()

    useEffect(() => {
        getAllCategories()
    }, [])

    // useEffect(() => {
    //     categories.map(category => 
    //         setAllCategories(category)
    //     )
    // }, [categories])

    return (
        <>
            <div className="p-5 container">
                <table className="table is-bordered is-fullwidth">
                    <tbody>
                        <tr>
                            <td>
                                All Categories
                            </td>
                        </tr>
                        {categories.map(category => 
                            <tr key={category.id} id={category.id}>
                                <td>       
                                    {category.label}
                                    <button className="m-3">Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button className="container">Create New Category</button>
        </>
    )
}