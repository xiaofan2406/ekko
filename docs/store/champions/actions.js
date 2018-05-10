const actionTypes = {
  ADD: 'champions/ADD',
  UPDATE: 'champions/UPDATE',
};

export default actionTypes;

export const addChampion = (id, champion) => ({
  type: actionTypes.ADD,
  id,
  champion,
});

export const updateChampion = (id, champion) => ({
  type: actionTypes.UPDATE,
  id,
  champion,
});
