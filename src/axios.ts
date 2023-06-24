import axios from 'axios'

const instans = axios.create({
    baseURL: 'http://dimzidit.anosov.ru/api'
    // baseURL: 'http://localhost:5555'
})

export default instans