import axios from 'axios'

const instans = axios.create({
    baseURL: 'http://dimzidit.anosov.ru/api'
})

export default instans