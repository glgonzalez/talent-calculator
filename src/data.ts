import { Talents } from './images';
export interface Path {
  items: TalentItem[];
  name: string;
}

export interface TalentItem {
  name: Talents;
  value: number;
}

export const path1: Path = {
  items: [
    {
      name: 'chevrons',
      value: 1
    },
    {
      name: 'silverware',
      value: 1
    },
    {
      name: 'cake',
      value: 1
    },
    {
      name: 'crown',
      value: 1
    }
  ],
  name: 'Talent Path 1'
};

export const path2: Path = {
  items: [
    {
      name: 'boat',
      value: 1
    },
    {
      name: 'snorkle',
      value: 1
    },
    {
      name: 'lightning',
      value: 1
    },
    {
      name: 'skull',
      value: 1
    }
  ],
  name: 'Talent Path 2'
}

export const pathData: Path[] = [path1, path2];