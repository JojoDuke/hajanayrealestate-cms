import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(1),
        position: 'absolute',
        top: theme.spacing(-1),
        width: '95vw',
        maxWidth: '1200px',
        [theme.breakpoints.up('md')]: {
            width: '70vw',
            top: theme.spacing(5)
          },
        [theme.breakpoints.up('sm')]: {
            width: '87vw',
            padding: theme.spacing(2),
            top: theme.spacing(3)
          },
    },
    dialogTitle: {
        padding: '16px 10px',
        [theme.breakpoints.up('sm')]: {
            padding: '16px 16px 16px 24px'
          },
    },
    dialogContent: {
        padding: '16px 0px',
        [theme.breakpoints.up('sm')]: {
            padding: '32px 24px 16px 24px'
          },
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
                {children}
            </DialogContent>
        </Dialog>
    )
}
