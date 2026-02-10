import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
/* MATERIAL UI */
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { NavigateBeforeSharp, Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
/* OWN */
import Popup from "../components/Popup";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import BlogPostForm from "../Forms/BlogPostForm";
import PageHeader from "../components/PageHeader";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import BackendRequest from '../utils/BackendRequest';
import BackendDataContext from '../Context/BackendDataContext';
import { FETCH_BLOGPOSTS, DELETE_BLOGPOST, UPDATE_BLOGPOST, ADD_BLOGPOST } from '../Containers/backendDataReducer';
import { useWindowSize } from '../utils/useWindowSize';


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
}))

const headCellsDesktop = [
    { id: 'title', label: 'Název článku' },
    { id: 'date', label: 'Datum vytvoření' },
    { id: 'actions', label: 'Akce\xa0\xa0', disableSorting: true }
]

const headCellsMobile = [
    { id: 'title', label: 'Název článku' },
    { id: 'actions', label: 'Akce\xa0\xa0', disableSorting: true }
]

const BlogPostsScene = () => {

    const classes = useStyles();
    const [headCells, setHeadCells] = useState([headCellsDesktop]);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const { currentState, dispatch } = useContext(BackendDataContext);
    const windowSize = useWindowSize();

    useEffect(() => {
        if (windowSize.width > 1000) {
            setHeadCells(headCellsDesktop);
        } else setHeadCells(headCellsMobile);
    }, [windowSize.width])

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
                    return items.filter(x => x.title.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    /* ADD BLOGPOST */
    const addBlogPost = (formData, reset) => {

        const onSuccess = (response) => {
            dispatch({
                type: ADD_BLOGPOST,
                blogpost: response.data.blogpost,
            });
            setRecordForEdit(null)
            setOpenPopup(false);
            setNotify({isOpen: true, message: 'Aktualita vytvořena.', type: 'success'})
          }
      
          const onError = (error) => {
              console.log('error in /blogposts', error);
          }
          
          BackendRequest("post", "/blogposts", formData, onSuccess, onError);
    }

    /* UPDATE BLOGPOST */
    const updateBlogPost = (formData, reset) => {

        const onSuccess = (response) => {
            dispatch({
                type: UPDATE_BLOGPOST,
                blogpost: response.data.blogpost,
                id: formData.id
            });
            setRecordForEdit(null)
            setOpenPopup(false);
            setNotify({isOpen: true, message: 'Aktualita upravena.', type: 'success'})
          }
      
          const onError = (error) => {
              console.log('error in /blogposts', error);
          }
          
          BackendRequest("put", "/blogpost/" + formData.id, formData, onSuccess, onError);
    }

    /* DELETE BLOGPOST */
    const deleteBlogPost = (id) => {

        const onSuccess = (response) => {
            dispatch({
                type: DELETE_BLOGPOST,
                id: id,
            })
            setConfirmDialog({...confirmDialog, isOpen: false});
            setNotify({isOpen: true, message: 'Aktualita odstraněna.', type: 'error'})
          }
      
          const onError = (error) => {
              console.log('error in /blogpost/' + id, error);
          }
          
          BackendRequest("delete", "/blogpost/" + id, null, onSuccess, onError);
    }

    const openInPopup = item => {

        setRecordForEdit(item)
        setOpenPopup(true)

    }

    /* FETCH BLOGPOSTS */
    const fetchBlogPosts = () => {
    
        const onSuccess = (response) => {
          dispatch({
              type: FETCH_BLOGPOSTS,
              blogposts: response.data.blogpost
          })
        }
    
        const onError = (error) => {
            console.log('error in /blogposts', error);
        }
        
        BackendRequest("get", "/blogposts", null, onSuccess, onError);
    };
    
    useEffect(() => {
        fetchBlogPosts();
    }, [])

    useEffect(() => {
        setRecords(currentState.blogposts);
    }, [currentState])

    return (
        <>
            <PageHeader
                title="Aktuality"
                subTitle="Seznam všech aktivních článků"
                icon={<PostAddIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>

                {/* VYHLEDÁVÁNÍ A PŘIDÁNÍ NOVÉHO ČLÁNKU */}
                <Toolbar className={classes.searchContainer}>
                    <Controls.Input
                        label={windowSize.width > 1000 ? "Vyhledat článek" : ""}
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text={windowSize.width > 600 ? "Přidat článek" : ""}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { openInPopup(null) }}
                    />
                </Toolbar>

                {/* TABULKA */}
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            currentState.blogposts.length !== 0 && recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id} className={classes.tableRow}>
                                    <TableCell>{item.title}</TableCell>
                                    {windowSize.width > 1000 ? <TableCell>{moment(item.date).format("DD.MM.YYYY HH:mm:ss")}</TableCell> : <></>}
                                    <TableCell align="right">
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Opravdu chcete vymazat tento článek?',
                                                    subTitle: "Tuto operaci nelze vrátit zpět.",
                                                    onConfirm: () => deleteBlogPost(item.id)
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
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
                title="Vytvoření aktuality"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <BlogPostForm
                    recordForEdit={recordForEdit}
                    submitMethod={recordForEdit === null ? addBlogPost : updateBlogPost} />
            </Popup>

            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default BlogPostsScene;