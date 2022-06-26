import React from 'react'
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function CardMayKulay({title, value, bgcolor}) {
  return (
    <div>
      <Paper
        sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 100,
            bgcolor,
            color: "#fff",
        }}
        >
        <Typography variant="h6" gutterBottom component="div">{title}</Typography>
        <Typography variant="h5" gutterBottom component="div">{value}</Typography>
        </Paper>
    </div>
  )
}

export default CardMayKulay
