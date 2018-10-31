import axios from 'axios';

export const getUserInfo = (id) => (
    (dispatch, getState) => {
        console.log('user')
        const token=  getState().user.token;
        const authParams = { params : {access_token : token}}
        axios.get(`https://api.github.com/users/${id}`, authParams)
            .then(res =>{
                dispatch(parseInfoProfile(id, res.data));
                //dispatch(getUserRepos(id));
                //dispatch(getUserFollowers(id));
                //dispatch(getUserFollowing(id));
            })
    }
);
export const getUserStarredRepos = (id) => (
    (dispatch, getState) => {
        const token=  getState().user.token;
        const authParams = { params : {access_token : token}}
        axios.get(`https://api.github.com/users/${id}/starred`, authParams)
            .then(res =>{
                dispatch(parseInfoRepos(id, res.data));
            })
    }
)
export const getUserRepos = (id) => (
    (dispatch, getState) => {
        const token=  getState().user.token;
        const authParams = { params : {access_token : token}}
        axios.get(`https://api.github.com/users/${id}/repos`, authParams)
            .then(res =>{
                dispatch(parseInfoRepos(id, res.data));
            })
    }
)

export const getUserFollowers = id => (
    (dispatch, getState) => {
        const token=  getState().user.token;
        const authParams = { params : {access_token : token}}
        axios.get(`https://api.github.com/users/${id}/followers`, authParams)
            .then(res =>{
                dispatch(parseInfoUsers(id, res.data));
            })
    }
);

export const getUserFollowing = id => (
    (dispatch, getState) => {
        const token=  getState().user.token;
        const authParams = { params : {access_token : token}}
        axios.get(`https://api.github.com/users/${id}/following`, authParams)
            .then(res =>{
                dispatch(parseInfoUsers(id, res.data));
            })
    }
);

export const parseInfoUsers = (id, res) => ({
    type : "PARSED_INFO",
    view : "Users",
    data : {
        id : id,
        res
    }
});

export const parseInfoRepos = (id, res) => ({
    type : "PARSED_INFO",
    view : "Repos",
    data : {
        id : id,
        res
    }
});

export const parseInfoProfile = (id, res) => ({
    type : "PARSED_INFO",
    view : "Profile",
    data : {
        id : id,
        res
    }
});