/* @flow */
import * as React from 'react';
import { connect } from 'react-redux';
import { css } from 'react-emotion';
import allChampions from 'utils/allChampions';
import { actions, selectors } from 'store/champions';

const cssPool = css`
  position: fixed;
  bottom: 0;
  right: 0;
`;

type PoolProps = {
  ids: string[],
  addChampion: (id: string, champion: {}) => mixed,
};

const allChampionsById = allChampions.reduce((byId, next) => {
  byId[next.id] = next;
  return byId;
}, {});

class Pool extends React.Component<PoolProps, {}> {
  componentDidMount() {
    const { addChampion } = this.props;
    addChampion('ekko', allChampionsById.ekko);
    addChampion('annie', allChampionsById.annie);
    addChampion('nidalee', allChampionsById.nidalee);
  }

  handleAdd = (event: SyntheticEvent<HTMLSelectElement>) => {
    const { addChampion } = this.props;
    const id = event.currentTarget.value;
    addChampion(id, allChampionsById[id]);
  };

  render() {
    const { ids } = this.props;
    return (
      <div className={cssPool}>
        <select onChange={this.handleAdd}>
          {allChampions
            .filter(champion => !ids.includes(champion.id))
            .map(champion => (
              <option id={champion.id} value={champion.id} key={champion.id}>
                {champion.name}
              </option>
            ))}
        </select>
      </div>
    );
  }
}

const mapState = state => ({
  ids: selectors.getIds(state),
});

export default connect(mapState, {
  addChampion: actions.addChampion,
})(Pool);
