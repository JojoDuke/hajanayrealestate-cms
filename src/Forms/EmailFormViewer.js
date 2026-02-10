import React from 'react'
import moment from 'moment';
/* MATERIAL UI */
import { Grid } from '@material-ui/core';
/* OWN */
import Controls from "../components/controls/Controls";
import { Form } from '../components/useForm';

// Register the plugins

export default function EmailFormViewer(props) {

    const { submission } = props;

    return (
            <>
                <Form>
                    <Grid container style={{width: '95%'}}>
                        <Grid item xs={12}>
                            <Controls.Input
                                name="name"
                                label="Jméno a Příjmení"
                                value={submission.name}
                                disabled
                                disable={true}
                            />
                            <Controls.Input
                                name="date"
                                label="Datum zaslání"
                                value={moment(submission.date).format("DD.MM.YYYY HH:mm:ss")}
                                disabled
                                disable={true}
                            />
                            <Controls.Input
                                name="phone"
                                label="Telefonní číslo"
                                value={submission.phone}
                                disabled
                                disable={true}
                            />
                            <Controls.Input
                                name="email"
                                label="Email"
                                value={submission.email}
                                disabled
                                disable={true}
                            />
                            <Controls.TextArea
                                name="message"
                                label="Zpráva"
                                value={submission.message}
                                rows={5}
                                disabled
                                disable={true}
                            />
                        </Grid>
                    </Grid>
                </Form>
            </>
        )
}