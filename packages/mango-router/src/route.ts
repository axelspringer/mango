import { RouteConfig } from 'vue-router/types'

export class Route {
  constructor(public cmp, public config: RouteConfig) {
    if (this.cmp) {
      this.config.component = this.cmp
    }
  }
}

export class Home extends Route {
  public static path = ''
  public static default = {
    name: 'home'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Home.default, config))
  }
}

export class Category extends Route {
  public static path = '/:wpCategory'
  public static default = {
    name: 'category'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Tag extends Route {
  public static path = '/:wpTag'
  public static default = {
    name: 'tag'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Year extends Route {
  public static path = '/:wpYear'
  public static default = {
    name: 'year'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Month extends Route {
  public static path = '/:wpMonth'
  public static default = {
    name: 'month'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Day extends Route {
  public static path = '/:wpDay'
  public static default = {
    name: 'day'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Post extends Route {
  public static path = '/:wpPost'
  public static default = {
    name: 'post'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Language extends Route {
  public static path = '/:lang'
  public static default = {
    name: 'lang'
  }

  constructor(cmp, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Language.default, config))
  }
}
