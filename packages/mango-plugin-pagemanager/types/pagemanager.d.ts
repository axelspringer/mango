import Vue, { Component, ComponentOptions, PluginFunction, AsyncComponent } from 'vue';

export declare enum PageManagerMode {
  Strict = 'STRICT'
}

export type PageManagerOptions = {
  blocks?: PageManagerOption[],
  mode?: PageManagerMode,
}

export type PageManagerBlock = {
  component: string;
  pageBlock: Component;
  result?: any[];
}

export type PageManagerOption = {
  component: Component;
  pageBlock: string;
}

export interface RouterOptions {
  blocks?: PageManagerBlock[],
  mode?: PageManagerMode,
}

export declare class PageManager {
  constructor(options?: PageManagerOptions);

  app: any;
  apps: Array<any>;
  mode: PageManagerMode;

  init(app: any): void;

  static install: PluginFunction<never>;
  static version: string;
}
