import { createTemplate } from '../lib/utils.js';

const templateHTML =
  `<style>
			input,
			button {
				outline: none;
			}

			button {
				background: none;
				border: 0px;
				color: #888;
				font-size: 15px;
				width: 60px;
				margin: 10px 0 0;
				font-family: Lato, sans-serif;
				cursor: pointer;
			}

			button:hover {
				color: #333;
			}
			/* Heading */

			h3,
			label[for='new-task'] {
				color: #333;
				font-weight: 700;
				font-size: 15px;
				border-bottom: 2px solid #333;
				padding: 30px 0 10px;
				margin: 0;
				text-transform: uppercase;
			}

			input[type="text"] {
				margin: 0;
				font-size: 18px;
				line-height: 18px;
				height: 18px;
				padding: 10px;
				border: 1px solid #ddd;
				background: #fff;
				border-radius: 6px;
				font-family: Lato, sans-serif;
				color: #888;
			}

			input[type="text"]:focus {
				color: #333;
			}
			/* New Task */

			label[for='new-task'] {
				display: block;
				margin: 0 0 20px;
			}

			input#new-task {
				float: left;
				width: 318px;
			}

			p>button:hover {
				color: #0FC57C;
			}
		</style>
    
		<p>
			<label for="new-task">Add TODO</label>
			<input id="new-task" type="text">
			<button id="add-btn">Add</button>
		</p>
`;

export const addTodoCompoentTemplate = createTemplate(templateHTML);