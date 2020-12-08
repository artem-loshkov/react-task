import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { connect } from "react-redux";
import { addCharacter, addSpaceship, clearCharacters, clearSpaceships, setIsLoading, setTotalPages } from "./actions/Actions";
import { Character, Spaceship, CharactersDecoder, SpaceshipsDecoder } from "./decoders/Api";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { isRight } from "fp-ts/lib/Either";
import { getIdFromUrl } from "./utils";

const mapStateToProps = (state: { characters: Character[], spaceships: Spaceship[], isLoading: boolean, currentPage: number }) => {
  return { characters: state.characters, spaceships: state.spaceships, isLoading: state.isLoading, currentPage: state.currentPage };
};

//@ts-ignore
function mapDispatchToProps(dispatch) {
  return {
    addCharacter: (character: Character) => dispatch(addCharacter(character)),
    clearCharacters: () => dispatch(clearCharacters()),
    addSpaceship: (spaceship: Spaceship) => dispatch(addSpaceship(spaceship)),
    clearSpaceships: () => dispatch(clearSpaceships()),
    setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading)),
    setTotalPages: (totalPages: number) => dispatch(setTotalPages(totalPages))
  };
}

type Props = {
  characters: Character[],
  spaceships: Spaceship[],
  isLoading: boolean,
  currentPage: number,
  addCharacter: (character: Character) => void,
  clearCharacters: () => void,
  addSpaceship: (spaceship: Spaceship) => void,
  clearSpaceships: () => void,
  setIsLoading: (isLoading: boolean) => void,
  setTotalPages: (totalPages: number) => void,
}

const Home = ({ characters, spaceships, isLoading, currentPage, addCharacter, clearCharacters, addSpaceship, clearSpaceships, setIsLoading, setTotalPages }: Props) =>
{
  const _loadCharacters = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/people/?page=' + currentPage)
      .then(response => response.json())
      .then(data => {
        const decoded = CharactersDecoder.decode(data);

        if (isRight(decoded))
        {
          clearCharacters();
          decoded.right.results.map((characher: Character) => addCharacter(characher));
          setTotalPages(Math.ceil(data.count / 10));

        }
        else
        {
          throw new Error(decoded.left.toString());
        }

      })
      .finally(() => {
        setIsLoading(false);
        _loadSpaceships();
      });
  }

  const _loadSpaceships = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/starships/')
      .then(response => response.json())
      .then(data => {
        const decoded = SpaceshipsDecoder.decode(data);

        if (isRight(decoded))
        {
          clearSpaceships();
          data.results.map((spaceship: Spaceship) => addSpaceship(spaceship));
        }
        else
        {
          throw new Error(decoded.left.toString());
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    _loadCharacters();
  }, [ currentPage ]);

  return (
    <Fragment>
      { characters.length > 0 &&
        <Fragment>
          <Table bordered hover className="characters-table">
            <thead>
            <tr>
              <th>Name</th>
              <th>Birth Year</th>
              <th>Height</th>
              <th>Mass</th>
              <th>View Details</th>
            </tr>
            </thead>
            <tbody>
            {
              characters.map((character: Character, index) =>
                <Fragment key={ character.name }>
                  { index === 8 && spaceships[currentPage] &&
                    <tr>
                      <td colSpan={4}>{ spaceships[currentPage].name }</td>
                      <td>
                        <Link to={ '/starship/' + getIdFromUrl(spaceships[currentPage].url) } className="btn button">
                          <FontAwesomeIcon icon={ faEye } />
                        </Link>
                      </td>
                    </tr>
                  }
                  <tr>
                    <td>{ character.name }</td>
                    <td>{ character.birth_year }</td>
                    <td>{ character.height }</td>
                    <td>{ character.mass }</td>
                    <td>
                      <Link to={ '/character/' + getIdFromUrl(character.url)} className="btn button">
                        <FontAwesomeIcon icon={ faEye } />
                      </Link>
                    </td>
                  </tr>
                </Fragment>
            )}
            </tbody>
          </Table>
          <Pagination />
        </Fragment>
      }

      { isLoading &&
        <Loader text="Characters" />
      }
    </Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
