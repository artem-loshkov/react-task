import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

interface Props {
  text?: string,
}

const Loader = ({ text }: Props) =>
  <div className="loader-wrapper">
    <h3>Loading { text }...</h3>
    <CircularProgress size={ 80 } thickness={ 5 } />
  </div>
;

export default connect()(Loader);
