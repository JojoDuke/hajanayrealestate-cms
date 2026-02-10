import React, { useState, useEffect } from 'react'
/* MATERIAL UI */
import { Grid } from '@material-ui/core';
/* OWN */
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import BackendRequest from '../utils/BackendRequest';
import Popup from '../components/Popup';
import AddingImages from '../components/AddingImages/AddingImages';
import ConfirmDialog from "../components/ConfirmDialog";

// Register the plugins

const initialFValues = {
    id: 0,
    title: '',
    content: '',
    button: '',
    images: []
}

export default function SectionForm(props) {

    const { submitMethod, recordForEdit } = props;
    const [openPopup, setOpenPopup] = useState(false);
    const maxImages = recordForEdit.id === 5 ? 50 : 1;
    const [ editorChanged, setEditorChanged ] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "Zadejte nadpis."
        if ('content' in fieldValues)
            temp.content = fieldValues.content ? "" : "Přidejte obsah."
        /*if ('button' in fieldValues)
            temp.video = fieldValues.video ? "" : "Přidejte text tlačítka."*/
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleTextEditorSave,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        /*let filesArray = [];
        files.map(file => filesArray.push(file.file))
        setValues(
            ...values,
            
        );*/
        if (editorChanged) {
            setConfirmDialog({
                isOpen: true,
                title: 'Neuložili jste textový editor.',
                subTitle: "Opravdu chcete uložit formulář bez uloženého textového editoru?",
                onConfirm: () => {
                    if (validate()) {
                        submitMethod(values, resetForm);
                        if (props.setOpenPopup) {
                            props.setOpenPopup(false);
                        }
                    }
                }
            })
        }
        else {
            if (validate()) {  
                submitMethod(values, resetForm);
                if (props.setOpenPopup) {
                    props.setOpenPopup(false);
                }
            }
        }

        
    }

    const updateImages = (images) => {

        setValues({
            ...values,
            images: [...images]
        })

        setOpenPopup(false);
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])   

    return (
            <>
                <Form onSubmit={handleSubmit}>
                    <Grid container style={{width: '95%'}}>
                        <Grid item xs={12}>
                            <Controls.Input
                                name="title"
                                label="Nadpis"
                                value={values.title}
                                onChange={handleInputChange}
                                error={errors.title}
                                disabled={(recordForEdit.id === 6 || recordForEdit.id === 5) ? true : false}
                            />
                            <Controls.TextEditor
                                label="Obsah článku"
                                placeholder="Zadejte obsah..."
                                name="content"
                                initialValues={values.content}
                                save={handleTextEditorSave}
                                setEditorChanged={setEditorChanged}
                            />
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Controls.Input
                                        label="Text tlačítka"
                                        name="button"
                                        value={values.button}
                                        onChange={handleInputChange}
                                        disabled={(recordForEdit.id === 6 || recordForEdit.id === 5) ? true : false}
                                    />
                                </Grid>
                            </ Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{marginTop: '20px'}}>
                                <Controls.Button
                                    color="default"
                                    text="Přidat obrázky" 
                                    onClick={()=>setOpenPopup(true)} 
                                    disabled={recordForEdit.id === 6 ? true : false} />
                            </div>
                        </Grid>
                    
                        <Grid item xs={12}>
                            <div style={{marginTop: '20px', textAlign: 'right'}}>
                                <Controls.Button
                                    type="submit"
                                    text="Uložit" 
                                />
                            </div>
                        </Grid>
                        {recordForEdit.id !== 6 && 
                        <Grid item xs={12}>
                            <h2>Přiložené&nbsp;obrázky</h2>
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                                {values.images.map((img, idx) => {
                                    
                                    let src = "https://api.moderni-zelesice.cz/media/" + img.split('/media')[1];

                                    return (
                                        <img src={src} style={{width: '150px', margin: '7px', objectFit: 'cover'}} />
                                    );
                                })}
                            </div>
                        </Grid>
                        }
                    </Grid>
                </Form>

                <Popup
                    title="Přidání obrázků"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup} >
                        {(values.images !== null && values.images !== undefined) &&<AddingImages 
                        updateImages={updateImages}
                        initialImages={values.images}
                        maxImages={maxImages}
                        />}
                </Popup>

                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </>
        )
    
}
