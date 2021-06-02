import React, { Component } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getPokemonsAction, nextPokemonsAction, previousPokemonsAction } from "../redux/pokesDucks";

const mapStateToProps = (state) => ({
  offset: state.pokemons.offset,
});


class Page extends Component {

  getPage(num) {
      this.props.getPokemonsAction(num);
  }

  nextPage() {
      this.props.nextPokemonsAction();
  }

  previousPage() {
      this.props.previousPokemonsAction();
  }

  render() {
    const { offset } = this.props;
    return (
      <>
          <Row>
            <Col>
              <Pagination className="justify-content-center m-4">
                <Pagination.Prev
                  onClick={() => this.previousPage()}
                  disabled={offset === 0 ? true : false}
                />
                {offset !== 0 ? (
                  <Pagination.Item onClick={() => this.getPage(offset - 1)}>
                    {offset}
                  </Pagination.Item>
                ) : (
                  ""
                )}
                <Pagination.Item onClick={() => this.getPage(offset)}>
                  {offset + 1}
                </Pagination.Item>
                <Pagination.Item onClick={() => this.getPage(offset + 1)}>
                  {offset + 2}
                </Pagination.Item>
                <Pagination.Next onClick={() => this.nextPage()} />
              </Pagination>
            </Col>
          </Row>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  { getPokemonsAction, nextPokemonsAction, previousPokemonsAction },
  null
)(Page);
