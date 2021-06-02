import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { infoPokemonAction, clearInfoPokemonAction } from "../redux/pokesDucks";

const mapStateToProps = (state) => ({
  pokemon: state.pokemons.pokemon,
  offset: state.pokemons.offset,
});

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = { loadings: false };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { url } = (this.props.location && this.props.location.state) || {};
      this.props.infoPokemonAction(url);
      this.setState({ loading: false });
    });
  }

  componentWillUnmount() {
    this.props.clearInfoPokemonAction();
  }

  renderPokemon() {

    const { pokemon } = this.props;

    if (Object.keys(pokemon).length !== 0) {
      return (
        <Card className=" d-flex justify-content-between align-items-center">
          <Card.Img variant="top" src={pokemon.sprites.front_default} />
          <Card.Body className="text-center">
            <Card.Title>{pokemon.name}</Card.Title>
            <Card.Text>
              <div>Weight: {pokemon.weight}</div>
              <div>Height: {pokemon.height}</div>
              <div>
                {pokemon.abilities.map((availity, index) => (
                  <div key={index}>
                    Availity: {availity.ability.name}
                  </div>
                ))}
              </div>
            </Card.Text>
            <Link className="btn btn-primary" to="/">Back</Link>
          </Card.Body>
        </Card>
      );
    } else {
      return null;
    }
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
          <Col className="col-4"></Col>
          <Col className="col-4">{this.renderPokemon()}</Col>
          <Col className="col-4"></Col>
        </Row>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  { infoPokemonAction, clearInfoPokemonAction },
  null
)(withRouter(Pokemon));
