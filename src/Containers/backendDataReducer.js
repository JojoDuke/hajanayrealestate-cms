export const FETCH_BLOGPOSTS = "UPDATE_BLOGPOSTS"; 
export const FETCH_HOUSES = "FETCH_HOUSES";
export const FETCH_FORM_SUBMISSIONS = "FETCH_FORM_SUBMISSIONS";
export const FETCH_PERSONINFO = "FETCH_PERSONINFO";
export const FETCH_PAGES = "FETCH_PAGES";
export const FETCH_GALLERY = "FETCH_GALLERY";
export const UPDATE_GALLERY = "UPDATE_GALLERY";
export const UPDATE_PAGE = "UPDATE_PAGE";
export const UPDATE_BLOGPOST = "UPDATE_BLOGPOST";
export const ADD_BLOGPOST = "ADD_BLOGPOST";
export const DELETE_BLOGPOST = "DELETE_BLOGPOST";
export const FETCH_STRUCTURE = "FETCH_STRUCTURE";
export const UPDATE_PERSON = "UPDATE_PERSON";
export const UPDATE_HOUSE = "UPDATE_HOUSE";


export const backendDataReducer = (state, action) => {

    switch (action.type) {

        // GET ALL THE DATA
        
        case FETCH_BLOGPOSTS:
            return {
                ...state,
                blogposts: action.blogposts,
            }
        
        case FETCH_HOUSES:
            return {
                ...state,
                houses: action.houses,
            }
        
        case FETCH_PAGES:
            return {
                ...state,
                pages: action.pages,
            }

        case UPDATE_PAGE:
            let pageIndex = state.pages.findIndex(page => page.id === action.pageId);
            let sectionIndex = state.pages[pageIndex].sections.findIndex(section => section.id === action.sectionId)
            state.pages[pageIndex].sections[sectionIndex] = action.section;
        
            return {
                ...state,
            }

        case FETCH_FORM_SUBMISSIONS:
            return {
                ...state,
                formSubmissions: action.formSubmissions,
            }

        case FETCH_PERSONINFO:
            return {
                ...state,
                personInfo: action.personInfo,
            }
        
        // BLOGPOST RELATED FUNCTIONS
        
        case UPDATE_BLOGPOST:
            let blogpostIndex = state.blogposts.findIndex(blogpost => blogpost.id === action.id);
            state.blogposts[blogpostIndex] = action.blogpost;
        
            return {
                ...state,
            }

        case ADD_BLOGPOST:
            const newBlogposts = [...state.blogposts];
            newBlogposts.push(action.blogpost);

            return {
                ...state,
                blogposts: newBlogposts,
            }

        case DELETE_BLOGPOST:
            let deleteBlogpostIndex = state.blogposts.findIndex(blogpost => blogpost.id === action.id);
            state.blogposts.splice(deleteBlogpostIndex, 1)

            return {
                ...state,
            }
        
        // PERSONINFO RELATED FUNCTIONS

        case UPDATE_PERSON:
            let personIndex = state.personinfo.findIndex(person => person.id === action.id);
            state.personinfo[personIndex] = action.person;
        
            return {
                ...state,
            }

        // PAGES RELATED FUNCTIONS
        
        /*
        case UPDATE_PAGE:
            let personIndex = state.blogposts.findIndex(person => person.id === action.id);
            state.person[personIndex] = action.person;
        
            return {
                ...state,
            }
        */

        // HOUSES RELATED FUNCTIONS

        case UPDATE_HOUSE:
            let houseIndex = state.houses.findIndex(house => house.id === action.id);
            state.houses[houseIndex] = action.house;
        
            return {
                ...state,
            }
        
        case UPDATE_GALLERY:
            let newStateGallery = [...state.gallery];
            newStateGallery.push(action.image);

            return {
                ...state,
                gallery: newStateGallery,
            }

        
        
        /*case UPDATE_UNIT:
            let unitIndex = state.units.findIndex(unit => unit.hasOwnProperty(action.serial))
            state.units[unitIndex][action.serial].stay_online = action.value;
        
            return {
                ...state,
            }
        
        
        case DELETE_BROWSER_UNIT:
            let browserIndex = state.browsers.findIndex(browser => browser.id === action.browser_id);
            let removeBrowserUnitIndex = state.browsers[browserIndex].units.map(unit => {return unit.id_browser_unit}).indexOf(action.browser_unit_id);
            state.browsers[browserIndex].units.splice(removeBrowserUnitIndex, 1);
        
            return {
                ...state,
            }*/
        
        case FETCH_STRUCTURE:
            return {
                ...action.config
            }
        
        default:
            return state;
    }
}