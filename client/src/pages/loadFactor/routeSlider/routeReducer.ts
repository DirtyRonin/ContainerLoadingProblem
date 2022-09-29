import { ImmerReducer } from 'immer-reducer';
import { IRoute } from '../../../interfaces';
import { AsyncStatus } from '../../../models';

export type stateProps = {
    readonly routes: IRoute[];
    readonly loading: AsyncStatus;
  }

  export const INITIAL_STATE: stateProps = {
    routes: [],
    loading: 'idle',
  };


  class RouteReducer extends ImmerReducer<stateProps> {
    fetchAllRoutes_Pending(){
      console.log(`Fetch all routes for routeSlider in analyzer started`);
      this.draftState.loading = 'pending'
    }
    fetchAllRoutes_Failed(){
      console.log(`Fetch all routes for routeSlider in analyzer failed`);
      this.draftState.loading = 'failed'
    }
    fetchAllRoutes_Success(routes:IRoute[]){
      console.log(`Fetch all routes for routeSlider in analyzer succeeded`);
      this.draftState.routes= routes
      this.draftState.loading = 'succeeded'
    }
  }
  
  export default RouteReducer