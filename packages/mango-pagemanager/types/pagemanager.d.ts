import Vue, { Component, ComponentOptions, PluginFunction, AsyncComponent } from "vue";

export type PageManagerMode = "STRICT"

export type PageManagerOptions = {
  blocks?: PageManagerOption[],
  mode?: PageManagerMode,
}

export type PageManagerResult = any[]

export type PageManagerBlock = {
  component: string;
  pageBlock: Component;
  result?: any[];
}

export type PageManagerOption = {
  component: Component;
  pageBlock: string;
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
