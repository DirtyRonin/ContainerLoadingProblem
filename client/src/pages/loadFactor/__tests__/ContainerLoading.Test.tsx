import '@abraham/reflection';
import { ICargo, ILoadAnalyzer, ITruck } from '../../../interfaces';
import { IContainerLoading } from '../../../interfaces/IContainerLoading';
import { myContainer } from '../../../inversify.config';
import { testHelper } from '../../../utils';
import { GetValueById } from '../../../utils/shared/DictionaryHelper';
import { TYPES } from '../../../utils/shared/registerSymbols';

describe('Testing Loading Container Functions', () => {
  let _containerLoading: IContainerLoading;
  let _loadingMeter: ILoadAnalyzer;
  let _trucks: ITruck[];
  let _cargos: ICargo[];

  const { testTrucks, testCargos } = testHelper;

  beforeAll(() => {
    _containerLoading = myContainer.get<IContainerLoading>(TYPES.ContainerLoading);
    _loadingMeter = myContainer.get<ILoadAnalyzer>(TYPES.LoadAnalyzer);
  });

  afterAll(() => {
    _containerLoading = {} as IContainerLoading;
    _loadingMeter = {} as ILoadAnalyzer;
    _trucks = [];
    _cargos = [];
  });

  describe('Test SplitCargosOnTruck', () => {
    describe('split the cargos on a single truck, starting with the biggest cargo that fits.', () => {
      afterEach(() => {
        _trucks = [];
        _cargos = [];
      });

      it("the truck with the id 1 should 'load' cargo with id 2 and 86,6 length should remain", async () => {
        const _truck: ITruck = { ...testTrucks.smallTruck_L420xW180xH170() };
        _cargos = [
          testCargos.euro({ quantity: 10, isStackable: true, height: 60, id: '1' }),
          testCargos.indu({ quantity: 10, isStackable: true, height: 60, id: '2' }),
          testCargos.euro({ quantity: 20, isStackable: true, height: 30, id: '3' }),
        ];

        const dic = await _loadingMeter.AnalyzeLoadingForSummaries(_cargos, [_truck],[]);
        const loadSummary = GetValueById(_truck._id, dic);
        if (loadSummary === undefined) throw new Error('should not be null');

        const result = _containerLoading.SplitCargosOnTruck(_truck, loadSummary.values);

        expect(result.truck._id).toEqual('1');
        expect(result.summaries[0].cargoId).toEqual('2');
        expect(result.remainingLoadingMeterOfTruck).toEqual(86.66666666666663);
      });
    });
  });

  describe('Test SplitCargosOnTrucks', () => {
    describe('splitting the cargos on all trucks, starting with the biggest truck by volume', () => {
      afterEach(() => {
        _trucks = [];
        _cargos = [];
      });

      it('the first entry of the result array should be about the greater trucks with the id 2', async () => {
        _trucks = [{ ...testTrucks.smallTruck_L420xW180xH170('1') }, { ...testTrucks.middleTruck_L620xW245xH240('2') }];
        _cargos = [
          testCargos.euro({ quantity: 10, isStackable: true, height: 60, id: '1' }),
          testCargos.indu({ quantity: 10, isStackable: true, height: 60, id: '2' }),
          testCargos.euro({ quantity: 20, isStackable: true, height: 30, id: '3' }),
        ];

        const dic = await _loadingMeter.AnalyzeLoadingForSummaries(_cargos, _trucks,[]);
        const result = _containerLoading.SplitCargosOnTrucks(_trucks, dic);

        expect(result[0].truck._id).toEqual('2');
      });

      it('each cargo can only be loaded once, so each load summary is allowd to occure only once or never ', async () => {
        _trucks = [{ ...testTrucks.smallTruck_L420xW180xH170('1') }, { ...testTrucks.middleTruck_L620xW245xH240('2') }];
        _cargos = [
          testCargos.euro({ quantity: 10, isStackable: true, height: 60, id: '1' }),
          testCargos.indu({ quantity: 10, isStackable: true, height: 60, id: '2' }),
          testCargos.euro({ quantity: 20, isStackable: true, height: 30, id: '3' }),
        ];

        const dic = await _loadingMeter.AnalyzeLoadingForSummaries(_cargos, _trucks,[]);
        const result = _containerLoading.SplitCargosOnTrucks(_trucks, dic);

        expect(result[0].summaries.length).toEqual(3);
        expect(result[1].summaries.length).toEqual(0);
      });

      it('if cargo does not fit in first truck, load it to the next and so on', async () => {
        _trucks = [testTrucks.smallTruck_L420xW180xH170('1'), testTrucks.middleTruck_L620xW245xH240('2') ];
        _cargos = [
          testCargos.euro({ quantity: 10, isStackable: true, height: 60, id: '1' }),
          testCargos.indu({ quantity: 10, isStackable: true, height: 60, id: '2' }),
          testCargos.euro({ quantity: 25, isStackable: true, height: 30, id: '3' }),
          testCargos.euro({ quantity: 10, isStackable: true, height: 60, id: '4' }),
        ];

        const dic = await _loadingMeter.AnalyzeLoadingForSummaries(_cargos, _trucks,[]);
        const result = _containerLoading.SplitCargosOnTrucks(_trucks, dic);

// console.log(dic[0])
// console.log(dic[1])
// console.log(result)
        expect(result[0].summaries.length).toEqual(3);
        expect(result[1].summaries.length).toEqual(1);
      });
    });
  });
});
