import React from "react";
import { findDOMNode } from "react-dom";

class Slot extends React.Component {
  constructor() {
    super();
    this.targetRefs = [];
    this.easing = function easeOutQuad(
      elapsed,
      initialValue,
      amountOfChange,
      duration
    ) {
      return (
        -amountOfChange * (elapsed /= duration) * (elapsed - 2) + initialValue
      );
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.target === prevProps.target) return;

    const $frame = this.FrameRef;

    $frame.scrollTop = 0;

    if (this.props.target === false) return;

    const $target = findDOMNode(this.targetRefs[this.props.target]);

    if ($target == null) return;

    const fullScroll = findDOMNode(this.targetRefs[this.targetRefs.length - 1])
      .offsetTop;
    const targetOffset = $target.offsetTop;

    const totalScroll = targetOffset + fullScroll * (this.props.times - 1);

    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed > this.props.duration) {
        this.props.onEnd();
        return;
      }

      const amount = this.easing(elapsed, 0, totalScroll, this.props.duration);
      $frame.scrollTop = amount % fullScroll;

      requestAnimationFrame(tick);
    };

    tick();
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{ overflow: "hidden", position: "relative" }}
        ref={FrameRef => (this.FrameRef = FrameRef)}>
        {this.props.children.map((child, index) =>
          React.cloneElement(child, {
            ref: ref => (this.targetRefs[index] = ref)
          })
        )}
      </div>
    );
  }
}

export default Slot;
