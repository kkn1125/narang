import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function TermsConditions() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <FormGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <FormControlLabel
        control={<Checkbox name='terms' />}
        label={
          <Typography>
            I have read the
            <Typography
              component='span'
              onClick={handleOpen}
              sx={{
                color: theme.palette.primary.main,
              }}>
              Terms and Conditions
            </Typography>
          </Typography>
        }
      />
    </FormGroup>
  );
}

export default TermsConditions;
