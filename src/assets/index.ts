import C from './images/C.png';
import Typescript from './images/TypeScript.png';
import Javascript from './images/JavaScript.png';
import Go from './images/Go.png';
import Java from './images/Java.png';
import Angular from './images/angular.png';
import Github from './images/github.png';
import Node from './images/nodejs.png';
import React from './images/react.png';
import Slack from './images/slack.png';
import Vue from './images/vue.jpeg';
import shoppingCart from './images/shopping-cart.png';
import square from './images/square.png';

export interface IAssets {
  [name: string]: string;
}
const Assets: IAssets = {
  Typescript,
  Go,
  Javascript,
  Java,
  C,
  Angular,
  Github,
  Node,
  React,
  Slack,
  Vue,
  shoppingCart,
  square,
};

export default Assets;
