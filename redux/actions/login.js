import axios from 'axios';
import { clientId, clientSecret, apiUrl} from '../../config';
import { getUserInfo } from './user';

export const logIn = (u, p) => (
    (dispatch) => {
        axios.post(apiUrl, _OAuthTokenHelper(), _basicAuthHelper(u, p))
            .then(res => {
                dispatch(parseLogIn(u, res.data))
                dispatch(getUserInfo(u))
            }).catch(e => {
                if (e.response) {
                    console.log(e.response.status);
                }
            });
    }
);

export const parseLogIn = (id, res) => ({
    type : "LOGGED_IN",
    data : {
        id : id,
        res
    }
});

const _OAuthTokenHelper = () =>({
    "client_id" : clientId,
    "client_secret" : clientSecret,
    "note": "CS242 MP3",
    "scopes": ["repo", "user:follow"]
})

const _basicAuthHelper = (u, p) => ({
    auth: {
        username: u,
        password: p
    }
})

export const logOut = () => ({type : "LOGGED_OUT"});