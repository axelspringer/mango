import Media from './media'
import Author from './author'
import Image from './image'

export default class Post {
  public date = new Date()
  public dateGmt = new Date()
  public id: number = null
  public link: string = null
  public modified = new Date()
  public modifiedGmt = new Date()
  public status = null
  public type = null
  public excerpt = null
  public featuredMedia = new Media()
  public commentStatus = null
  public pingStatus = null
  public title = null
  public sticky = false
  public meta = []
  public categories = []
  public tags = []
  public template = null
  public content = null
  public slug = null
  public author = new Author()
  public format = null
  public pagemanager = null
  public img = new Image()
  public acf = null
  public embedded = null
}
