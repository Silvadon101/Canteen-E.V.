import React, { useState, useEffect } from 'react';

const ToggleModal = () => {
    const [openModal, setOpenModal] = useState(false)

    const toggle = () => {
        setOpenModal((previous) => !openModal)
    }

    return { openModal, toggle: toggle }
}

export default ToggleModal