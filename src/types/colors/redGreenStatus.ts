export enum Color {
  RED = "RED",
  GREEN = "GREEN",
}

export interface colorsState {
  MAIN: {
    status: Color | null;
  };
  SIDE: {
    status: Color | null;
  };
  CROSSWALK: {
    status: Color | null;
  };
}

export const defaultState: colorsState = {
  MAIN: {
    status: Color.GREEN,
  },
  SIDE: {
    status: Color.RED,
  },
  CROSSWALK: {
    status: Color.RED,
  },
};