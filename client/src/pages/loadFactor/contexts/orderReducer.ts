import { ImmerReducer } from 'immer-reducer';
import { IOrder } from '../../../interfaces';
import { AsyncStatus } from '../../../models';

export type stateProps={
    readonly selectedOrderIds: number[];
    readonly orders: IOrder[];
    readonly loading: AsyncStatus;
}

export const INITIAL_STATE: stateProps = {
    selectedOrderIds: [],
    orders: [],
    loading: 'idle',
  };

  class OrderReducer extends ImmerReducer<stateProps>{
    addSelectedOrderId(orderId: number) {
        console.log(`Add selected order id ${orderId}`);
        this.draftState.selectedOrderIds.push(orderId);
      }
    
      removeSelectedOrderId(orderId: number) {
        console.log(`Remove selected order id ${orderId}`);
    
        const index = this.draftState.selectedOrderIds.findIndex((x) => x === orderId);
        if (index === -1) return;
    
        this.draftState.selectedOrderIds.splice(index, 1);
      }

      fetchAllOrders_Pending(){
        console.log(`Set fetch all orders loading to pending`);
        this.draftState.loading = 'pending'
      }
      fetchAllOrders_Failed(){
        console.log(`Set fetch all orders loading to rejected`);
        this.draftState.loading = 'failed'
      }
      fetchAllOrders_Success(orders:IOrder[]){
        console.log(`Set fetch all orders loading to succeeded`);
        this.draftState.orders= orders
        this.draftState.loading = 'succeeded'
      }
  }


  export default OrderReducer