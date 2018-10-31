const initialState = {
    currentTab: 'Home',
    currentView: 'Profile',
    data : null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case "PARSED_INFO":
            return {
                ...state,
                currentView: action.view,
                data : action.data.res
            };
        default:
            return state;
    }
}