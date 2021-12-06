import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    UPDATE_LIST: "UPDATE_LIST",
    LOAD_HOME_LISTS: "LOAD_HOME_LISTS",
    LOAD_ALL_LISTS: "LOAD_ALL_LISTS",
    LOAD_USER_LISTS: "LOAD_USER_LISTS",
    LOAD_COMMUNITY_LISTS: "LOAD_COMMUNITY_LISTS",
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        allLists: [],
        currentList: null,
        newListCounter: 0,
        listMarkedForDeletion: null,
        showHome: false,
        showAll: false,
        showUsers: false,
        showCommunity: false,
        search: "",
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: store.allLists,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listMarkedForDeletion: null,
                    showHome: false,
                    showAll: false,
                    showUsers: false,
                    showCommunity: false,
                    search: ""
                })
            }
            // GET ALL THE ID NAME PAIRS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    allLists: store.allLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: false,
                    showAll: false,
                    showUsers: false,
                    showCommunity: false,
                    search: ""
                });
            }
            case GlobalStoreActionType.UPDATE_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: store.showHome,
                    showAll: store.showAll,
                    showUsers: store.showUsers,
                    showCommunity: store.showCommunity,
                    search: ""
                });
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_HOME_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: true,
                    showAll: false,
                    showUsers: false,
                    showCommunity: false,
                    search: ""
                });
            }
            case GlobalStoreActionType.LOAD_ALL_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: payload.array,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: false,
                    showAll: true,
                    showUsers: false,
                    showCommunity: false,
                    search: payload.search
                });
            }
            case GlobalStoreActionType.LOAD_USER_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: payload.array,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: false,
                    showAll: false,
                    showUsers: true,
                    showCommunity: false,
                    search: payload.search
                });
            }
            case GlobalStoreActionType.LOAD_COMMUNITY_LISTS: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: false,
                    showAll: false,
                    showUsers: false,
                    showCommunity: true,
                    search: ""
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: store.allLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: payload, 
                    showHome: store.showHome,
                    showAll: store.showAll,
                    showUsers: store.showUsers,
                    showCommunity: store.showCommunity,
                    search: ""
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: store.allLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: store.showHome,
                    showAll: store.showAll,
                    showUsers: store.showUsers,
                    showCommunity: store.showCommunity,
                    search: ""
                });
            }
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: store.allLists,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: store.showHome,
                    showAll: store.showAll,
                    showUsers: store.showUsers,
                    showCommunity: store.showCommunity,
                    search: ""
                });
            }
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    allLists: store.allLists,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listMarkedForDeletion: null,
                    showHome: store.showHome,
                    showAll: store.showAll,
                    showUsers: store.showUsers,
                    showCommunity: store.showCommunity,
                    search: ""
                })
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        let payload = {
            name: newListName,
            items: ["?", "?", "?", "?", "?"],
            ownerEmail: auth.user.email,
            savedName: newListName,
            savedItems: ["?", "?", "?", "?", "?"],
            userName: auth.user.userName,
            publishTime: new Date(),
            views: 0,
            likes: [],
            dislikes: [],
            comments: []
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    store.loadHomeLists = async function (query) {

        try {
            const response = await api.getAllTop5Lists({params: {userName: auth.user.userName, name: query}});
            if (response.data.success) {
                let listArray = response.data.data
                storeReducer({
                    type: GlobalStoreActionType.LOAD_HOME_LISTS,
                    payload: listArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LISTS");
            }
        }
        catch (e) {
            console.log("NO MATCHES FOUND")
            storeReducer({
                type: GlobalStoreActionType.LOAD_HOME_LISTS,
                payload: []
            });
        }
        finally {
            document.getElementById("home-button").style.border = '1px solid black';
            document.getElementById("all-button").style.border = '';
            document.getElementById("users-button").style.border = '';
            document.getElementById("community-button").style.border = '';
        }
    }
    store.loadAllLists = async function (query) {
        try {
            const response = await api.getAllTop5Lists({params: {name: query}});
            if (response.data.success) {
                let listArray = response.data.data.filter(lst => lst.userName !== "community")
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ALL_LISTS,
                    payload: {
                        array: listArray,
                        search: query
                    }
                });
            }
            else {
                console.log("API FAILED TO GET THE LISTS");
            }
        }
        catch (e) {
            console.log("NO MATCHES FOUND")
            storeReducer({
                type: GlobalStoreActionType.LOAD_ALL_LISTS,
                payload: {
                    array: [],
                    search: query
                }
            });
        }
        finally {
            document.getElementById("home-button").style.border = '';
            document.getElementById("all-button").style.border = '1px solid black';
            document.getElementById("users-button").style.border = '';
            document.getElementById("community-button").style.border = '';
        }
    }

    store.loadUserLists = async function(query) {
        try {
            const response = await api.getAllTop5Lists({params: {userName: query} });
            if (response.data.success) {
                let listArray = response.data.data.filter(lst => lst.userName !== "community")
                storeReducer({
                    type: GlobalStoreActionType.LOAD_USER_LISTS,
                    payload: {
                        array: listArray,
                        search: query
                    }
                });
            }
            else {
                console.log("API FAILED TO GET THE LISTS");
            }
        }
        catch (e) {
            console.log("NO MATCHES FOUND")
            storeReducer({
                type: GlobalStoreActionType.LOAD_USER_LISTS,
                payload: {
                    array: [],
                    search: query
                }
            });
        }
        finally {
            document.getElementById("home-button").style.border = '';
            document.getElementById("all-button").style.border = '';
            document.getElementById("users-button").style.border = '1px solid black';
            document.getElementById("community-button").style.border = '';
        }
    }
    store.loadCommunityLists = async function(query) {
        try {
            const response = await api.getAllTop5Lists({params: {name: query}});
            if (response.data.success) {
                let listArray = response.data.data
                store.findCommunityLists(listArray)
            }
            else {
                console.log("API FAILED TO GET THE LISTS");
            }
        }
        catch (e) {
            console.log("NO MATCHES FOUND")
            storeReducer({
                type: GlobalStoreActionType.LOAD_COMMUNITY_LISTS,
                payload: []
            });
        }
        finally {
            document.getElementById("home-button").style.border = '';
            document.getElementById("all-button").style.border = '';
            document.getElementById("users-button").style.border = '';
            document.getElementById("community-button").style.border = '1px solid black';
        }
    }

    store.updateCommunityList = async function (lists, clist) {
        // check if not community
        let rankedItems = new Map();
        let name = clist.name
        for (let top5list of lists) {
            if (top5list.name === name && top5list.userName !== 'community') {
                for (let item of top5list.items) {
                    if (!rankedItems.has(item)) {
                        rankedItems.set(item, 0)
                    }
                }
                rankedItems.set(top5list.items[0], rankedItems.get(top5list.items[0]) + 5)
                rankedItems.set(top5list.items[1], rankedItems.get(top5list.items[1]) + 4)
                rankedItems.set(top5list.items[2], rankedItems.get(top5list.items[2]) + 3)
                rankedItems.set(top5list.items[3], rankedItems.get(top5list.items[3]) + 2)
                rankedItems.set(top5list.items[4], rankedItems.get(top5list.items[4]) + 1)
            }
        }
        let communityItems = []
        let maxes = []
        for (let i = 0; i < 5; i++) {
            let max = Math.max(...rankedItems.values())
            maxes.push(max);
            for (let [key, value] of rankedItems.entries()) {
                if (value === max) {
                    communityItems.push(key);
                    rankedItems.delete(key);
                }
            }
        }
        let payload = {
            name: name,
            items: communityItems,
            ownerEmail: "community",
            savedName: name,
            savedItems: maxes,
            userName: "community",
            publishTime: new Date(),
            views: clist.views,
            likes: clist.likes,
            dislikes: clist.dislikes,
            comments: clist.comments,
        }
        const response = await api.updateTop5ListById(clist._id, payload);
        if (response.status === 200) {
            console.log("UPDATED COMMUNITY LIST!")
        }
    }
    
    store.findCommunityLists = async function(lists) {
        // THIS METHOD FIND COMMUNITY LISTS AND CREATES IF NECESSARY
        let uniqueNames = [... new Set(lists.map(lst => lst.name))].filter(name => !name.includes("Untitled")).sort()
        try {
            const response = await api.getAllTop5Lists({params: {userName: 'community'}});
            let communityLists = response.data.data;
            let listnames = communityLists.map(lst => lst.name).sort();
            if (uniqueNames.length > listnames.length) {
                for (let name of uniqueNames) {
                    if (!listnames.includes(name)) {
                        let payload = {
                            name: name,
                            items: [],
                            ownerEmail: "community",
                            savedName: name,
                            savedItems: [],
                            userName: "community",
                            publishTime: new Date(),
                            views: 0,
                            likes: [],
                            dislikes: [],
                            comments: []
                        }
                        const response = await api.createTop5List(payload);
                        if (response.data.success) {
                            console.log("COMMUNITY LIST CREATED")
                        }
                    }
                }
            }
        }
        catch (e) {
            // IF NO COMMUNITY LISTS THEN CREATE THEM 
            for (let name of uniqueNames) {
                let payload = {
                    name: name,
                    items: [],
                    ownerEmail: "community",
                    savedName: name,
                    savedItems: [],
                    userName: "community",
                    publishTime: new Date(),
                    views: 0,
                    likes: [],
                    dislikes: [],
                    comments: []
                }
                const response = await api.createTop5List(payload);
                if (response.data.success) {
                    console.log("COMMUNITY LIST CREATED")
                }
            }
        }
        finally {
            const response = await api.getAllTop5Lists({params: {userName: 'community'}});
            let communityLists = response.data.data
            for (let clist of communityLists) {
                store.updateCommunityList(lists, clist);
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_COMMUNITY_LISTS,
                payload: communityLists
            });
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = async function () {
        const response = await api.getTop5ListPairs();
        if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
                type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                payload: pairsArray
            });
        }
        else {
            console.log("API FAILED TO GET THE LIST PAIRS");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal

    store.markListForDeletion = async function (id) {
        // GET THE LIST
        console.log(id)
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.loadHomeLists();
            history.push("/");
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;

            response = await api.updateTop5ListById(top5List._id, top5List);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: top5List
                });
                history.push("/top5list/" + top5List._id);
            }
        }
    }

    store.saveList = function(data) {
        store.currentList.savedName = data.name;
        store.currentList.savedItems = data.list;
        store.updateCurrentList();
    }

    store.publishCurrentList = function(data) {
        store.currentList.name = data.name;
        store.currentList.items = data.list;
        store.currentList.savedName = data.name;
        store.currentList.savedItems = data.list;
        store.currentList.publishTime = new Date();
        store.updateCurrentList();
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: store.currentList
            });
            // console.log(store.currentList)
        }
        history.push('/')
    }

    store.updateList = async function () {
        if (store.showHome) {
            store.loadHomeLists();
        }
        else if (store.showAll) {
            store.loadAllLists();
        }
        else if (store.showUsers) {
            store.loadUserLists();
        }
        else if (store.showCommunity) {
            store.loadCommunityLists();
        }
    }

    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        
        history.push("/");
    }

    store.sortBy = function (sortType) {
        if (sortType === "new") {
            store.allLists.sort((a,b) => new Date(b.publishTime) - new Date(a.publishTime));
        }
        else if (sortType === "old") {
            store.allLists.sort((a,b) => new Date(a.publishTime) - new Date(b.publishTime));
        }
        else if (sortType === "views") {
            store.allLists.sort((a,b) => b.views - a.views);
        }
        else if (sortType === "likes") {
            store.allLists.sort((a,b) => b.likes.length - a.likes.length);
        }
        else if (sortType === "dislikes") {
            store.allLists.sort((a,b) => b.dislikes.length - a.dislikes.length);
        }
        history.push("/")
    }

    store.like = async function(id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.likes.includes(auth.user.userName)) {
                top5List.likes.splice(top5List.likes.indexOf(auth.user.userName), 1);
                console.log("LIKE REMOVED")
            }
            else if (top5List.dislikes.includes(auth.user.userName)) {
                top5List.dislikes.splice(top5List.dislikes.indexOf(auth.user.userName), 1);
                top5List.likes.push(auth.user.userName);
                console.log("DISLIKE REMOVED AND LIKED")
            }
            else {
                top5List.likes.push(auth.user.userName);
                console.log("LIKED")
            }
            response = await api.updateTop5ListById(id, top5List);
            store.updateList();
        }
    }

    store.dislike = async function(id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            if (top5List.dislikes.includes(auth.user.userName)) {
                top5List.dislikes.splice(top5List.dislikes.indexOf(auth.user.userName), 1);
                console.log("DISLIKE REMOVED")
            }
            else if (top5List.likes.includes(auth.user.userName)) {
                top5List.likes.splice(top5List.likes.indexOf(auth.user.userName), 1);
                top5List.dislikes.push(auth.user.userName);
                console.log("LIKE REMOVED AND DISLIKED")
            }
            else {
                top5List.dislikes.push(auth.user.userName);
                console.log("DISLIKED")
            }
            response = await api.updateTop5ListById(id, top5List);
            if (response.status === 200) {
                console.log("SUCCESS")
            }
            store.updateList();
        }
    }

    store.viewedList = async function(id) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.views += 1;
            response = await api.updateTop5ListById(id, top5List);
            if (response.status === 200) {
                console.log("VIEW COUNT UPDATED")
            }
            // store.updateList();
        }
    }

    store.comment = async function(id, comment) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.comments.unshift([auth.user.userName, comment])
            response = await api.updateTop5ListById(id, top5List);
            if (response.status === 200) {
                console.log("COMMENT ADDED");
            }
            store.updateList();
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };