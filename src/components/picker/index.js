import React, { Component } from "react";
import classNames from "classnames";
import Avatar from "../avatar";
import "./style.css";

export default class Picker extends Component {
  constructor() {
    super();
    this.state = {
      start: false,
      text: "Click to exclude reviewers, then spin when ready"
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleClick(index) {
    this.props.onToggle(index);
  }

  handleStart() {
    const items = this.props.items || [];
    const activeItems = items.filter(item => !item.xed);
    const length = activeItems.length;
    if (length > 1) {
      this.setState({ start: true, text: "Here we go!" }, () => {
        setTimeout(() => {
          this.props.onStart();
        }, 650);
      });
    }
  }
  render() {
    const items = this.props.items || [];
    const { start, text } = this.state;
    const activeItems = items.filter(item => !item.xed);
    const length = activeItems.length;

    return (
      <div className={classNames("picker-root", { start: start })}>
        <header className="picker-header">{text}</header>
        <div className="picker-avatars">
          {items.map((item, i) => (
            <Avatar
              name={item.name}
              xed={item.xed}
              src={item.src}
              key={i}
              onClick={() => this.handleClick(i)}
            />
          ))}
        </div>
        <div
          className={classNames("picker-start", { disabled: length < 3 })}
          onClick={this.handleStart}>
          Let's spin!
        </div>
      </div>
    );
  }
}
