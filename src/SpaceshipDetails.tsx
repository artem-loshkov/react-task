import { isRight } from "fp-ts/Either";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { setCurrentSpaceship, setIsLoading } from "./actions/Actions";
import { Spaceship, SpaceshipDecoder } from "./decoders/Api";
import { getIdFromUrl } from "./utils";

const mapStateToProps = (state: { spaceships: Spaceship[], currentSpaceship: Spaceship, isLoading: boolean }) => {
  return { spaceships: state.spaceships, currentSpaceship: state.currentSpaceship, isLoading: state.isLoading };
};

//@ts-ignore
function mapDispatchToProps(dispatch) {
  return {
    setCurrentSpaceship: (spaceship: Spaceship) => dispatch(setCurrentSpaceship(spaceship)),
    setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading))
  };
}

interface RouteParams {
  id?: string,
}

type Props = {
  spaceships: Spaceship[],
  currentSpaceship: Spaceship | null,
  isLoading: boolean,
  setCurrentSpaceship: (currentSpaceship: Spaceship) => void,
  setIsLoading: (isLoading: boolean) => void,
}

const SpaceshipDetails = ({ spaceships, currentSpaceship, setCurrentSpaceship }: Props) =>
{
  const params = useParams<RouteParams>();
  const { id } = params;

  const _loadCurrentSpaceship = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/starships/' + id + "/")
      .then(response => response.json())
      .then(data => {
        const decoded = SpaceshipDecoder.decode(data);

        if (isRight(decoded))
        {
          setCurrentSpaceship(decoded.right);
        }
        else
        {
          throw new Error(decoded.left.toString());
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (spaceships.length > 0) {
      spaceships.map(spaceship => {
        if (getIdFromUrl(spaceship.url) === (id ?? "-1"))
        {
          setCurrentSpaceship(spaceship);
        }
      });
    } else {
      _loadCurrentSpaceship();
    }
  }, []);

  return <Fragment>
    { currentSpaceship &&
      <div className="details-wrapper">
        <p><strong>Name: </strong> { currentSpaceship.name }</p>
        <p><strong>Model: </strong> { currentSpaceship.model }</p>
        <p><strong>Manufacturer: </strong> { currentSpaceship.manufacturer }</p>
        <p><strong>Cost In Credits: </strong> { currentSpaceship.cost_in_credits }</p>
        <p><strong>Length: </strong> { currentSpaceship.length }</p>
        <p><strong>Max Atmosphering Speed: </strong> { currentSpaceship.max_atmosphering_speed }</p>
        <p><strong>Crew: </strong> { currentSpaceship.crew }</p>
        <p><strong>Passengers: </strong> { currentSpaceship.passengers }</p>
        <p><strong>Cargo Capacity: </strong> { currentSpaceship.cargo_capacity }</p>
        <p><strong>Consumables: </strong> { currentSpaceship.consumables }</p>
        <p><strong>Hyperdrive Rating: </strong> { currentSpaceship.hyperdrive_rating }</p>
        <p><strong>MGLT: </strong> { currentSpaceship.MGLT }</p>
        <p><strong>Starship Class: </strong> { currentSpaceship.starship_class }</p>
      </div>
    }
    <Link to="/" className="btn button">Back</Link>
  </Fragment>;
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaceshipDetails);
