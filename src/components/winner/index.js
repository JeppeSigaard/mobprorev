import React, { Component } from "react";
import Avatar from "../avatar";
import "./style.css";

export default class Winner extends Component {
  render() {
    const { items, target, active } = this.props;
    const filteredItems = items.filter(item => !item.xed);
    const winner = filteredItems[target];
    return (
      <div className="winner-root">
        {winner &&
          active && (
            <div>
              <h3 className="winner-title">Your reviewer is {winner.name}</h3>
              <Avatar name={winner.name} src={winner.src} />
            </div>
          )}
      </div>
    );
  }
}
