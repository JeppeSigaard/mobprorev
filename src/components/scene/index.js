import React, { Component } from "react";
import classNames from "classnames";
import "./style.css";

export default class Scene extends Component {
  render() {
    const { active } = this.props;

    return (
      <div className={classNames("scene-root", { active: active })}>
        {this.props.children}
      </div>
    );
  }
}
