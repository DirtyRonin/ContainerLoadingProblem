import { ICargo, IPopulatedCargo } from './ICargo';
import { IEntity } from './IEntity';
import { ILoadSummaryIds } from './ILoadSummaryIds';
import { ITruck } from './ITruck';

export interface ITruckLoading extends IEntity {
  cargoId: string;
  truckId: string;
  routeId: string;
  orderId: string;
}

export const initialTruckLoading = (): ITruckLoading => ({
  _id: '',
  cargoId: '',
  truckId: '',
  routeId: '',
  orderId: '',
});

export interface IPopulatedTruckLoading extends ITruckLoading {
  /** every cargos should only have one entry */
  cargos: ICargo[];
  /** every trucks should only have one entry */
  trucks: ITruck[];
}

export const initialPopulatedTruckLoading = (): IPopulatedTruckLoading => ({
  ...initialTruckLoading(),
  cargos: [],
  trucks: [],
});

/** Immutable Convert object of type IPopulatedTruckLoading to IPopulatedCargo
 * @results If Cargos Length is not 1 => return false;
 */
export const ToPopulatedCargo = (populatedTruckLoading: IPopulatedTruckLoading): IPopulatedCargo | false => {
  if (populatedTruckLoading.cargos.length !== 1) return false;

  /** destructing object into three different objects
   * const rest should be of type ITruckLoading
   */
  const { cargos, trucks, ...rest } = populatedTruckLoading;

  /** using spread to recombine */
  const populatedCargo: IPopulatedCargo = { ...cargos[0], truckLoadings: [rest] };

  return populatedCargo;
};

/** IPopulatedTruckLoading and ILoadSummaryIds are both used in the same way but are not eqaul
 * so converting is still used
 */
export const ToLoadSummaryIds = ({ orderId, _id, truckId, cargoId }: ITruckLoading): ILoadSummaryIds => ({
  _id,
  cargoId,
  orderId,
  truckId,
});
