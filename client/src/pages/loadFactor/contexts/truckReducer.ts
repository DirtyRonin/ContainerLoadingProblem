import { ImmerReducer } from 'immer-reducer';

export type stateProps = {
  readonly selectedTruckIds: number[];
}

export const INITIAL_STATE: stateProps = {
  selectedTruckIds: [],
};

class TruckReducer extends ImmerReducer<stateProps> {
  addSelectedTruckId(truckId: number) {
    console.log(`Add selected truck id ${truckId}`);
    this.draftState.selectedTruckIds.push(truckId);
  }

  removeSelectedTruckId(truckId: number) {
    console.log(`Remove selected truck id ${truckId}`);

    const index = this.draftState.selectedTruckIds.findIndex((x) => x === truckId);
    if (index === -1) return;

    this.draftState.selectedTruckIds.splice(index, 1);
  }
}



// const truckReducer = (state: state, action: truckActions) => {
//   produce(state, (draft) => {
//     switch (action.type) {
//       case 'AddTruck_Id':
//         console.log(action);
//         draft.selectedTruckIds.push(action.payload);
//         break;
//       case 'RemoveTruck_Id':
//         console.log(action);
//         const index = draft.selectedTruckIds.findIndex((x) => x === action.payload);
//         if (index !== -1) draft.selectedTruckIds.splice(index, 1);
//         break;
//       default:
//         return state;
//       // throw new Error(`No action for ${(action as truckActions).type}`);
//     }
//   });
// };

export default TruckReducer;
