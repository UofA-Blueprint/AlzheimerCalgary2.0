import { createContext } from "react";

/**
 * Context to store the new profile picture.
 */

export const NewProfilePictureContext = createContext({
    newProfilePicture: {
        backgroundColor: "water",
        type: "icon",
        src: "PawPrint",
    },
    setNewProfilePicture: null,
})