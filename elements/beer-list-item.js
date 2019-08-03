// Import PolymerElement class and html helper definition
import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat";

import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";
import "@polymer/iron-pages/iron-pages.js";

// Define the element's class element
export class BeerListItem extends PolymerElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const newTask = {
      name: "",
      completed: false
    };
    this.push("tasks", newTask);
  }
  static get template() {
    return html`
      <style>
        .todo {
          display: flex;
          align-items: center;
          margin-left: 30%;
        }
        paper-button.custom {
          margin-left: 45%;
          --paper-button-ink-color: var(--paper-pink-a200);
          /* These could also be individually defined for each of the
              specific css classes, but we'll just do it once as an example */
          --paper-button-flat-keyboard-focus: {
            background-color: var(--paper-pink-a200) !important;
            color: white !important;
          }
          --paper-button-raised-keyboard-focus: {
            background-color: var(--paper-pink-a200) !important;
            color: white !important;
          }
        }
        paper-button.custom:hover {
          background-color: var(--paper-indigo-100);
        }
        paper-button.pink {
          color: var(--paper-pink-a200);
        }
        paper-button.indigo {
          background-color: var(--paper-indigo-500);
          color: white;
          --paper-button-raised-keyboard-focus: {
            background-color: var(--paper-pink-a200) !important;
            color: white !important;
          }
        }
        paper-button.green {
          background-color: var(--paper-green-500);
          color: white;
        }
        paper-button.green[active] {
          background-color: var(--paper-red-500);
        }
        paper-button.disabled {
          color: white;
          background-color: bisque;
        }

        h3 {
          text-align: center;
        }

        paper-checkbox.blue {
          --paper-checkbox-checked-color: var(--paper-blue-500);
          --paper-checkbox-checked-ink-color: var(--paper-blue-500);
          --paper-checkbox-unchecked-color: var(--paper-blue-900);
          --paper-checkbox-unchecked-ink-color: var(--paper-blue-900);
          --paper-checkbox-label-color: var(--paper-blue-700);
          --paper-checkbox-label-checked-color: var(--paper-blue-900);
        }

        .custom-parent {
          font-size: 12px;
        }

        paper-input.custom:hover {
          border: 1px solid #29b6f6;
        }

        paper-input.custom {
          margin-bottom: 14px;
          --primary-text-color: #01579b;
          --paper-input-container-color: black;
          --paper-input-container-focus-color: black;
          --paper-input-container-invalid-color: black;
          border: 1px solid #bdbdbd;
          border-radius: 5px;
          width: 400px;

          /* Reset some defaults */
          --paper-input-container: {
            padding: 0;
          }
          --paper-input-container-underline: {
            display: none;
            height: 0;
          }
          --paper-input-container-underline-focus: {
            display: none;
          }

          /* New custom styles */
          --paper-input-container-input: {
            box-sizing: border-box;
            font-size: inherit;
            padding: 4px;
          }
          --paper-input-container-input-focus: {
            background: rgba(0, 0, 0, 0.1);
          }
          --paper-input-container-input-invalid: {
            background: rgba(255, 0, 0, 0.3);
          }
          --paper-input-container-label: {
            top: -8px;
            left: 4px;
            background: white;
            padding: 2px;
            font-weight: bold;
          }
          --paper-input-container-label-floating: {
            width: auto;
          }
        }
      </style>
      <h2>[[name]]</h2>

      <paper-tabs selected="{{selected}}">
        <paper-tab>TO DO</paper-tab>
        <paper-tab>COMPLETED</paper-tab>
        <paper-tab>ALL</paper-tab>
      </paper-tabs>

      <iron-pages selected="{{selected}}">
        <div>
          <h3>To Do</h3>
          <template
            is="dom-repeat"
            items="{{tasks}}"
            as="task"
            filter="isNotCompleted"
            observe="completed"
          >
            <div class="todo">
              <paper-checkbox class="blue" checked="{{task.completed}}">
              </paper-checkbox>
              <paper-input
                class="custom"
                char-counter
                maxlength="50"
                label="Task"
                value="{{task.name}}"
                always-float-label
              >
              </paper-input>
            </div>
          </template>

          <paper-button raised class="custom indigo" on-click="handleClick"
            >Add Task</paper-button
          >
        </div>

        <div>
          <h3>Completed:</h3>
          <template
            is="dom-repeat"
            items="{{tasks}}"
            as="task"
            filter="isCompleted"
            observe="completed"
          >
            <div class="todo">
              <paper-checkbox class="blue" checked="{{task.completed}}">
              </paper-checkbox>
              <paper-input
                class="custom"
                char-counter
                maxlength="50"
                label="Task"
                value="{{task.name}}"
                always-float-label
              >
              </paper-input>
            </div>
          </template>
        </div>

        <div>
          <paper-input
            id="search"
            label="Enter search"
            on-input="_inputChange"
          ></paper-input>

          <template is="dom-repeat" items="{{tasks}}" as="task">
            <div class="todo">
              <paper-checkbox class="blue" checked="{{task.completed}}">
              </paper-checkbox>
              <paper-input
                class="custom"
                char-counter
                maxlength="50"
                label="Task"
                value="{{task.name}}"
                always-float-label
              >
              </paper-input>
            </div>
          </template>
        </div>
      </iron-pages>
    `;
  }

  isNotCompleted(tasks) {
    return !tasks.completed;
  }

  isCompleted(tasks) {
    return tasks.completed;
  }

  static get properties() {
    return {
      selected: {
        type: Number,
        value: 0
      },
      name: {
        type: String,
        value: "To Do List"
      },
      tasks: {
        type: Array,
        value: () => []
      }
    };
  }
}

// Associate the new class with an element name
customElements.define("beer-list-item", BeerListItem);
