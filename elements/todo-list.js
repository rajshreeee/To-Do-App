// Import PolymerElement class and html helper definition
import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat";

import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-fab/paper-fab.js";

export class ToDoList extends PolymerElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
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
          margin-left: 40%;
          position:relative;
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

        paper-button.indigo {
          background-color: rgb(0, 188, 212);
          color: white;
          --paper-button-raised-keyboard-focus: {
            background-color: var(--paper-pink-a200) !important;
            color: white !important;
          }
          margin-left: 50%;
         import '@polymer/paper-fab/paper-fab.js';

        }

        h3 {
          text-align: center;
        }

        paper-checkbox.blue {
          --paper-checkbox-checked-color: rgb(0, 188, 212);
          --paper-checkbox-checked-ink-color: rgb(0, 188, 212);
          --paper-checkbox-unchecked-color: rgb(0, 188, 212);
          --paper-checkbox-unchecked-ink-color: rgb(0, 188, 212);
          --paper-checkbox-label-color: var(--paper-blue-700);
          --paper-checkbox-label-checked-color: var(--paper-blue-900);
        }

        paper-input.custom:hover {
          border: 1px solid rgb(0, 188, 212);
        }

        #search{
          width:400px;
          margin-left:30%;
        }

        paper-input.custom {
          margin-bottom: 14px;
          --primary-text-color: black;
          --paper-input-container-color: black;
          --paper-input-container-focus-color: black;
          --paper-input-container-invalid-color: black;
          border: 1px solid rgb(0, 188, 212);
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

        paper-tab {
          background-color: rgb(0, 188, 212);
          color: white;
          font-weight: bold;
          position:relative;
        }

        .delete-icon{
          fill: rgb(0, 188, 212);
          stroke: rgb(0, 188, 212);
          position:absolute;
          top:50%;
          left:40%;
        }

        .header {
          background-color: rgb(0, 188, 212);
          position: relative;
        }

        h1,
        h2 {
          font-family: Arial;
          color: white;
          font-weight: 100;
          margin: 0;
          padding: 20px;
          text-align: center;
        }

        h1 {
          font-size: 30px;
        }
        h2 {
          font-size: 20px;
        }

        iron-icon {
          fill: white;
          stroke: white;
          position: absolute;
          top: 34%;
          left: 44%;
        }

        .tab-icon{
          fill: white;
          stroke: white;
          position: absolute;
          top: 24%;
          left: 39%;
        }

        iron-pages{
          margin: 10px 0;
        }
      </style>

      <div class="header">
        <h2>[[name]]</h2>
      </div>

      <paper-tabs selected="{{selected}}">
        <paper-tab>
          <iron-icon class="tab-icon" icon="add-box"></iron-icon> TO
          DO</paper-tab
        >

        <paper-tab
          ><iron-icon class="tab-icon" icon="assignment-turned-in"></iron-icon>
          COMPLETED</paper-tab
        >

        <paper-tab>
          <iron-icon class="tab-icon" icon="folder"></iron-icon> ALL</paper-tab
        >
      </paper-tabs>

      <iron-pages selected="{{selected}}">
        <div>
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
              <paper-fab
                icon="delete"
                on-click="deleteTask"
                args="[[tasks]]"
              ></paper-fab>
            </div>
          </template>

          <paper-button raised class="custom indigo" on-click="handleClick"
            >Add Task</paper-button
          >
        </div>

        <div>
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
              <paper-fab
                icon="delete"
                on-click="deleteTask"
                args="[[tasks]]"
              ></paper-fab>
            </div>
          </template>
        </div>

        <div>
          <paper-input
            id="search"
            label="Enter search"
            on-input="inputChange"
          ></paper-input>

          <template
            id="taskList"
            is="dom-repeat"
            items="{{tasks}}"
            as="task"
            filter="taskFilter"
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
              <paper-fab
              icon="delete"
              on-click="deleteTask"
              args="[[tasks]]"
            ></paper-fab>
            </div>
          </template>
        </div>
      </iron-pages>
      <paper-fab
      icon="delete"
      on-click="deleteAllTask"
    ></paper-fab>
    `;
  }
  inputChange() {
    this.filterText = this.$.search.value;
    this.$.taskList.render();
  }

  taskFilter(task) {
    return task.name.match(new RegExp(this.filterText, "i"));
  }

  isNotCompleted(tasks) {
    return !tasks.completed;
  }

  isCompleted(tasks) {
    return tasks.completed;
  }

  deleteAllTask(){
    let y = this.tasks.length;
    for(let i=0; i<y;i++){
      this.pop("tasks")
    }
  }

  deleteTask(e) {
    let name = e.model.get("task.name");
    let found = this.tasks.find(function(element) {
      if (element.name === name) {
        return element;
      }
    });
    let index = this.tasks.indexOf(found);
    this.splice("tasks", index, 1);
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
      },

      filterText: {
        type: String,
        value: ""
      }
    };
  }
}

// Associate the new class with an element name
customElements.define("todo-list", ToDoList);
