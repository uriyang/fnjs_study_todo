import { createTemplate } from '../lib/utils.js';


const templateHTML =
  `<li>
			<input type="checkbox">
			<label></label> 
			<input type="text">
			<button class="edit">Edit</button>
			<button class="delete">Delete</button>
		</li>
	`;

export const newTaskComponetTemplate = createTemplate(templateHTML);