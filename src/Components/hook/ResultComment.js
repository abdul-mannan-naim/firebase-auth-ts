import React, { Component } from 'react';

class ResultComponent extends Component {
  render() {
    let { result } = this.props;

    return (
      <div className="result">
        {/* <p>{ result }</p> */}
        <input type="text" value={result} className="py-5 w-full border-none bg-white rounded-xl px-5 text-3xl text-end shadow-xl " />
      </div>
    )
  }
}

export default ResultComponent;