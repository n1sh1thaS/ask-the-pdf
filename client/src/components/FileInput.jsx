import React, {useState} from 'react';
import {Button, Alert} from "@mui/material";
import { styled } from '@mui/material/styles';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import {buildChain} from "../services/services.js";

const FileInput = () => {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [fileName, setFileName] = useState('');
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

    const onSubmit = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        try{
            if(file){
                setFileUploaded(true);
                setFileName(file.name);
                let fileProcessed = await buildChain(file);
                if(!fileProcessed) alert('try uploading the file again')
            }
        }
        catch (exception) {
            console.log(exception);
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
                style={{ display: 'none' }}
            />
        </Button>
        {fileUploaded &&
            <Alert severity="success">
                {'PDF upload successful'}
                <br/>
                {fileName}
            </Alert>
        }
        {!fileUploaded &&
            <Alert severity="info">
                No PDF chosen
            </Alert>
        }
    </>
};
export default FileInput;

