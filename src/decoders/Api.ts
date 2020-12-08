import * as t from 'io-ts';

export const ListResultDecoder = t.type({
  count: t.number,
});

export const CharacterDecoder = t.type({
  name: t.string,
  height: t.string,
  mass: t.string,
  hair_color: t.string,
  skin_color: t.string,
  eye_color: t.string,
  birth_year: t.string,
  gender: t.string,
  url: t.string,
});

export const CharactersDecoder = t.intersection([
  ListResultDecoder,
  t.type({
    results: t.array(CharacterDecoder),
  })
]);

export const SpaceshipDecoder = t.type({
  name: t.string,
  model: t.string,
  manufacturer: t.string,
  cost_in_credits: t.string,
  length: t.string,
  max_atmosphering_speed: t.string,
  crew: t.string,
  passengers: t.string,
  cargo_capacity: t.string,
  consumables: t.string,
  hyperdrive_rating: t.string,
  MGLT: t.string,
  starship_class: t.string,
  url: t.string,
});

export const SpaceshipsDecoder = t.intersection([
  ListResultDecoder,
  t.type({
    results: t.array(SpaceshipDecoder),
  })
]);

export type Character = t.TypeOf<typeof CharacterDecoder>;
export type Spaceship = t.TypeOf<typeof SpaceshipDecoder>;
