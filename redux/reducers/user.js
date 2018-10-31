const initialState = {
    isLoggedIn: false,
    hasSkippedLogin: false,
    id: null,
    name: null,
    token : null
};

function user(state = initialState, action) {
    switch (action.type) {
        case "LOGGED_IN":{
            console.log(action.data);
            let {id, res} = action.data;
            let name = res.name;
            let token = res.token;
            return {
                isLoggedIn : true,
                hasSkippedLogin: false,
                id,
                name,
                token
            };
        };
        case "LOGGED_OUT":{
            return initialState;
        };
        default:
            return state;
    }
}

export default user;