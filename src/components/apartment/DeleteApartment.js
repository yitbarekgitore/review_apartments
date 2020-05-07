import React, { useContext } from 'react'
import { ApartmentContext } from "./ApartmentProvider";
import { Button } from 'reactstrap';
import { FaTrash } from "react-icons/fa";

export default (props) => {
    const {apartments, deleteApartment} = useContext(ApartmentContext)
    const apartment = apartments.find(apt => apt.id === props.val)
    return(
        <>
            <div>Are you sure you want to delete {props.apartmentName}?</div>
            <Button color="danger" onClick={() => {
                deleteApartment(props.apartmentId)
                props.toggleDeleteApartment()
            }}><FaTrash /></Button>
        </>
    )
}