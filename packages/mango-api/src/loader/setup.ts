import { setup } from 'axios-cache-adapter'
import axios from 'axios'
import Env from '../env'

export default function (config) {
  return Env.Development ? axios.create(config) : setup(config)
}
