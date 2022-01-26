import React from "react";
import Card from "../card/Card";

const ModalCard = ({selectedRobot, closeModal, modal}) => {
    return(modal && <div className="modal w-100 h-100 top-0 bg-black-80 fixed fixed--fill flex justify-center items-center" onClick={()=>{closeModal(false)}}>
        <Card 
            id={selectedRobot.id} 
            name={selectedRobot.name} 
            email={selectedRobot.email} 
            onSelectedRobotChange={()=>{}}
        />
    </div>);
}

export default ModalCard;