import _ from "lodash";

let initialState = {
   showDashboard :false,
   saveGetResponse :[],
   updateItemId :0,
   showLogin :null
};

function cmn(state = initialState, action) {
    switch (action.type) {
        case 'showDashboard':
            return {
                ...state,
                showDashboard: _.cloneDeep(action.payload),
            };
            case 'saveGetResponse':
                return {
                    ...state,
                    saveGetResponse: _.cloneDeep(action.payload),
                };
                case 'updateItemId':
            return {
                ...state,
                updateItemId: _.cloneDeep(action.payload),
            };
        default:
            return state;
    }
}

export default cmn;



