import './DeleteAllLinks.css'
import React, { useEffect, useState } from "react";
import { set, get } from 'idb-keyval' // to use IndexedDB more easily

import { Button } from '../../components'
import { ConfirmationDialog } from '../../manager'

import { LinksContext } from '../../App'

const DeleteAllLinks = () => {

    const { links, setLinks } = React.useContext(LinksContext);

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const handleClick = () => {
        setShowConfirmationDialog(true);
    }

    const handleConfirm = () => {
        set('links', []);
        setLinks([]);
        setShowConfirmationDialog(false);
    }

    const handleCancel = () => {
        setShowConfirmationDialog(false);
    }

    return (
        <div className="delete-all-links">
            <Button
                onClick={handleClick}
                children={"Delete all links"}
            />
            {showConfirmationDialog &&
                <ConfirmationDialog
                    message={"Are you sure you want to delete all links?"}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            }
        </div>
    )
}

export default DeleteAllLinks