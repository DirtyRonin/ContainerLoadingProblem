export interface ILoadingMeterSummary {}

export class LoadingMeterSummary implements ILoadingMeterSummary {
  constructor(public miniumArea: number, public actualUsedArea: number) {}
}
