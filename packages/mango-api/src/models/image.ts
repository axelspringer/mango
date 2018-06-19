import ImageSize from './imageSize'

export default class Image {
  public id = 0
  public alt = null
  public thumbnail = new ImageSize()
  public medium = new ImageSize()
  public medium_large = new ImageSize()
  public full = new ImageSize()
}
