import axios from 'axios'
import * as url from 'url'

// config
import config from './config'

const PREFIX = '/wp-json/wp/v2'

// fetch posts
export function fetchByResource(path, params) {
  return axios.get(url.resolve(config.api, PREFIX + path), {
    params
  }).then(res => res.data)
}

export function fetchPosts(params) {
  return fetchByResource('/posts', params).then(res => res)
}

export function fetchPost(id, params) {
  return fetchByResource(`/posts/${id}`, params)
    .then(res => res)
}
