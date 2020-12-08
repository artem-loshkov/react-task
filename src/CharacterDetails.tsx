import { isRight } from "fp-ts/Either";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { setCurrentCharacter, setIsLoading } from "./actions/Actions";
import { Character, CharacterDecoder } from "./decoders/Api";
import { getIdFromUrl } from "./utils";

const mapStateToProps = (state: { characters: Character[], currentCharacter: Character, isLoading: boolean }) => {
  return { characters: state.characters, currentCharacter: state.currentCharacter, isLoading: state.isLoading };
};

//@ts-ignore
function mapDispatchToProps(dispatch) {
  return {
    setCurrentCharacter: (character: Character) => dispatch(setCurrentCharacter(character)),
    setIsLoading: (isLoading: boolean) => dispatch(setIsLoading(isLoading))
  };
}

interface RouteParams {
  id?: string,
}

type Props = {
  characters: Character[],
  currentCharacter: Character | null,
  isLoading: boolean,
  setCurrentCharacter: (currentCharacter: Character) => void,
  setIsLoading: (isLoading: boolean) => void,
}

const CharacterDetails = ({ characters, currentCharacter, setCurrentCharacter }: Props) =>
{
  const params = useParams<RouteParams>();
  const { id } = params;

  const _loadCurrentCharacter = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/people/' + id + "/")
      .then(response => response.json())
      .then(data => {
        const decoded = CharacterDecoder.decode(data);

        if (isRight(decoded))
        {
          setCurrentCharacter(decoded.right);
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
    if (characters.length > 0) {
      characters.map(character => {
        if (getIdFromUrl(character.url) === (id ?? "-1"))
        {
          setCurrentCharacter(character);
        }
      });
    } else {
      _loadCurrentCharacter();
    }
  }, []);

  return <Fragment>
    { currentCharacter &&
      <div className="details-wrapper">
        <p><strong>Name: </strong> { currentCharacter.name }</p>
        <p><strong>Height: </strong> { currentCharacter.height }</p>
        <p><strong>Mass: </strong> { currentCharacter.mass }</p>
        <p><strong>Hair Color: </strong> { currentCharacter.hair_color }</p>
        <p><strong>Skin Color: </strong> { currentCharacter.skin_color }</p>
        <p><strong>Eye Color: </strong> { currentCharacter.eye_color }</p>
        <p><strong>Birth Year: </strong> { currentCharacter.birth_year }</p>
        <p><strong>Gender: </strong> { currentCharacter.gender }</p>
      </div>
    }
    <Link to="/" className="btn button">Back</Link>
  </Fragment>;
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetails);
