import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export function useForm(initialFValues, validateOnChange = false, validate) {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const onFileChange = (name, file) => {
        setValues({
            ...values,
            [name]: file
        })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }

    const handleTextEditorSave = (name, value) => {
        setValues({
            ...values,
            [name]: value
        })
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        handleTextEditorSave,
        onFileChange
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '100%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

