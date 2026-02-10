import React from 'react'
import { TextField } from '@material-ui/core';
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
    }
  }));

export default function Input(props) {

    const classes = useStyles();

    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
            variant="outlined"
            className={props.disable ? classes.disabledInput : ""}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}
