function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}
class CopyToClipboard extends React.Component {
  copy() {
    const textarea = this.textarea;
    let { text, onCopy, silent } = this.props;
    silent =
    typeof silent === "boolean" ||
    silent.toLowerCase() == "true" ||
    silent == "1";
    textarea.value = onCopy.call(this, text);
    textarea.select();
    width;
    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      if (!silent) {
        prompt("Copying text command was " + msg, textarea.value);
      }
    } catch (err) {
      alert(`Oops, unable to copy (${err.message})`);
    }
  }
  render() {
    const { label } = this.props;
    const attr = {
      style: this.props.style,
      className: this.props.className };

    return /*#__PURE__*/(
      React.createElement("p", null, /*#__PURE__*/
      React.createElement("button", _extends({ onClick: () => this.copy() }, attr),
      label), /*#__PURE__*/

      React.createElement("textarea", {
        ref: textarea => {
          this.textarea = textarea;
        },
        style: { position: "absolute", top: "-1000px" } })));



  }}

CopyToClipboard.defaultProps = {
  label: "Copy",
  silent: false,
  text:
  "Set prop 'text' to your text to copy, or add call back function 'onCopy' which returns the value to copy",
  onCopy: txt => {
    // return "Nothing to copy "+new Date();
    return txt;
  } };


CopyToClipboard.propTypes = {
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  label: React.PropTypes.string,
  text: React.PropTypes.string,
  onCopy: React.PropTypes.func,
  silent: React.PropTypes.oneOfType([
  React.PropTypes.string,
  React.PropTypes.boolean]) };



class MySVG extends React.Component {
  toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  inverse() {
    document.body.classList.toggle("inverse");
  }

  getSvg(text) {
    return this.refs.svg.innerHTML;
  }
  render() {
    var canvas = {
      width: document.body.clientWidth * 1.2,
      height: document.body.clientHeight * 1.2 - 50 };

    if (canvas.width < canvas.height) {
      canvas.height = canvas.width;
    } else {
      canvas.width = canvas.height;
    }
    var rx = canvas.width / 2,
    ry = canvas.height / 2,
    sub = 1,
    angle = 0,
    subtract = parseFloat(this.props.subtract),
    accelerate = parseFloat(this.props.accelerate),
    maxrun = 20160,
    timeout = false,
    count = 0,
    d = "";

    var graphData = [],
    startTime = new Date();
    var controlledTimeout = setTimeout(function runForMaxTime() {
      timeout = true;
    }, 2000);

    do {
      sub += subtract;
      angle += parseFloat(this.props.step);
      var x = Math.cos(this.toRadians(angle)) * (rx - sub) + rx;
      var y = Math.sin(this.toRadians(angle)) * (ry - sub) + ry;
      d +=
      d == "" ?
      "M " + x + " " + y + " " + this.props.type + " " :
      x + " " + y + " ";
      subtract = subtract + accelerate;
      maxrun--;
      count++;
    } while (!timeout && sub - subtract < rx && maxrun > 0);
    clearTimeout(controlledTimeout);
    var renderTime = new Date() - startTime;
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "info" }, /*#__PURE__*/
      React.createElement("div", null, "Click to change colors"), /*#__PURE__*/
      React.createElement(CopyToClipboard, { label: "Copy SVG", onCopy: this.getSvg.bind(this) }), /*#__PURE__*/
      React.createElement("div", null, "Rendered in ", renderTime, " ms")), /*#__PURE__*/
      

    
      
     
      React.createElement("div", { ref: "svg" }, /*#__PURE__*/
      React.createElement("svg", {
        onTouchstart: this.inverse,
        onClick: this.inverse,
        width: canvas.width,
        height: canvas.height,
        viewBox: `0 0 ${canvas.width} ${canvas.height}`,
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        xmlns_xlink: "http://www.w3.org/1999/xlink" }, /*#__PURE__*/

      React.createElement("path", {
        d: d,
        "stroke-width": ".01px",
        stroke: maxrun > 0 ? "rgba(200,66,0,.4)" : "rgba(255,0,1,.4)",
        fill: "none" })))));





  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type || "L",
      step: parseFloat(this.props.step),
      subtract: parseFloat(this.props.subtract),
      accelerate: parseFloat(this.props.accelerate) };

    this.update.bind(this);
  }
  update(example) {
    let type = this.refs.type.value;
    let step = this.refs.step.value;
    let subtract = this.refs.subtract.value;
    let accelerate = this.refs.accelerate.value;
    var temp = example.target.value.split(",");
    if (temp.length === 4) {
      type = temp[0] || "L";
      step = parseFloat(temp[1]);
      subtract = parseFloat(temp[2]);
      accelerate = parseFloat(temp[3]);
    }
    this.setState({
      type: type,
      step: step,
      subtract: subtract,
      accelerate: accelerate });

  }
  toggle() {
    document.body.classList.toggle("inverse");
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "controls" }, /*#__PURE__*/
      React.createElement("label", { class: "select" }, /*#__PURE__*/
      React.createElement("select", { onChange: this.update.bind(this) }, /*#__PURE__*/
      React.createElement("option", { value: "L,226.75,0.14,0.002" }, "Flower"), /*#__PURE__*/
      React.createElement("option", { value: "C,90,0.362,0" }, "Curve 1"), /*#__PURE__*/
      React.createElement("option", { value: "C,225,-0.011,0.002" }, "Curve 2"), /*#__PURE__*/
      React.createElement("option", { value: "C,120,-0.088,0.067" }, "Curve 3"), /*#__PURE__*/
      React.createElement("option", { value: "Q,252,-4.928,.2" }, "Quadratic 1"), /*#__PURE__*/
      React.createElement("option", { value: "Q,90.75,0.362,0" }, "Quandratic 2"), /*#__PURE__*/
      React.createElement("option", { value: "Q25.75,0.351,0" }, "Quandratic 3"), /*#__PURE__*/
      React.createElement("option", { value: "L,225,-0.011,0.002" }, "Line 1"), /*#__PURE__*/

      React.createElement("option", { value: "L,166.5,0,0.05" }, "Beautiful 1"), /*#__PURE__*/
      React.createElement("option", { value: "L,127,0.193,0" }, "A.S.Hansen"), /*#__PURE__*/
      React.createElement("option", { value: "L,306.75,0.197,0" }, "Beautiful 2"), /*#__PURE__*/
      React.createElement("option", { value: "L,206.75,2.061,0" }, "Beautiful 3"), /*#__PURE__*/
      React.createElement("option", { value: "L,185.75,0.14,0.002" }, "Beautiful 4"), /*#__PURE__*/
      React.createElement("option", { value: "L,130.75,0.247,0" }, "Beautiful 5"), /*#__PURE__*/
      React.createElement("option", { value: "L,288.25,0.14,0.002" }, "Beautiful 6"), /*#__PURE__*/
      React.createElement("option", { value: "L,44.5,0,0.022" }, "Classic 1"), /*#__PURE__*/
      React.createElement("option", { value: "L,157.5,0.237,0" }, "Classic 2"), /*#__PURE__*/
      React.createElement("option", { value: "L,188.5,0.247,0" }, "Intense 1"), /*#__PURE__*/
      React.createElement("option", { value: "L,179.5,0.19,0" }, "Intense 2"), /*#__PURE__*/
      React.createElement("option", { value: "L,215.25,-3.003,0.004" }, "Very intense 1"), /*#__PURE__*/
      React.createElement("option", { value: "L,226.75,-1.308,0.002" }, "Very intense 2"), /*#__PURE__*/
      React.createElement("option", { value: "L,188.5,-5,0" }, "Very intense 3"), /*#__PURE__*/
      React.createElement("option", { value: "L,190,0.085,0" }, "Awesomeeeee"), /*#__PURE__*/
      React.createElement("option", { value: "L,225,-0.011,0.002" }, "Optical Illusion"))), /*#__PURE__*/


      React.createElement("label", { class: "select" }, /*#__PURE__*/
      React.createElement("select", {
        ref: "type",
        onChange: this.update.bind(this),
        value: this.state.type }, /*#__PURE__*/

      React.createElement("option", { value: "L" }, "Line"), /*#__PURE__*/
      React.createElement("option", { value: "Q" }, "Quadratic"), /*#__PURE__*/
      React.createElement("option", { value: "C" }, "Curveto"))), /*#__PURE__*/



      React.createElement("label", null, "step (",
      this.state.step, ")", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("input", {
        ref: "step",
        onChange: this.update.bind(this),
        type: "range",
        min: "1",
        max: "355",
        step: ".025",
        value: this.state.step })), /*#__PURE__*/


      React.createElement("label", null, "Subtract (",
      this.state.subtract, ")", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("input", {
        ref: "subtract",
        onChange: this.update.bind(this),
        type: "range",
        min: "-5",
        max: "5",
        step: ".001",
        value: this.state.subtract })), /*#__PURE__*/


      React.createElement("label", null, "Accelerate (",
      this.state.accelerate, ")", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("input", {
        ref: "accelerate",
        onChange: this.update.bind(this),
        type: "range",
        min: "0",
        max: ".9",
        step: ".001",
        value: this.state.accelerate }))), /*#__PURE__*/



      React.createElement(MySVG, {
        type: this.state.type,
        step: this.state.step,
        subtract: this.state.subtract,
        accelerate: this.state.accelerate })));



  }}


const draw = () => {
  ReactDOM.render( /*#__PURE__*/
  React.createElement(App, { step: "426.75", subtract: ".004", accelerate: ".002" }),
  document.querySelector(".app"));

};

window.onresize = draw;
document.onresize = draw;

draw();