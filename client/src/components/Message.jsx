import React from "react";
import { Box, Chip } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";

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
          }}
          color={type === "answer" ? "default" : "primary"}
          icon={type === "answer" ? <FaceIcon /> : null}
          label={text}
        />
      </Box>
    </>
  );
};

export default Message;