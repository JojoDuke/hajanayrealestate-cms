import React, { useState, useEffect, useContext } from 'react';

/* MATERIAL UI */
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

/* OWN */
import Popup from "../components/Popup";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import HouseForm from "../Forms/HouseForm";
import HomeIcon from '@material-ui/icons/Home';
import PageHeader from "../components/PageHeader";
import Notification from "../components/Notification";
import BackendRequest from '../utils/BackendRequest';
import BackendDataContext from '../Context/BackendDataContext';
import { FETCH_HOUSES, UPDATE_HOUSE } from '../Containers/backendDataReducer';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/localStorage';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(1.5),
            padding: theme.spacing(2)
        },
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(3)
        },
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    tableRow: {
        '&:hover': {
            cursor: 'default !important',
            backgroundColor: 'rgba(250,250,255,.7) !important'
        }
    }
}))


const headCells = [
    { id: 'name', label: 'Název domu' },
    { id: 'available', label: 'K dispozici', disableSorting: true },
    { id: 'actions', label: 'Akce\xa0\xa0', disableSorting: true }
]

const HousesScene = () => {
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const { currentState, dispatch } = useContext(BackendDataContext);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const uploadFiles = async (formData) => {
        if (typeof formData.situation_plan_file !== "string" && typeof formData.situation_plan_file !== "undefined") {
            const fileFormData = new FormData()
            fileFormData.append('file', formData.situation_plan_file)

            await axios.post("https://api.moderni-zelesice.cz/file-upload", fileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                }
            })
                .then(function (response) {
                    formData.situation_plan_file = response.data.file_path.file;
                })
                .catch(function (error) {
                    console.log('error in /file-upload')
                });
        }
        if (typeof formData.situation_file !== "string" && typeof formData.situation_file !== "undefined") {
            const fileFormData = new FormData()
            fileFormData.append('file', formData.situation_file)

            await axios.post("https://api.moderni-zelesice.cz/file-upload", fileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                }
            })
                .then(function (response) {
                    formData.situation_file = response.data.file_path.file;
                })
                .catch(function (error) {
                    console.log('error in /file-upload')
                });
        }
        if (typeof formData.intro_report_file !== "string" && typeof formData.intro_report_file !== "undefined") {
            const fileFormData = new FormData()
            fileFormData.append('file', formData.intro_report_file)

            await axios.post("https://api.moderni-zelesice.cz/file-upload", fileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                }
            })
                .then(function (response) {
                    formData.intro_report_file = response.data.file_path.file;
                })
                .catch(function (error) {
                    console.log('error in /file-upload')
                });
        }
        if (typeof formData.comprehensive_report_file !== "string" && typeof formData.comprehensive_report_file !== "undefined") {
            const fileFormData = new FormData()
            fileFormData.append('file', formData.comprehensive_report_file)

            await axios.post("https://api.moderni-zelesice.cz/file-upload", fileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                }
            })
                .then(function (response) {
                    formData.comprehensive_report_file = response.data.file_path.file;
                })
                .catch(function (error) {
                    console.log('error in /file-upload')
                });
        }
        if (typeof formData.project_file !== "string" && typeof formData.project_file !== "undefined") {
            const fileFormData = new FormData()
            fileFormData.append('file', formData.project_file)

            await axios.post("https://api.moderni-zelesice.cz/file-upload", fileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                }
            })
                .then(function (response) {
                    formData.project_file = response.data.file_path.file;
                })
                .catch(function (error) {
                    console.log('error in /file-upload')
                });
        }
        if (typeof formData.penb_file !== "string" && typeof formData.penb_file !== "undefined") {
            const fileFormData = new FormData()
            fileFormData.append('file', formData.penb_file)

            await axios.post("https://api.moderni-zelesice.cz/file-upload", fileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getTokenFromLocalStorage(),
                }
            })
                .then(function (response) {
                    formData.penb_file = response.data.file_path.file;
                })
                .catch(function (error) {
                    console.log('error in /file-upload')
                });
        }

        return formData;
    }

    /* UPDATE HOUSE */
    const updateHouse = async (formData) => {

        let updatedFormData = await (uploadFiles(formData));

        const onSuccess = (response) => {
            dispatch({
                type: UPDATE_HOUSE,
                house: response.data.house,
                id: updatedFormData.id
            });
            setRecordForEdit(null)
            setOpenPopup(false);
            setNotify({ isOpen: true, message: 'Dům upraven.', type: 'success' })
        }

        const onError = (error) => {
            console.log('error in /houses', error);
        }

        BackendRequest("put", "/house/" + updatedFormData.id, updatedFormData, onSuccess, onError);

    }

    const openInPopup = item => {

        setRecordForEdit(item)
        setOpenPopup(true)
    }

    /* FETCH BLOGPOSTS */
    const fetchHouses = () => {

        const onSuccess = (response) => {
            dispatch({
                type: FETCH_HOUSES,
                houses: response.data.houses
            })
        }

        const onError = (error) => {
            console.log('error in /houses', error);
        }

        BackendRequest("get", "/houses", null, onSuccess, onError);
    };

    useEffect(() => {
        fetchHouses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setRecords(currentState.houses);
    }, [currentState])

    return (
        <>
            <PageHeader
                title="Domy"
                subTitle="Seznam všech domů"
                icon={<HomeIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                {/* TABULKA */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            currentState.houses.length !== 0 && recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id} className={classes.tableRow}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.available ? "Ano" : "Ne"}</TableCell>
                                <TableCell align="right">
                                    <Controls.ActionButton
                                        color="primary"
                                        onClick={() => { openInPopup(item) }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>

            <Popup
                title="Úprava informací o domu"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <HouseForm
                    recordForEdit={recordForEdit}
                    updateHouse={updateHouse} />
            </Popup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    );
}

export default HousesScene;