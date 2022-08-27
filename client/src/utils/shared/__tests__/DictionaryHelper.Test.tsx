import '@abraham/reflection'
import { IStacking, ICargo, IContainer, IContainerHelper, ITruck, ILoadAnalyzer } from '../../../interfaces';
import { testHelper } from '../../';
import { ContainerHelper } from '../../mathHelper';
import { RemoveLoadSummariesByCargoId } from '../DictionaryHelper';
import { myContainer } from '../../../inversify.config';
import { TYPES } from '../registerSymbols';


describe('calculating stacking factor', () => {
  let _mathHelper: IContainerHelper;
  let _loadingMeter: ILoadAnalyzer;
  let _trucks: ITruck[];
  let _cargos: ICargo[];

  const { testTrucks, testCargos } = testHelper;

  beforeAll(() => {
    _mathHelper = new ContainerHelper();
    _loadingMeter =  myContainer.get<ILoadAnalyzer>(TYPES.LoadAnalyzer)
  });

  afterAll(() => {
    _mathHelper = {} as IContainerHelper;
    _loadingMeter = {} as ILoadAnalyzer;
    _trucks = [];
    _cargos = [];
  });

  describe('Test RemoveLoadSummariesByCargoId', () => {
    let _cargoIds: number[];

    afterEach(() => {
      _trucks = [];
      _cargos = [];
      _cargoIds = [];
    });

    it('every load summary with the cargo id 1 and 3 should be removed the results', async () => {
      _trucks = [{ ...testTrucks.smallTruck_L420xW180xH170(1) }, { ...testTrucks.middleTruck_L620xW245xH240(2) }];
      _cargos = [
        testCargos.euro({ quantity: 10, isStackable: true, height: 60, id: 1 }),
        testCargos.indu({ quantity: 10, isStackable: true, height: 60, id: 2 }),
        testCargos.euro({ quantity: 20, isStackable: true, height: 30, id: 3 }),
      ];

      _cargoIds=[1,3]

      const dic = await _loadingMeter.AnalyzeLoadingForSummaries(_cargos, _trucks);
      const result = RemoveLoadSummariesByCargoId(_cargoIds,dic);
      
      expect(result[0].values.length).toEqual(1)
      expect(result[0].values[0].cargo.id).toEqual(2)
      
      expect(result[1].values.length).toEqual(1)
      expect(result[1].values[0].cargo.id).toEqual(2)
    });
  });
});
