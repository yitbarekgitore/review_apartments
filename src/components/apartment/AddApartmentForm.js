import React, { useContext, useRef, useState } from "react"
import { ApartmentContext } from "./ApartmentProvider"
import { UserContext } from "../user/UserProvider"
import axios from 'axios'
import './Apartment.css'

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
        const res = await fetch("https://api.cloudinary.com/v1_1/dgmlysx6a/image/upload/", {
            method:"POST",
            body: formData
        }) 
        const response = await res.json()
        file = response.secure_url
        setApartmentImage(file)  
        setLoading(false)        
    }
    const apartmentName = useRef()
    const city = useRef()
    const state = useRef()
    const description = useRef()
    const userId = localStorage.getItem('reviewApartment_user')
    const user = users.find(u => u.id === parseInt(userId))
    const addNewApartment = () => {
        if (userId) {
            if(apartmentImage !== "" && apartmentName !== ""&& city !== ""&& state !== "" && description !== ""){
                addApartment({
                    userId:parseInt(userId),
                    uploadImage: apartmentImage,
                    apartmentName: (apartmentName.current.value).toLowerCase(),
                    city: city.current.value,
                    state: state.current.value,
                    description: description.current.value,
                    date_time: Date.now()
                })
                .then(props.showAllApartments)
            }else{
                window.alert("All fields are required")
            }
        }
    }
   
    return (
        
        <form className="apartmentForm">
            <fieldset>
                <div className = "createNewApartment">Create New Apartment</div>
                <div>
                    <input type = "file" name = "file" onChange = {upload_Image} />
                    {loading ? "Loading": <img className = "uploadImage" style = {{width:"150px"}}src = {apartmentImage} />}
                </div>
                <input
                    type="text"
                    id="apartmentName"
                    ref={apartmentName}
                    className="_cApartment_name"
                    placeholder="apartment name"
                    maxLength = "30"
                    autoFocus
                />
                <div>
                    <input
                        type="text"
                        id="city"
                        ref={city}
                        required
                        className="_cApartment_city"
                        placeholder="city"
                        maxLength = "30"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="state"
                        ref={state}
                        className="_cApartment_state"
                        placeholder="state"
                        maxLength = "30"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="description"
                        ref={description}
                        className="_cApartment_description"
                        placeholder="description"
                        maxLength = "175"
                    />
                </div>
                <div 
                    className = "created_by">by:-  
                    { 
                        user.userName.charAt(0).toUpperCase() + 
                        user.userName.slice(1)
                    }
                </div>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault() // Prevent browser from submitting the form
                            addNewApartment()
                        }
                    }
                    className="btn btn-info btn-create_apartment" size = "sm">
                    Create 
                </button>
            </fieldset>
        </form>
    )
}