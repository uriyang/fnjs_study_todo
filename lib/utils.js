import { createEl, prop, appendChild, appendChildR } from '../lib/dom.js';
import { go } from 'partial-js';
import { curry, curryr } from '../lib/fp.js';

export const createTemplate = (templateHTML) => go(createEl('template'), prop('innerHTML', templateHTML));

export const attachShadow = curryr((context, mode) => context.attachShadow({ 'mode': mode }));

export const render = curryr((context, template) =>
  go(context
    , attachShadow('open')
    , appendChildR(template.content.cloneNode(true))
  )
);

export const renderEl = curryr((context, template) =>
  go(context
    , appendChildR(template.content.cloneNode(true))
  )
);


export const clearVal = (elm)=> go(elm, prop('value', '')); 