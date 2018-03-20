import { SET_LINKS, 
    ADD_LINK, 
    LINK_FETCHED, 
    LINK_UPDATED, 
    LINK_DELETED

} from "../actions/links";

export default function links(state = [], action = {}){
    switch(action.type){
        default: return state;

        case SET_LINKS:
            return action.links;

        case ADD_LINK:
            return [
                ...state,
                action.link
            ];

        case LINK_UPDATED:
            return state.map(item => {
                if(item.id === action.link.id) return action.link;
                return item;
            });

        case LINK_FETCHED:
            const index = state.findIndex(item => item.id === action.link.id);
            if(index > -1){
                return state.map(item => {
                    if(item.id === action.link.id) return action.link;
                    return item;
                })
            } else {
                return [
                    ...state,
                    action.link
                ];
            }

        case LINK_DELETED:
            return state.filter(item => item.id !== action.linkID);
    }
}