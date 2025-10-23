import { useNavigate } from "react-router-dom"

export const EditCategoryButton = ({id}) => {
    const navigate = useNavigate()

    const handleEditCategory = () => navigate(`/edit-category/${id}`)

    return(
        <button className="button mx-2 is-link" onClick={handleEditCategory}>Edit</button>
    )
}