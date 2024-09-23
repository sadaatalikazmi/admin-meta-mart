import { connect } from 'react-redux';
import React, { Component } from 'react';

import './index.css';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AppLoader extends Component {

  render() {
    let { message } = this.props;
    return (
      <div className='app-loader'>
        <div className="loader-container">
          <BounceLoader
            css={override}
            size={50}
            color={'#5bf8fd'}
            loading={true}
          />
        </div>
        {message && <div className="loader-container"> <span className="loading-text">{message}</span></div>}
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = ({ }) => {
  // let {  } = Auth;
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLoader);
