import React, { useContext } from 'react'
import { ApartmentContext } from "./ApartmentProvider";
import { Button } from 'reactstrap';
import "./Apartment.css"
export default (props) => {
    const {apartments, deleteApartment} = useContext(ApartmentContext)
    const apartment = apartments.find(apt => apt.id === props.val)
    return(
        <>
            <div>Are you sure you want to delete {props.apartmentName}?</div>
            <Button 
                color="danger" 
                className = "delete_Apartment"
                onClick={
                    () => {
                    deleteApartment(props.apartmentId)
                    props.toggleDeleteApartment()
                }
            }>Deleteee</Button>
        </>
    )
}