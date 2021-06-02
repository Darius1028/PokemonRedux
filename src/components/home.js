import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { ListGroup, Row, Col } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { getPokemonsAction } from "../redux/pokesDucks";
import Page from "./page";

const mapStateToProps = (state) => ({
  pokemons: state.pokemons.results,
  offset: state.pokemons.offset,
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loadings: false };
  }

  componentDidMount() {
    this.setState({ loading: true }, async() => {
      this.props.getPokemonsAction();
      this.setState({ loading: false });
    });
  }


  renderPokemons() {
    const { pokemons } = this.props;
    
    return pokemons.map((pokemon) => (
      <ListGroup.Item className=" d-flex justify-content-between align-items-center" key={pokemon.name} onClick={ () => {  this.props.history.push( "/pokemon", { url: pokemon.url }  ) }} >
        {pokemon.name}
        <span className="badge bg-primary rounded-pill text-white">INFO</span>
      </ListGroup.Item>
    ));
  }
  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <Row>
          <Col className="col-3"></Col>
          <Col className="col-6">
            <Loader
              className="justify-content-md-center"
              type="ThreeDots"
              color="#00BFFF"
              height={80}
              width={80}
            />
          </Col>
          <Col className="col-3"></Col>
        </Row>
      );
    }
    return (
      <>
        <Row>
          <Col className="col-3"></Col>
          <Col className="col-6">
            <h1 className="text-center">Pokemons</h1>
            <ListGroup as="ul">{this.renderPokemons()}</ListGroup>
          </Col>
          <Col className="col-3"></Col>
        </Row>
        <Page></Page>
      </>
    );
  }
}

export default connect( mapStateToProps, { getPokemonsAction }, null)(withRouter(Home));