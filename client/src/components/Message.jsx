import React from "react";
import { Box, Chip } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

const Message = (props) => {
  const { text, type } = props;
  return (
    <>
      <Box
        display="flex"
        justifyContent={type === "answer" ? "flex-start" : "flex-end"}
      >
        <Chip
          sx={{
            margin: "1%",
            padding: "1%",
            width: "fit-content",
            maxWidth: "50%",
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
            fontSize: "16px",
            ...(type=="question" && {background: 'linear-gradient(to left, #3a7bd5, #3a6073)'})
          }}
          color={type === "answer" ? "default" : "primary"}
          icon={type === "answer" ? <DescriptionIcon /> : null}
          label={text}
        />
      </Box>
    </>
  );
};

export default Message;