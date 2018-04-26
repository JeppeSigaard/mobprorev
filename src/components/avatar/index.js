import React, { Component } from "react";
import classNames from "classnames";
import "./style.css";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (typeof this.props.onClick === "function") {
      this.props.onClick();
    }
  }
  render() {
    const { name, src, xed } = this.props;
    return (
      <div
        className={classNames("avatar-root", { xed: xed })}
        style={{ backgroundImage: `url(${src})` }}
        onClick={this.handleClick}>
        <span className="avatar-name">{name || "name"}</span>
        {xed && <span className="avatar-x">&times;</span>}
      </div>
    );
  }
}
