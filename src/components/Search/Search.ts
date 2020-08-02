import Fuse from 'fuse.js';
import { List } from '../../list';

const options: Fuse.IFuseOptions<unknown> = {
  includeScore: true,
  threshold: 0.1,
  includeMatches: true,
};

type Props = {
  list: List,
  value: string,
};

const Search = ({ list, value }: Props): Fuse.FuseResult<string>[] => {
  const fuse = new Fuse(list, options);

  return fuse.search(value);
};

export default Search;
