import axios from 'axios';

const initialState = {
    user: {},
    messages: [],
    matches: [],
    dog: {}
}

const GET_USER = 'GET_USER';
const GET_MESSAGES = 'GET_MESSAGES';
const SUBMIT_MESSAGE = 'SUBMIT_MESSAGE';
const SUBMIT_NEW_DOG = 'SUBMIT_NEW_DOG';
const ADD_PROFILE_IMAGE = 'ADD_PROFILE_IMAGE';
const ADD_IMAGE = 'ADD_IMAGE';
const SUBMIT_DESCRIPTION = 'SUBMIT_DESCRIPTION';

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
    const messages = axios.get(`/api/messages/${userOne}/${userTwo}`).then(res => {
        return res.data;
    })

    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

export function submitMessage(userOne, userTwo, messageText) {
    const messages = axios.post('/api/messages/' + userOne + '/' + userTwo, { messageText: messageText }).then(res => {
        return res.data;
    })

    return {
        type: SUBMIT_MESSAGE,
        payload: messages
    }
}

export function submitNewDog(obj) {
    const dog = axios.post('/api/submitNewDog', obj).then(res => {
        return res.data[0]
    })

    return {
        type: SUBMIT_NEW_DOG,
        payload: dog
    }
}

export function addProfileImage(id, url) {
    const dog = axios.put(`/api/profileImage/${id}`, { url }).then(res => {
        return res.data[0]
    })

    return {
        type: ADD_PROFILE_IMAGE,
        payload: dog
    }
}

export function addImage(id, number, url) {
    const dog = axios.put(`/api/image/${id}`, { number, url }).then(res => {
        return res.data[0]
    })

    return {
        type: ADD_IMAGE,
        payload: dog
    }
}

export function submitDescription(id, desc) {
    const dog = axios.put(`/api/description/${id}`, { desc }).then(res => {
        return res.data[0]
    })

    return {
        type: SUBMIT_DESCRIPTION,
        payload: dog
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, { user: action.payload });
        case GET_MESSAGES + '_FULFILLED':
            return Object.assign({}, state, { messages: action.payload });
        case SUBMIT_MESSAGE + '_FULFILLED':
            return Object.assign({}, state, { messages: action.payload });
        case SUBMIT_NEW_DOG + '_FULFILLED':
            return Object.assign({}, state, { dog: action.payload });
        case ADD_PROFILE_IMAGE + '_FULFILLED':
            return Object.assign({}, state, { dog: action.payload });
        case ADD_IMAGE + '_FULFILLED':
            return Object.assign({}, state, { dog: action.payload });
        case SUBMIT_DESCRIPTION + '_FULFILLED':
            return Object.assign({}, state, { dog: action.payload });
        default:
        return state;
    }
}