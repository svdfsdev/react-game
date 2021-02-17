const initialState = {
  sounds: {
    music: {
      on: true,
      volume: 5,
    },

    effects: {
      on: true,
      volume: 5,
    },
  },

  game: {
    border: false,
    board: ['Lawn', 'Sand', 'Water'],
    prey: ['Apple', 'Carrot', 'Coffee', 'Beer', 'Ice cream'],
    difficulty: [{ easy: 300 }, { medium: 200 }, { hard: 100 }],
  },
};

export function settingsReduer(state = initialState) {
  return state;
}
