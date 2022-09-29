import '@abraham/reflection';
import { nameof } from 'ts-simple-nameof';

import { Cargo } from '../../../models/index';
import { ILoadAnalyzer, ICargo, ILoadSummary, ITruck, initializeTruck, initializeCargo } from '../../../interfaces';
import { testCase1, testHelper } from '../../../utils/index';
import { myContainer } from '../../../inversify.config';
import { TYPES } from '../../../utils/shared/registerSymbols';
import { ILoadSummaryIds } from '../../../interfaces/ILoadSummaryIds';

describe('Testing Loading Meter Functions', () => {
  // TODO: Ladungen nach der Größe des Volumens Sortieren
  // TODO: Ladung darf nicht auf dem Container herausragen wenn schon eine andere Ladung enthalten ist
  // TODO: Möglich Rotation von Länge und Breite, um die Containerbreite optimal auszunutzen

  const propName_loadingMeter = nameof<ILoadSummary>((x) => x.loadingMeter);

  let _loadingMeter: ILoadAnalyzer;

  const { testTrucks, testCargos, testContainers, testAreas } = testHelper;

  let _truck: ITruck;
  let _cargo: ICargo;
  let _trucks: ITruck[];
  let _cargos: ICargo[];
  let _selectedLoadSummaryIds: ILoadSummaryIds[];

  beforeAll(() => {
    _loadingMeter = myContainer.get<ILoadAnalyzer>(TYPES.LoadAnalyzer);
  });

  afterAll(() => {
    _truck = initializeTruck();
    _cargo = initializeCargo({ });
    _loadingMeter = {} as ILoadAnalyzer;
    _trucks: [];
    _selectedLoadSummaryIds: [];
  });

  describe('Test AnalyzeLoadOfCargosInContainers', () => {
    describe('calculating the loading meter for a single cargo', () => {
      afterEach(() => {
        _trucks = [];
        _cargos = [];
      });

      it("should be 50 loading meter for the quantity of one piece of 'box_l100w120h80'", async () => {
        _trucks = [testTrucks.greatTruck_L1360xW240xH270()];
        _cargos = [testCargos.indu({ quantity: 1, isStackable: false, height: 80, id: '1' })];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _trucks);
        expect(result).toEqual(50);
      });
      it("should be 100 loading meter for the quantity of two pieces of 'box_l100w120h80'", async () => {
        _trucks = [testTrucks.greatTruck_L1360xW240xH270()];
        _cargos = [
          testCargos.indu({ quantity: 1, isStackable: false, height: 80, id: '1' }),
          testCargos.indu({ quantity: 1, isStackable: false, height: 80, id: '1' }),
        ];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _trucks);
        expect(result).toEqual(100);
      });
      it('should be 120', async () => {
        _trucks = [testTrucks.greatTruck_L1360xW240xH270()];
        _cargos = [Cargo.WithGoods('', '', testAreas.area_l80w120, 1, false, 120), Cargo.WithGoods('', '', testAreas.area_l80w120, 3, true, 120)];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _trucks);
        expect(result).toEqual(120);
      });
      it('should be 160', async () => {
        _trucks = [testTrucks.greatTruck_L1360xW240xH270()];
        _cargos = [Cargo.WithGoods('', '', testAreas.area_l80w120, 17, false, 120), Cargo.WithGoods('', '', testAreas.area_l80w120, 17, false, 120)];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _trucks);
        expect(result).toEqual(1360);
      });
    });
  });

  describe('Test AnalyzeLoadingForSummaries', () => {
    describe('calculating for each truck the loading meters for each cargo. Trucks are sorted by volume', () => {
      afterEach(() => {
        _trucks = [];
        _cargos = [];
      });

      it(' should', async () => {
        const { trucks, cargos, expected } = testCase1;

        _trucks = trucks;
        _cargos = cargos;

        const results = await _loadingMeter.AnalyzeLoadingForSummaries(_cargos, _trucks, []);
        expect(results).toEqual(expected);
      });
    });

    describe('calculating for each truck the loading meters for each cargo. Trucks are sorted by volume', () => {
      afterEach(() => {
        _trucks = [];
        _cargos = [];
        _selectedLoadSummaryIds = [];
      });

      it('cargo should only occure once in a specific, if it matches with selected load summary ids', async () => {
        _trucks = [{ ...testTrucks.smallTruck_L420xW180xH170('1') }, { ...testTrucks.middleTruck_L620xW245xH240('2') }];
        _cargos = [testCargos.indu({ quantity: 10, isStackable: false, height: 10, id: '1' })];
        _selectedLoadSummaryIds = [{ orderId: '2', cargoId: '1', truckId: '1' ,_id:''}];

        const results = await _loadingMeter.AnalyzeLoadingForSummaries(_cargos, _trucks, _selectedLoadSummaryIds);

        expect(results.find((x) => x.key === _selectedLoadSummaryIds[0].truckId)?.values.length).toEqual(1);
        expect(results.find((x) => x.key !== _selectedLoadSummaryIds[0].truckId)?.values.length).toEqual(0);
      });
    });
  });

  describe('Test AnalyseSingleLoad', () => {
    describe('calculating the loading meter for a signle cargo', () => {
      beforeEach(() => {
        _truck = testTrucks.greatTruck_L1360xW240xH270();
      });
      afterEach(() => {
        _truck = initializeTruck();
        _cargo = initializeCargo({ });
      });

      it("should be 0.5 loading meter for the quantity of one piece of 'box_l100w120h80'", async () => {
        _cargo = Cargo.WithGoods('', '', testAreas.area_l100w120, 1, false, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 50);
      });

      it("should be 1.0 loading meter for the quantity of two pieces of 'box_l100w120h80' next to each other in the same row", async () => {
        _cargo = Cargo.WithGoods('', '', testAreas.area_l100w120, 2, false, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      it("should be 1.0 loading meter for the quantity of two pieces of 'box_l100w120h80' next to each other in the same row even isStackable is true", async () => {
        _cargo = Cargo.WithGoods('', '', testAreas.area_l100w120, 2, true, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      it("should be 0.5 loading meter for three pieces of 'box_l100w120h80' stacked on each other", async () => {
        _cargo = Cargo.WithGoods('', '', testAreas.area_l100w120, 3, true, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      it("should be 1 loading meter for four pieces of 'box_l100w120h80' stacked on and next to each other", async () => {
        _cargo = Cargo.WithGoods('', '', testAreas.area_l100w120, 4, true, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      describe('calculating examples', () => {
        beforeEach(() => {
          _truck = testTrucks.greatTruck_L1360xW240xH270();
        });
        afterEach(() => {
          _truck = initializeTruck();
          _cargo = initializeCargo({ });
        });

        it('should be 320 with 16 pieces', async () => {
          _cargo = Cargo.WithGoods('', '', testAreas.area_l80w120, 16, true, 120);

          const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
          await expect(result).resolves.toHaveProperty(propName_loadingMeter, 320);
        });
        it('should be 320 with 14 pieces', async () => {
          _cargo = Cargo.WithGoods('', '', testAreas.area_l80w120, 14, true, 120);

          const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
          await expect(result).resolves.toHaveProperty(propName_loadingMeter, 320);
        });

        it('should be 160', async () => {
          _cargo = Cargo.WithGoods('', '', testAreas.area_l160w120, 6, true, 80);

          const result = _loadingMeter.AnalyseSingleLoad(_cargo, _truck);
          await expect(result).resolves.toHaveProperty(propName_loadingMeter, 160);
        });
      });
    });
  });
});
