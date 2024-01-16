import axios from 'axios'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('userToken')
axios.defaults.headers.common['Content-type'] = 'application/json' 
//axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'OPTIONS, GET, POST'
//axios.defaults.headers.common['Access-Control-Allow-Headers'] =  "Origin, X-Requested-With, Content-Type, Accept, Authorization"