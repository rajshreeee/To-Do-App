// Import PolymerElement class and html helper definition
import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/polymer/lib/elements/dom-repeat";

import "@polymer/paper-input/paper-input.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-fab/paper-fab.js";
import "@polymer/paper-card/paper-card.js";

import "./todo-list";

const suggestions = [
  "Do Homework",
  "Clean Room",
  "Get Groceries",
  "Do Laundry"
];

export class TodoOuter extends PolymerElement {
  constructor() {
    super();
    this.deleteAll = this.deleteAll.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  static get template() {
    return html`
      <style>
        h1 {
          font-family: Arial;
          color: white;
          font-weight: 100;
          margin: 0;
          padding: 20px;
          text-align: center;
          font-size: 30px;
        }
        .header {
          background-color: rgb(0, 188, 212);
          position: relative;
          border-bottom: 1px solid white;
        }
        iron-icon {
          fill: white;
          stroke: white;
          position: absolute;
          top: 34%;
          left: 44%;
        }

        paper-card {
          padding: 10px;
        }

        temp{
            margin:10px 0;
        }
      </style>
      <div class="header">
        <iron-icon icon="assignment"></iron-icon>
        <h1>To Do App</h1>
      </div>

      <template  is="dom-repeat" items="{{tasks}}" as="task">
        <paper-input
        class="temp"

          char-counter
          maxlength="50"
          label="To Do List Name"
          value="{{task.name}}"
        ></paper-input>
        <paper-button raised on-click="deleteOne"
          >Delete Current To Do
        </paper-button>

        <todo-list name="{{task.name}}"></todo-list>
      </template>

      <paper-button raised on-click="showSuggestions"
        >Suggest Tasks</paper-button
      >
      <paper-card>[[suggestion]]</paper-card>
      <paper-button raised on-click="handleClick">Add To Do List</paper-button>
      <paper-button raised on-click="deleteAll"
        >Delete All To Do Lists</paper-button
      >
    `;
  }

  deleteOne(e) {
    console.log("wat");
    let name = e.model.get("task.name");
    let found = this.tasks.find(function(element) {
      if (element.name === name) {
        return element;
      }
    });
    let index = this.tasks.indexOf(found);
    this.splice("tasks", index, 1);
  }

  deleteAll() {
    let y = this.tasks.length;
    for (let i = 0; i < y; i++) {
      this.pop("tasks");
    }
  }

  static get properties() {
    return {
      tasks: {
        type: Array,
        value: () => []
      },

      suggestion: {
        type: String,
        value: ""
      }
    };
  }

  handleClick() {
    const task = {
      name: "List"
    };
    this.push("tasks", task);
  }

  getNumber() {
    return (this.getNumber.number = Math.floor(Math.random() * (3 + 1))) ===
      this.getNumber.lastNumber
      ? this.getNumber()
      : (this.getNumber.lastNumber = this.getNumber.number);
  }

  showSuggestions() {
    this.suggestion = suggestions[this.getNumber()];
  }
}

// Associate the new class with an element name
customElements.define("todo-outer", TodoOuter);
