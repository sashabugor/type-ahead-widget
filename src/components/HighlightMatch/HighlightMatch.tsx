import React, { PureComponent } from 'react';
import Fuse from 'fuse.js';

interface Props {
  matches?: readonly Fuse.FuseResultMatch[];
  children: string;
}

class HighlightMatch extends PureComponent<Props> {
  render() {
    const { children, matches } = this.props;

    if (matches) {
      const indices = matches.map((match) => match.indices)[0][0];
      const start = indices[0];
      const finish = indices[1];
      const hit = children.slice(start, finish + 1);
      const before = children.slice(0, start);
      const after = children.slice(finish + 1);

      return (
        <>
          {before}
          <strong>{hit}</strong>
          {after}
        </>
      );
    }

    return children;
  }
}

export default HighlightMatch;
