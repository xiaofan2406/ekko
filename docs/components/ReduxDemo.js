/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { actions, selectors } from 'store/champions';
import ChampionGrid from './ChampionGrid';

type ReduxExampleProps = {
  champions: { [string]: {} },
  updateChampion: (id: string, champion: {}) => mixed,
};

const ReduxExample = ({ champions, updateChampion }: ReduxExampleProps) => (
  <ChampionGrid champions={champions} updateChampion={updateChampion} />
);

const mapState = state => ({
  champions: selectors.getChampions(state),
});

export default connect(mapState, {
  updateChampion: actions.updateChampion,
})(ReduxExample);
