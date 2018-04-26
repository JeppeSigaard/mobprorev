import React, { Component } from "react";
import { reviewers } from "./constants/reviewers";
import Scene from "./components/scene";
import Picker from "./components/picker";
import Roulette from "./components/roulette";
import Winner from "./components/winner";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { scene: "picker", items: reviewers, target: false };
    this.handleStart = this.handleStart.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleToggle(index) {
    const newItems = [...this.state.items];
    newItems[index].xed = !newItems[index].xed;
    this.setState({ items: newItems });
  }

  handleStart() {
    this.setState({ scene: "roulette" });
    const { items } = this.state;
    const filteredItems = [...items].filter(item => !item.xed).reverse();
    let target = Math.floor(Math.random() * filteredItems.length - 1);
    setTimeout(() => {
      this.setState({ target: target });
    }, 500);
  }

  handleComplete() {
    this.setState({ scene: "winner" });
  }

  render() {
    const { scene, items, target } = this.state;
    return (
      <div className={`App type-${scene}`}>
        <div
          className="app-bg"
          style={{
            backgroundImage: "url(/images/conf.gif)"
          }}
        />
        <Scene active={scene === "picker"}>
          <Picker
            active={scene === "picker"}
            items={items}
            onStart={this.handleStart}
            onToggle={this.handleToggle}
          />
        </Scene>
        <Scene active={scene === "roulette"}>
          <Roulette
            items={items}
            target={target}
            onComplete={this.handleComplete}
            active={scene === "roulette"}
            onEnd={this.handleComplete}
          />
        </Scene>
        <Scene active={scene === "winner"}>
          <Winner target={target} items={items} active={scene === "winner"} />
        </Scene>
      </div>
    );
  }
}

export default App;
