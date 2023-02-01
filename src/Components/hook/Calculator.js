import React, { Component } from 'react';
 
import ResultComponent from './ResultComment';
import KeyPadComponent from './KeyPadComment';

class Calculator extends Component {
  state = {
    result: ""
  }

  onClick = button => {
    if(button === "=") {
      this.calculate();
    }

    else if(button === "C") {
      this.reset();
    }

    else if(button === "CE") {
      this.backspace();
    }

    else {
      this.setState({
        result: this.state.result + button
      })
    }
  };

  calculate = () => {
    var checkResult = ''
    if(this.state.result.includes('--')) {
      checkResult = this.state.result.replace('--', '+')
    } else {
      checkResult = this.state.result;
    }

    try {
      this.setState({
        result: (eval(checkResult) || "") + ""
      })
    } catch(e) {
      this.setState({
        result: "error"
      })
    }
  };

  reset = () => {
    this.setState({
      result: ""
    })
  };

  backspace = () => {
    this.setState({
        result: this.state.result.slice(0, -1)
    })
  };

  render() {
    return (
      <div className='flex justify-center'>
        <div className="calculator-body  rounded-xl p-5 bg-accent ">
          <h1 className='my-3 text-2xl text-white font-bold ' >Simple Calculator</h1>
          <ResultComponent result={this.state.result} />
          <KeyPadComponent onClick={this.onClick} />
        </div>
      </div>
    )
  }
}

export default Calculator;