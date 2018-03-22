import axios from 'axios';

const initialState = {
    user: '',
    messages: [],
    matches: []
}

const GET_USER = 'GET_USER';
const GET_MESSAGES = 'GET_MESSAGES';
const SUBMIT_MESSAGE = 'SUBMIT_MESSAGE';

export function getUser() {
    const user = axios.get('/auth/me').then(res => {
        return res.data;
    })

    return {
        type: GET_USER,
        payload: user
    }
}

export function getMessages(userOne, userTwo) {
    const messages = axios.get(`/messages/${userOne}/${userTwo}`).then(res => {
        return res.data;
    })

    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

export function submitMessage(userOne, userTwo, messageText) {
    console.log(userOne, userTwo, messageText)
    const messages = axios.post('/messages/' + userOne + '/' + userTwo, { messageText: messageText }).then(res => {
        console.log(res)
        return res.data;
    })

    return {
        type: SUBMIT_MESSAGE,
        payload: messages
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case GET_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, { messages: action.payload });
        case SUBMIT_MESSAGE + '_FULFILLED':
            return Object.assign({}, state, { messages: action.payload })
        default:
        return state;
    }
}