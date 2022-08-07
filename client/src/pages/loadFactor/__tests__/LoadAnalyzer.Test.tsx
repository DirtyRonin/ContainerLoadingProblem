import { nameof } from 'ts-simple-nameof';

import { Cargo } from '../../../models/index';
import { LoadAnalyzer } from '../LoadAnalyzer';
import { ILoadAnalyzer, ICargo, IContainer, IContainerHelper, ILoadSummary } from '../../../interfaces';
import { testHelper } from '../../../utils/index';
import { ContainerHelper } from '../../../utils/mathHelper/ContainerHelper';

describe('Testing Loading Meter Functions', () => {
  // TODO: Ladungen nach der Größe des Volumens Sortieren
  // TODO: Ladung darf nicht auf dem Container herausragen wenn schon eine andere Ladung enthalten ist
  // TODO: Möglich Rotation von Länge und Breite, um die Containerbreite optimal auszunutzen

  const propName_loadingMeter = nameof<ILoadSummary>((x) => x.loadingMeter);

  let _mathHelper: IContainerHelper;
  let _loadingMeter: ILoadAnalyzer;

  const _testContainers = testHelper.testContainers;
  const _testCargos = testHelper.testCargos;
  const _testAreas = testHelper.testAreas;

  let _container: IContainer;
  let _cargo: ICargo;
  let _containers: IContainer[];
  let _cargos: ICargo[];

  beforeAll(() => {
    _mathHelper = new ContainerHelper();
    _loadingMeter = new LoadAnalyzer(_mathHelper);
  });

  afterAll(() => {
    _container = {} as IContainer;
    _cargo = {} as ICargo;
    _containers = [];
    _cargos = [];
    _mathHelper = {} as IContainerHelper;
    _loadingMeter = {} as ILoadAnalyzer;
  });

  describe('Test AnalyzeLoadOfCargosInContainers', () => {
    describe('calculating the loading meter for a signle cargo', () => {
      afterEach(() => {
        _containers = [];
        _cargos = [];
      });

      it("should be 50 loading meter for the quantity of one piece of 'box_l100w120h80'", async () => {
        _containers = [_testContainers.Truck_l1360w240h270];
        _cargos = [_testCargos.area_l100w120];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _containers);
        expect(result).toEqual(50);
      });
      it("should be 100 loading meter for the quantity of two pieces of 'box_l100w120h80'", async () => {
        _containers = [_testContainers.Truck_l1360w240h270];
        _cargos = [_testCargos.area_l100w120, _testCargos.area_l100w120];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _containers);
        expect(result).toEqual(100);
      });
      it('should be 120', async () => {
        _containers = [_testContainers.Truck_l1360w240h270];
        _cargos = [new Cargo(0, 0, 0, _testAreas.area_l80w120, 1, false, 120), new Cargo(0, 0, 0, _testAreas.area_l80w120, 3, true, 120)];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _containers);
        expect(result).toEqual(120);
      });
      it('should be 160', async () => {
        _containers = [_testContainers.Truck_l1360w240h270];
        _cargos = [
          new Cargo(0, 0, 0, _testAreas.area_l80w120, 17, false, 120),
          new Cargo(0, 0, 0, _testAreas.area_l80w120, 17, false, 120),
        ];

        const result = await _loadingMeter.AnalyzeLoading(_cargos, _containers);
        expect(result).toEqual(1360);
      });
    });
  });

  describe('Test AnalyseSingleLoad', () => {
    describe('calculating the loading meter for a signle cargo', () => {
      beforeEach(() => {
        _container = _testContainers.Truck_l1360w240h270;
      });
      afterEach(() => {
        _container = {} as IContainer;
        _cargo = {} as ICargo;
      });

      it("should be 0.5 loading meter for the quantity of one piece of 'box_l100w120h80'", async () => {
        _cargo = new Cargo(0, 0, 0, _testAreas.area_l100w120, 1, false, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 50);
      });

      it("should be 1.0 loading meter for the quantity of two pieces of 'box_l100w120h80' next to each other in the same row", async () => {
        _cargo = new Cargo(0, 0, 0, _testAreas.area_l100w120, 2, false, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      it("should be 1.0 loading meter for the quantity of two pieces of 'box_l100w120h80' next to each other in the same row even isStackable is true", async () => {
        _cargo = new Cargo(0, 0, 0, _testAreas.area_l100w120, 2, true, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      it("should be 0.5 loading meter for three pieces of 'box_l100w120h80' stacked on each other", async () => {
        _cargo = new Cargo(0, 0, 0, _testAreas.area_l100w120, 3, true, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      it("should be 1 loading meter for four pieces of 'box_l100w120h80' stacked on and next to each other", async () => {
        _cargo = new Cargo(0, 0, 0, _testAreas.area_l100w120, 4, true, 80);

        const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
        await expect(result).resolves.toHaveProperty(propName_loadingMeter, 100);
      });

      describe('calculating examples', () => {
        beforeEach(() => {
          _container = _testContainers.Truck_l1360w240h270;
        });
        afterEach(() => {
          _container = {} as IContainer;
          _cargo = {} as ICargo;
        });

        it('should be 320 with 16 pieces', async () => {
          _cargo = new Cargo(0, 0, 0, _testAreas.area_l80w120, 16, true, 120);

          const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
          await expect(result).resolves.toHaveProperty(propName_loadingMeter, 320);
        });
        it('should be 320 with 14 pieces', async () => {
          _cargo = new Cargo(0, 0, 0, _testAreas.area_l80w120, 14, true, 120);

          const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
          await expect(result).resolves.toHaveProperty(propName_loadingMeter, 320);
        });

        it('should be 160', async () => {
          _cargo = new Cargo(0, 0, 0, _testAreas.area_l160w120, 6, true, 80);

          const result = _loadingMeter.AnalyseSingleLoad(_cargo, _container);
          await expect(result).resolves.toHaveProperty(propName_loadingMeter, 160);
        });
      });
    });
  });
});
