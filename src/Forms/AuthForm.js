import React from 'react';
/* MATERIAL UI */
import { Grid, } from '@material-ui/core';
/* OWN */
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';


const initialFValues = {
    username: '',
    password: ''
}

const AuthForm = (props) => {
    
    const { loginRequest } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "Zadejte uživatelské jméno."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "Zadejte heslo."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            loginRequest(values);
        }
    }

    return (
        <Form onSubmit={handleSubmit} style={{maxWidth: '500px'}}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        style={{width: '100%', margin: '8px 0'}}
                        name="username"
                        label="Uživatelské jméno"
                        value={values.username}
                        onChange={handleInputChange}
                        error={errors.username}
                    />
                    <Controls.Input
                        style={{width: '100%', margin: '8px 0 30px 0'}}
                        label="Heslo"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        type="password"
                    />

                </Grid>
                <Grid item xs={12}>
                    <div style={{textAlign: "left"}}>
                        <Controls.Button
                            type="submit"
                            text="Přihlásit se" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}

export default AuthForm;