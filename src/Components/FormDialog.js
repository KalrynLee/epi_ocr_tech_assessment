import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const handleDialogClose = () => {
    if (props.onDialogClose) {
      props.onDialogClose();
    }
  };

  return (
    <Dialog maxWidth="lg" open={props.open} onClose={handleDialogClose}>
      <Box>
        {props.title && (
          <div className={`${props.dialogClassName ? props.dialogClassName : 'dialog_title_container'}`}>
            <DialogTitle className="dialog_title">{props.title}</DialogTitle>
          </div>
        )}
        {(props.text || props.content) && (
          <DialogContent className="dialog_content">
            {props.text && <DialogContentText>{props.text}</DialogContentText>}
            {props.content}
          </DialogContent>
        )}
        {(props.cancel || props.buttons) && (
          <DialogActions className="dialog_actions">
            {props.cancel && (
              <Button onClick={handleDialogClose}>Cancel</Button>
            )}
            {props.buttons}
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}