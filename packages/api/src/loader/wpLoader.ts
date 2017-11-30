import axios from 'axios'
import config from '../config'

export const fetchWp = async (url, params) => {
  return axios.get(config.api + url, { params }).then(res => res.data)
}
