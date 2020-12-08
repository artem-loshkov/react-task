import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Home from "./Home";
import CharacterDetails from "./CharacterDetails";
import SpaceshipDetails from "./SpaceshipDetails";
import Header from "./Header";
import './index.scss';

function App() {
  return (
    <Router>
      <Container>
        <Row>
          <Col md={12}>
            <Header />
            <Switch>
              <Route path="/character/:id">
                <CharacterDetails />
              </Route>
              <Route path="/starship/:id">
                <SpaceshipDetails />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
