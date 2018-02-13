import { RouteConfig } from 'vue-router/types'
import { Component } from 'vue/types'

export class Route {
  constructor(public cmp: Component, public config: RouteConfig) {
    this.config.component = cmp
  }
}

export class Home extends Route {
  public static path = ''
  public static default = {
    name: 'home'
  }

  constructor(cmp: Component, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Home.default, config))
  }
}

export class Category extends Route {
  public static path = '/:wpCategory'
  public static default = {
    name: 'category'
  }

  constructor(cmp: Component, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Tag extends Route {
  public static path = '/:wpTag'
  public static default = {
    name: 'tag'
  }

  constructor(cmp: Component, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Year extends Route {
  public static path = '/:wpYear'
  public static default = {
    name: 'year'
  }

  constructor(cmp: Component, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Month extends Route {
  public static path = '/:wpMonth'
  public static default = {
    name: 'month'
  }

  constructor(cmp: Component, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Day extends Route {
  public static path = '/:wpDay'
  public static default = {
    name: 'day'
  }

  constructor(cmp: Component, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}

export class Post extends Route {
  public static path = '/:wpPost'
  public static default = {
    name: 'post'
  }

  constructor(cmp: Component, path: string, config = {}) {
    super(cmp, Object.assign({}, { path }, Category.default, config))
  }
}
