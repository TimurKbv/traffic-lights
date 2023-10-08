

export interface yellowState {
    MAIN: {
      status: boolean;
    };
    SIDE: {
      status: boolean;
    };
  }

export const defaultYellowState:  yellowState = {
    MAIN: {
        status: false
      },
      SIDE: {
        status: false
      }
}