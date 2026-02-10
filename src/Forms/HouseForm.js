import React, { useEffect, useState } from 'react'
/* MATERIAL UI */
import { Grid, } from '@material-ui/core';
/* OWN */
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import BackendRequest from '../utils/BackendRequest';
import Popup from '../components/Popup';
import AddingImages from '../components/AddingImages/AddingImages';
import ConfirmDialog from '../components/ConfirmDialog';
import { NavigateBeforeSharp } from '@material-ui/icons';


const initialFValues = {
    id: 0,
    name: '',
    available: true,
    locality: '',
    description: '',
    disposition: '',
    parcel_number: '',
    floor_area: 0,
    lot_area: 0,
    builtup_area: 0,
    price: 0,
    situation_plan_file: '',
    situation_file: '',
    intro_report_file: '',
    comprehensive_report_file: '',
    project_file: '',
    penb_file: '',
    virtual_tour: '',
    video: '',
    title_image: '',
    images: [],
    files: [],
}

export default function HouseForm(props) {
    const { updateHouse, recordForEdit } = props;
    const [openPopupTitleImage, setOpenPopupTitleImage] = useState(false);
    const [openPopupExteriorGallery, setOpenPopupExteriorGallery] = useState(false);
    const [openPopupInteriorGallery, setOpenPopupInteriorGallery] = useState(false);
    const [openPopupGroundPlanGallery, setOpenPopupGroundPlanGallery] = useState(false);
    const [ editorOneChanged, setEditorOneChanged ] = useState(false);
    const [ editorTwoChanged, setEditorTwoChanged ] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Zadejte název domu."
        if ('locality' in fieldValues)
            temp.locality = fieldValues.locality ? "" : "Přidejte popis lokality."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "Přidejte popis domu."
        if ('disposition' in fieldValues)
            temp.disposition = fieldValues.disposition ? "" : "Zadejte dispozici domu."
        if ('parcel_number' in fieldValues)
            temp.parcel_number = fieldValues.parcel_number ? "" : "Zadejte číslo parcely."
        if ('floor_area' in fieldValues)
            temp.floor_area = fieldValues.floor_area ? "" : "Zadejte užitnou plochu domu."
        if ('lot_area' in fieldValues)
            temp.lot_area = fieldValues.lot_area ? "" : "Zadejte plochu pozemku."
        if ('builtup_area' in fieldValues)
            temp.builtup_area = fieldValues.builtup_area ? "" : "Zadejte zastavěnou plochu domu"
        if ('price' in fieldValues)
            temp.price = fieldValues.price ? "" : "Zadejte cenu domu v Kč."
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
        onFileChange
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault();
        if (editorOneChanged || editorTwoChanged) {
            setConfirmDialog({
                isOpen: true,
                title: 'Neuložili jste textový editor.',
                subTitle: "Opravdu chcete uložit formulář bez uloženého textového editoru?",
                onConfirm: () => {
                    if (validate()) {
                        updateHouse(values);
                        if (props.setOpenPopup) {
                            props.setOpenPopup(false);
                        }
                    }
                }
            })
        }
        else {
            if (validate()) {
                updateHouse(values);
                if (props.setOpenPopup) {
                    props.setOpenPopup(false);
                }
            }
        }
    }


    const updateImages = (images, name) => {

        if (name === "title_image") {
            const image = images[0];
            setValues({
                ...values,
                title_image: image,
            })
        } else {
            setValues({
                ...values,
                [name]: [...images],
            })
        }

        console.log("updated images", images, name, values);

        if (name === "exterier_images") {
            setOpenPopupExteriorGallery(false);
        } else if (name === "interier_images") {
            setOpenPopupInteriorGallery(false);
        } else if (name === "ground_plan_images") {
            setOpenPopupGroundPlanGallery(false);
        } else {
            setOpenPopupTitleImage(false);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    //render all components after it spreads data from the recordForEdit to prevent loop in TextEditor
    if (values.id !== 0) {
        return (
            <>
                <Form onSubmit={handleSubmit}>
                    <Grid container style={{width: '98%'}} spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Controls.Input
                                name="name"
                                label="Název domu"
                                value={values.name}
                                onChange={handleInputChange}
                                error={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Controls.Input
                                label="Cena v Kč"
                                name="price"
                                value={values.price}
                                onChange={handleInputChange}
                                error={errors.price}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Controls.Checkbox
                                name="available"
                                label="K dispozici"
                                value={values.available}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            
                            <Controls.TextEditor
                                save={handleTextEditorSave}
                                initialValues={values.locality}
                                label="Popis lokality"
                                placeholder="Zadejte popis lokality..."
                                name="locality"
                                setEditorChanged={setEditorOneChanged}
                            />

                            <Controls.TextEditor
                                save={handleTextEditorSave}
                                initialValues={values.description}
                                label="Popis domu"
                                placeholder="Zadejte popis domu..."
                                name="description"
                                setEditorChanged={setEditorTwoChanged}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Input
                                label="Dispozice"
                                name="disposition"
                                value={values.disposition}
                                onChange={handleInputChange}
                                error={errors.disposition}
                            />    
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controls.Input
                                label="Číslo parcely"
                                name="parcel_number"
                                value={values.parcel_number}
                                onChange={handleInputChange}
                                error={errors.parcel_number}
                            />  
                        </Grid>      
                        <Grid item xs={12} sm={4} >
                            <Controls.Input
                                label="Užitná plocha v m²"
                                name="floor_area"
                                value={values.floor_area}
                                onChange={handleInputChange}
                                error={errors.floor_area}
                            /> 
                        </Grid>
                        <Grid item xs={12} sm={4} >   
                            <Controls.Input
                                label="Plocha pozemku v m²"
                                name="lot_area"
                                value={values.lot_area}
                                onChange={handleInputChange}
                                error={errors.lot_area}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} > 
                            <Controls.Input
                                label="Zastavěná plocha v m²"
                                name="builtup_area"
                                value={values.builtup_area}
                                onChange={handleInputChange}
                                error={errors.builtup_area}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controls.Input
                                label="Odkaz na virtuální prohlídku"
                                name="virtual_tour"
                                value={values.virtual_tour}
                                onChange={handleInputChange}
                                error={errors.virtual_tour}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Controls.Input
                                label="Odkaz na video"
                                name="video"
                                value={values.video}
                                onChange={handleInputChange}
                                error={errors.video}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controls.FileInput
                                label="Situační plán"
                                name="situation_plan_file"
                                value={values.situation_plan_file}
                                onChange={onFileChange}
                            />
                            <Controls.FileInput
                                label="Situace"
                                name="situation_file"
                                value={values.situation_file}
                                onChange={onFileChange}
                            />
                            <Controls.FileInput
                                label="Průvodní zpráva"
                                name="intro_report_file"
                                value={values.intro_report_file}
                                onChange={onFileChange}
                            />
                            <Controls.FileInput
                                label="Souhrnná zpráva"
                                name="comprehensive_report_file"
                                value={values.comprehensive_report_file}
                                onChange={onFileChange}
                            />
                            <Controls.FileInput
                                label="Projekt"
                                name="project_file"
                                value={values.project_file}
                                onChange={onFileChange}
                            />
                            <Controls.FileInput
                                label="PENB"
                                name="penb_file"
                                value={values.penb_file}
                                onChange={onFileChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                                <Controls.Button
                                    color="default"
                                    text="Změnit úvodní obrázek"
                                    onClick={()=>setOpenPopupTitleImage(true)} />

                                <div style={{height: '40px', marginLeft: '15px'}}>
                                    <img src={"https://api.moderni-zelesice.cz" + values.title_image} style={{height: '100%', width: 'auto'}} />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Controls.Button
                                color="default"
                                text="Přidat obrázky do galerie exteriér"
                                onClick={()=>setOpenPopupExteriorGallery(true)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Controls.Button
                                color="default"
                                text="Přidat obrázky do galerie interiér"
                                onClick={()=>setOpenPopupInteriorGallery(true)} />
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    
                                <Controls.Button
                                    color="default"
                                    text="Přidat obrázky do galerie půdorysy"
                                    onClick={()=>setOpenPopupGroundPlanGallery(true)} />

                                <Controls.Button
                                    type="submit"
                                    text="Uložit" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Přiložené&nbsp;obrázky v&nbsp;galerii půdorysy</h2>
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                                {values.ground_plan_images.map((img, idx) => {
                                    
                                    let src = "https://api.moderni-zelesice.cz" + img;

                                    return (
                                        <img src={src} style={{width: '150px', margin: '7px', objectFit: 'cover'}} />
                                    );
                                })}
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <h2>Přiložené&nbsp;obrázky v&nbsp;galerii interiér</h2>
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                                {values.interier_images.map((img, idx) => {
                                    
                                    let src = "https://api.moderni-zelesice.cz" + img;

                                    return (
                                        <img src={src} style={{width: '150px', margin: '7px', objectFit: 'cover'}} />
                                    );
                                })}
                            </div>
                        </Grid>
                    
                        <Grid item xs={12}>
                            <h2>Přiložené&nbsp;obrázky v&nbsp;galerii exteriér</h2>
                            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>
                                {values.exterier_images.map((img, idx) => {
                                    
                                    let src = "https://api.moderni-zelesice.cz" + img;

                                    return (
                                        <img src={src} style={{width: '150px', margin: '7px', objectFit: 'cover'}} />
                                    );
                                })}
                            </div>
                        </Grid>
                    </Grid>
                </Form>

                <Popup
                title="Vyberte úvodní obrázek"
                openPopup={openPopupTitleImage}
                setOpenPopup={setOpenPopupTitleImage} >
                    {(values.title_image !== null && values.images !== undefined) &&
                    <AddingImages 
                        updateImages={updateImages}
                        initialImages={[values.title_image]}
                        maxImages={1}
                        name="title_image"
                    />}
                </Popup>

                <Popup
                title="Přidání obrázků do galerie exteriér"
                openPopup={openPopupExteriorGallery}
                setOpenPopup={setOpenPopupExteriorGallery} >
                    {(values.exterier_images !== null && values.exterier_images !== undefined) &&
                    <AddingImages 
                        updateImages={updateImages}
                        initialImages={values.exterier_images}
                        name="exterier_images"
                    />}
                </Popup>

                <Popup
                title="Přidání obrázků do galerie interiér"
                openPopup={openPopupInteriorGallery}
                setOpenPopup={setOpenPopupInteriorGallery} >
                    {(values.interier_images !== null && values.interier_images !== undefined) &&
                    <AddingImages 
                        updateImages={updateImages}
                        initialImages={values.interier_images}
                        name="interier_images"
                    />}
                </Popup>

                <Popup
                title="Přidání obrázků do galerie půdorysy"
                openPopup={openPopupGroundPlanGallery}
                setOpenPopup={setOpenPopupGroundPlanGallery} >
                    {(values.ground_plan_images !== null && values.ground_plan_images !== undefined) &&
                    <AddingImages 
                        updateImages={updateImages}
                        initialImages={values.ground_plan_images}
                        name="ground_plan_images"
                    />}
                </Popup>

                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}
                />
            </>
        )
    } else return null; //render null if it has only InitialFValues to prevent loop in TextEditor
}