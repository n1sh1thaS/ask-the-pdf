import React, {useState} from 'react';
import {Button} from "@mui/material";
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const FileInput = () => {
    const [currentFile, setCurrentFile] = useState(null)

    const Input = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
     });

    const onSubmit = (event) => {
        event.preventDefault();
        setCurrentFile(event.target.files[0]);
        console.log(currentFile);

        try{
        }
        catch (exception) {
            console.log(exception.message);
        }
    }
    return <>
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FileUploadIcon />}
            sx={{
                borderRadius: '100%',
                height: "200px",
                width: "200px",
                float: "left",
                backgroundColor: "black",
                background: 'linear-gradient(to left, #3a7bd5, #3a6073)',
                fontSize: "17px"
            }}
         >
            Choose PDF
            <Input
                type="file"
                accept="application/pdf"
                onChange={event => onSubmit(event)}
            />
        </Button>
    </>
};
export default FileInput;

