import React, { Component } from "react";
import Avatar from "../avatar";
import Slot from "../slot";
import "./style.css";
export default class Roulette extends Component {
  render() {
    const { items, target, active } = this.props;
    const filteredItems = items.filter(item => !item.xed);
    return (
      <div className="roulette-root" id="roulette">
        {active && (
          <Slot
            target={target}
            duration={2000}
            times={20}
            onEnd={this.props.onEnd}>
            {filteredItems.map((item, i) => (
              <Avatar name={item.name} xed={item.xed} src={item.src} key={i} />
            ))}
          </Slot>
        )}
      </div>
    );
  }
}
