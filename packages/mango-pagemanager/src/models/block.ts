export type BlockOptions = {
  index?: number
  block?: PageManagerBlock
}

export type PageManagerBlock = {
  page_block?: string
  result?: any[]
  page_type?: string
}

export default class Block {
  public index: number
  public name: string
  public page_type: string
  public result: any[] = []

  constructor({ index, block }: BlockOptions) {
    this.index = index || this.index
    this.name = block && block.page_block ? block.page_block : this.name
    this.page_type = block && block.page_type ? block.page_type : this.page_type
    this.result = block && Array.isArray(block.result) ? block.result : this.result
  }

  /**
   * Finds a result in the block
   *
   * @param {string} name
   * @return {(object|undefined)}
   */
  public find(name: string) {
    // this also accounts for the strange data structure of the PageManager
    const result = this.result.find(b => b.name === name)
    return result ? result.value : {}
  }
}
