export const getIds = state => state.champions.ids;

export const getChampionById = (state, { id }) => state.champions.byId[id];

export const getChampions = state => state.champions.byId;
