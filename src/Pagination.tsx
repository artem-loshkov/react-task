import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { setCurrentPage } from "./actions/Actions";

const mapStateToProps = (state: { currentPage: number, totalPages: number }) => {
  return { currentPage: state.currentPage, totalPages: state.totalPages };
};

//@ts-ignore
function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: (currentPage: number) => dispatch(setCurrentPage(currentPage))
  };
}

type Props = {
  currentPage: number,
  totalPages: number,
  setCurrentPage: (page: number) => void,
}

const Pagination = ({ currentPage, totalPages, setCurrentPage }: Props) =>
  <div className="pagination-wrapper">
    <Button onClick={ () => setCurrentPage(currentPage - 1) } disabled={ currentPage < 2 } className="button">Prev</Button>
    <span>Page { currentPage } out of { totalPages }</span>
    <Button onClick={ () => setCurrentPage(currentPage + 1) } disabled={ currentPage >= totalPages } className="button">Next</Button>
  </div>
;

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
