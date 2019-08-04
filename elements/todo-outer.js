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
import "@polymer/paper-card/paper-card.js";

import "./beer-list-item";

const suggestions = [
  "Do Homework",
  "Clean Room",
  "Get Groceries",
  "Do Laundry"
];

export class TodoOuter extends PolymerElement {
  constructor() {
    super();
  }

  static get template() {
    return html`
      <style></style>

      <template is="dom-repeat" items="{{tasks}}" as="task">
        <beer-list-item name="Shopping ToDo"></beer-list-item>
      </template>

      <paper-button raised on-click="handleClick">Add To Do List</paper-button>

      <paper-button raised on-click="showSuggestions"
        >Suggest Tasks</paper-button
      >
      <paper-card>[[suggestion]]</paper-card>
    `;
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
    const newVal = 1;
    this.push("tasks", newVal);
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
