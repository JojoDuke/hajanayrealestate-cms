import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    disabledInput: {
        color: 'black !important',
        '& .MuiInputBase-root.Mui-disabled': {
            color: 'black !important',
        },
        '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black !important'
        },
        '& .MuiFormLabel-root.Mui-disabled': {
            color: 'rgba(0,0,0,.6) !important',
        }
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '15px 0 15px 10px',
    }
  }));

export default function FileInput(props) {

    const classes = useStyles();

    const { name, label, value, onChange } = props;

    const fileName = (value === "" || typeof value.name === "string") ? "" : value.split("/media/")[1];


    return (
        <div className={classes.inputContainer}>
            <label for={name}>{label}</label>
            <input type="file" name={name} onChange={(e)=>onChange(name, e.target.files[0])} />
            {fileName}
        </div>
    );
}
