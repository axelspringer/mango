import { sha256 } from 'js-sha256'

export default function hashing(hashable) {
  try {
    hashable = JSON.stringify(hashable)
    hashable = sha256(hashable)
  } catch (e) {
    return // noop
  }

  return hashable
}
