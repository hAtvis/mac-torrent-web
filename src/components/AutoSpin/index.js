import React, { Component } from 'react';
import {Spin } from 'antd'

class AutoSpin extends Component {
  render() {
    const { loading } = this.props
    return (
        loading ? <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div> : this.props.children
    );
  }
}

export default AutoSpin;
