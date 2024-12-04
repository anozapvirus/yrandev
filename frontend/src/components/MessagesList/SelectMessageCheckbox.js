import React, { useContext, useState } from "react";
import toastError from "../../errors/toastError";
import { Checkbox } from "@mui/material";
import { ForwardMessageContext } from "../../context/ForwarMessage/ForwardMessageContext";

const SelectMessageCheckbox = ({ message }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { showSelectMessageCheckbox, setSelectedMessages, selectedMessages } = useContext(ForwardMessageContext);

    const handleSelectMessage = (e, message) => {
        setIsChecked(e.target.checked);
        const updatedList = e.target.checked
            ? [...selectedMessages, message]  // Adiciona mensagem se marcada
            : selectedMessages.filter((m) => m.id !== message.id);  // Remove mensagem se desmarcada

        setSelectedMessages(updatedList);
    };

    if (showSelectMessageCheckbox) {
        return <Checkbox color="primary" checked={isChecked} onChange={(e) => handleSelectMessage(e, message)} />;
    } else {
        return null;
    }
};

export default SelectMessageCheckbox;
