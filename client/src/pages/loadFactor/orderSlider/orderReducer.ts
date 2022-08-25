import { ImmerReducer } from 'immer-reducer';
import { IOrder } from '../../../interfaces';
import { AsyncStatus } from '../../../models';

export type stateProps = {
    readonly orders: IOrder[];
    readonly loading: AsyncStatus;
  }

  export const INITIAL_STATE: stateProps = {
    orders: [],
    loading: 'idle',
  };


  class OrderReducer extends ImmerReducer<stateProps> {
    fetchAllOrders_Pending(){
      console.log(`Fetch all orders for orderSlider in analyzer started`);
      this.draftState.loading = 'pending'
    }
    fetchAllOrders_Failed(){
      console.log(`Fetch all orders for orderSlider in analyzer failed`);
      this.draftState.loading = 'failed'
    }
    fetchAllOrders_Success(orders:IOrder[]){
      console.log(`Fetch all orders for orderSlider in analyzer succeeded`);
      this.draftState.orders= orders
      this.draftState.loading = 'succeeded'
    }
  }
  
  export default OrderReducer