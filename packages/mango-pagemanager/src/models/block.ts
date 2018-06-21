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
}
