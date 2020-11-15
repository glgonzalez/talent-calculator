import { Talents } from './images';
export interface Path {
  items: TalentItem[];
  name: string;
}

export interface TalentItem {
  id: string,
  name: Talents;
  value: number;
  path: string;
}

function uuidv4() {
  /* @ts-ignore:disable-next-line */
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export const path1: Path = {
  items: [
    {
      id: uuidv4(),
      name: 'chevrons',
      value: 1,
      path: 'Talent Path 1'
    },
    {
      id: uuidv4(),
      name: 'silverware',
      value: 1,
      path: 'Talent Path 1'
    },
    {
      id: uuidv4(),
      name: 'cake',
      value: 1,
      path: 'Talent Path 1'
    },
    {
      id: uuidv4(),
      name: 'crown',
      value: 1,
      path: 'Talent Path 1'
    }
  ],
  name: 'Talent Path 1'
};

export const path2: Path = {
  items: [
    {
      id: uuidv4(),
      name: 'boat',
      value: 1,
      path: 'Talent Path 1'
    },
    {
      id: uuidv4(),
      name: 'snorkle',
      value: 1,
      path: 'Talent Path 1'
    },
    {
      id: uuidv4(),
      name: 'lightning',
      value: 1,
      path: 'Talent Path 1'
    },
    {
      id: uuidv4(),
      name: 'skull',
      value: 1,
      path: 'Talent Path 1'
    }
  ],
  name: 'Talent Path 2'
}

export const pathData: Path[] = [path1, path2];