import database from '../database';
import uuidv1 from 'uuid/v1';

export const SET_LINKS = 'SET_LINKS';
export const ADD_LINK = 'ADD_LINK';
export const LINK_UPDATED = 'LINK_UPDATED';
export const LINK_FETCHED = 'LINK_FETCHED';
export const LINK_DELETED = 'LINK_DELETED';
export const LINK_SEARCHED = 'LINK_SEARCHED';

export function setLinks(links){
    return {
        type: SET_LINKS,
        links
    }
}

export function addLink(link){
    return {
        type: ADD_LINK,
        link
    }
}

export function linkUpdated(link){
    return {
        type: LINK_UPDATED,
        link
    }
}

export function linkFetched(link){
    return {
        type: LINK_FETCHED,
        link
    }
}

export function linkDeleted(linkID){
    return {
        type: LINK_DELETED,
        linkID
    }
}

export function fetchLinks(){
    return dispatch => {
        return database.ref('links').once("value").then((snapshot) => {
            let result = [];
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                result.push(childData);
            });
            //Sort the records descending order by 'updateAt' value
            dispatch(setLinks(result.sort((a, b) => b.updateAt - a.updateAt)))
        })
    }
}

export function fetchLink(id){
    return dispatch => {
        return database.ref('links/'+ id).once("value").then((snapshot) => {
            if(snapshot.exists()){
                dispatch(linkFetched({ link: snapshot.val()}))
            }
        });
    }
}

export function saveLink(data){

    let d = new Date();
    let timestamp = d.getTime();

    let obj = {
        id: uuidv1(),
        title: data.title,
        url: data.url,
        isShared: data.isShared,
        tags: data.tags ? data.tags : [],
        updateAt: timestamp
    };

    return dispatch => {
        return database.ref('links').child(obj.id).set(obj).then(() => {
            dispatch(addLink({ link: obj }));
        });

    }
}

export function updateLink(data){


    let d = new Date();
    let timestamp = d.getTime();

    let obj = {
        id: data.id,
        title: data.title,
        url: data.url,
        isShared: data.isShared,
        tags: data.tags ? data.tags : [],
        updateAt: timestamp
    };

    return dispatch => {
        return database.ref('links').child(data.id).update(obj).then(() => {
            dispatch(linkUpdated({ link: obj }))
        });
    }
}

export function deleteLink(id){
    return dispatch => {
        return database.ref('links/'+ id).remove()
            .then(dispatch(linkDeleted(id)));
    }
}