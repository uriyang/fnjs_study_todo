import { render } from '../lib/utils.js';

export class abstractElement extends HTMLElement {
  
  render(context, template){
    render( this ,template );
  }  

};