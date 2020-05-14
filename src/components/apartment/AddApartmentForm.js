import React, { useContext, useRef, useState } from "react"
import { ApartmentContext } from "./ApartmentProvider"
import { UserContext } from "../user/UserProvider"
import axios from 'axios'

export default props => {
    const { addApartment } = useContext(ApartmentContext)    
    const { users } = useContext(UserContext)
    const [apartmentImage, setApartmentImage] = useState('')
    const [loading, setLoading] = useState(false)
    let file = ""

    const upload_Image = async e => {
        const files = e.target.files[0]
        const formData = new FormData()
        formData.append("upload_preset", "review_apartments")
        formData.append("file", files)
        setLoading(true)
        const res = await fetch("https://api.cloudinary.com/v1_1/dgmlysx6a/image/upload", {
            method:"POST",
            body: formData
        }) 
        const response = await res.json()
        file = response.secure_url
        setApartmentImage(file)  
        setLoading(false)
        console.log("file", file)
        
    }
    const apartmentName = useRef()
    const city = useRef()
    const state = useRef()
    const description = useRef()
    const userId = localStorage.getItem('reviewApartment_user')
    const user = users.find(u => u.id === parseInt(userId))
    const addNewApartment = () => {
        if (userId) {
            addApartment({
                userId:parseInt(userId),
                uploadImage: apartmentImage,
                apartmentName: apartmentName.current.value,
                city: city.current.value,
                state: state.current.value,
                description: description.current.value,
            })
            .then(props.showAllApartments)
        }
    }

    return (
        <form className="apartmentForm">
            <h5 className="Create_new_apartment">Create New Apartment</h5>
                <div>
                    <input type = "file" name = "file" onChange = {upload_Image} />
                    {loading ? "Loading": <img className = "uploadImage" style = {{width:"200px"}}src = {apartmentImage} />}
                </div>
                <input
                    type="text"
                    id="apartmentName"
                    ref={apartmentName}
                    className="form-control"
                    placeholder="Apartment name"
                />
                <div>
                    <input
                        type="text"
                        id="city"
                        ref={city}
                        required
                        className="form-control"
                        placeholder="city"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="state"
                        ref={state}
                        className="form-control"
                        placeholder="State"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="description"
                        ref={description}
                        className="form-control"
                        placeholder="Description"
                    />
                </div>
                <div>
                <div>By: { user.userName.charAt(0) + user.userName.slice(1)}</div>
            </div>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        addNewApartment()
                    }
                }
                className="btn btn-primary">
                Create 
            </button>
        </form>
    )
}