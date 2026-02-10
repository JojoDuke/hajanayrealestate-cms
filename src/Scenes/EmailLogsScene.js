import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
/* MATERIAL UI */
import EmailIcon from '@material-ui/icons/Email';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import LaunchIcon from '@material-ui/icons/Launch';
/* OWN */
import useTable from "../components/useTable";
import Popup from "../components/Popup";
import Controls from "../components/controls/Controls";
import PageHeader from "../components/PageHeader";
import BackendRequest from '../utils/BackendRequest';
import BackendDataContext from '../Context/BackendDataContext';
import { FETCH_FORM_SUBMISSIONS } from '../Containers/backendDataReducer';
import EmailFormViewer from '../Forms/EmailFormViewer';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'name', label: 'Jméno' },
    { id: 'date', label: 'Datum zaslání' },
    { id: 'phone', label: 'Telefon' },
    { id: 'email', label: 'Email' },
    { id: 'actions', label: 'Zobrazit detail\xa0\xa0' },
]

const EmailLogsScene = () => {

    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const { currentState, dispatch } = useContext(BackendDataContext);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    /* HANDLE SEARCH */
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    /* FETCH EMAILS */
    const fetchFormSubmissions = () => {
    
        const onSuccess = (response) => {
            dispatch({
                type: FETCH_FORM_SUBMISSIONS,
                formSubmissions: response.data.form_submissions
            })
        }
    
        const onError = (error) => {
            console.log('error in /form-submissions', error);
        }
        
        BackendRequest("get", "/form-submissions", null, onSuccess, onError);
    };

    const openInPopup = item => {

        setRecordForEdit(item)
        setOpenPopup(true)

    }
    
    useEffect(() => {
        fetchFormSubmissions();
    }, [])

    useEffect(() => {
        setRecords(currentState.formSubmissions);
    }, [currentState])

    return (
        <>
            <PageHeader
                title="Vyplněné formuláře"
                subTitle="Seznam všech zaslaných formulářů"
                icon={<EmailIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                {/* VYHLEDÁVÁNÍ A PŘIDÁNÍ NOVÉHO ČLÁNKU */}
                <Toolbar>
                    <Controls.Input
                        label="Vyhledat článek"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>

                {/* TABULKA */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            currentState.formSubmissions.length !== 0 && recordsAfterPagingAndSorting().map(submission =>
                                (<TableRow key={submission.id}>
                                    <TableCell>{submission.name}</TableCell>
                                    <TableCell>{moment(submission.date).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                                    <TableCell>{submission.phone}</TableCell>
                                    <TableCell>{submission.email}</TableCell>
                                    <TableCell align="right">
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(submission) }}>
                                            <LaunchIcon fontSize="small" />
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
                title="Detail vyplněného formuláře"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmailFormViewer
                    submission={recordForEdit}
                />
            </Popup>
        </>
    )
}

export default EmailLogsScene;