import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
/* MATERIAL UI */
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
/* OWN */
import Popup from "../components/Popup";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import SectionForm from "../Forms/SectionForm";


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(1),
            padding: theme.spacing(2)
          },
    },
    searchInput: {
        wordBrake: 'initial',
        '& input' : {padding: '14px 14px'}
    },
    newButton: {
        padding: '7px 12px',
        [theme.breakpoints.down('xs')]: {
            padding: '7px 0 7px 12px',
            marginLeft: '20px',
          },
    },
    tableRow: {
        wordBrake: 'break-word',
        '&:hover': {
            cursor: 'default !important',
            backgroundColor: 'rgba(250,250,255,.7) !important'
        }
    },
    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pagesComponentContainer: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(1),
            padding: theme.spacing(2)
          },
    }
}))

const HomeSections = ({ updateSection, sections }) => {

    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(sections);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const headCells = [
        { id: 'title', label: 'Název sekce', disableSorting: true },
        { id: 'actions', label: 'Akce\xa0\xa0', disableSorting: true }
    ]

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    return (
        <>
            <Paper className={classes.pagesComponentContainer}>

                {/* TABULKA */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            sections.length !== 0 && recordsAfterPagingAndSorting().map(section =>
                                (<TableRow key={section.id} className={classes.tableRow}>
                                    <TableCell>{section.title}</TableCell>
                                    <TableCell align="right">
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => openInPopup(section)}
                                        >
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
            </Paper>

            <Popup
                title="Úprava sekce"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <SectionForm
                    recordForEdit={recordForEdit}
                    submitMethod={updateSection} 
                    setOpenPopup={setOpenPopup}
                />
            </Popup>
        </>
    )
}

export default HomeSections;