import axios from 'axios'
import { omit } from 'lodash'
import create from './create'

export default function (config = {}): any {
  // omit the discovery config
  const axiosConfig = omit(config, ['discovery', 'cache'])

  // create a new adapter
  const { adapter } = create(config)

  // create axios instance and attach adapter
  const fetch: any = axios.create({ ...axiosConfig, adapter })

  // return the fetcher api
  return fetch
}
