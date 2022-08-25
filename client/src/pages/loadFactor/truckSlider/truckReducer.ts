import { ImmerReducer } from 'immer-reducer';
import { ITruck } from '../../../interfaces';
import { AsyncStatus } from '../../../models';

export type stateProps = {
    readonly trucks: ITruck[];
    readonly loading: AsyncStatus;
  }

  export const INITIAL_STATE: stateProps = {
    trucks: [],
    loading: 'idle',
  };


  class TruckReducer extends ImmerReducer<stateProps> {
    fetchAllTrucks_Pending(){
      console.log(`Fetch all trucks for truckSlider in analyzer started`);
      this.draftState.loading = 'pending'
    }
    fetchAllTrucks_Failed(){
      console.log(`Fetch all trucks for truckSlider in analyzer failed`);
      this.draftState.loading = 'failed'
    }
    fetchAllTrucks_Success(trucks:ITruck[]){
      console.log(`Fetch all trucks for truckSlider in analyzer succeeded`);
      this.draftState.trucks= trucks
      this.draftState.loading = 'succeeded'
    }
  }
  
  export default TruckReducer