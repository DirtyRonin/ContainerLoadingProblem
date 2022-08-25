import { ImmerReducer } from 'immer-reducer';
import { ITruck } from '../../../interfaces';
import { AsyncStatus } from '../../../models';

export type stateProps = {
  readonly selectedTruckIds: number[];
  readonly trucks: ITruck[];
  readonly loading: AsyncStatus;
}

export const INITIAL_STATE: stateProps = {
  selectedTruckIds: [],
  trucks: [],
  loading: 'idle',
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

  fetchAllTrucks_Pending(){
    console.log(`Set fetch all trucks loading to pending`);
    this.draftState.loading = 'pending'
  }
  fetchAllTrucks_Failed(){
    console.log(`Set fetch all trucks loading to rejected`);
    this.draftState.loading = 'failed'
  }
  fetchAllTrucks_Success(trucks:ITruck[]){
    console.log(`Set fetch all trucks loading to succeeded`);
    this.draftState.trucks= trucks
    this.draftState.loading = 'succeeded'
  }



}

export default TruckReducer