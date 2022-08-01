import { Cargo } from '../../../models/index';
import { CalculateLoadingMeter } from '../CalculateLoadingMeter';
import { ICalculateLoadingMeter, ICargo, IContainer, IMathHelper } from '../../../interfaces';
import { testHelper } from '../../../utils/index';
import { MathHelper } from '../../../utils/mathHelper/MathHelper';

describe('Testing Loading Meter Functions', () => {
  const _mathHelper: IMathHelper = new MathHelper();
  const _loadingMeter: ICalculateLoadingMeter = new CalculateLoadingMeter(_mathHelper);

  const _testContainers = testHelper.testContainers;
  const _testCargos = testHelper.testCargos;

  let _container: IContainer;
  let _cargo: ICargo;

  beforeEach(() => {
    _container = _testContainers.Truck_l1360w240h270;
  });

  afterEach(() => {
    _container = _testContainers.AsInitializeDefault;
    _cargo = _testCargos.AsInitializeDefault;
  });

  describe('calculating the loading meter for a signle cargo', () => {
    // TODO: Ladungen nach der Größe des Volumens Sortieren
    // TODO: Ladung darf nicht auf dem Container herausragen wenn schon eine andere Ladung enthalten ist
    // TODO: Möglich Rotation von Länge und Breite, um die Containerbreite optimal auszunutzen

    it("should be 0.5 loading meter for the quantity of one piece of 'box_l100w120h80'", async () => {
      _cargo = new Cargo(_testContainers.box_l100w120h80, 1, false);

      const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
      await expect(result).resolves.toBe(50);
    });

    it("should be 1.0 loading meter for the quantity of two pieces of 'box_l100w120h80' next to each other in the same row", async () => {
      _cargo = new Cargo(_testContainers.box_l100w120h80, 2, false);

      const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
      await expect(result).resolves.toBe(100);
    });

    it("should be 1.0 loading meter for the quantity of two pieces of 'box_l100w120h80' next to each other in the same row even isStackable is true", async () => {
      _cargo = new Cargo(_testContainers.box_l100w120h80, 2, true);

      const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
      await expect(result).resolves.toBe(100);
    });

    it("should be 0.5 loading meter for three pieces of 'box_l100w120h80' stacked on each other", async () => {
      _cargo = new Cargo(_testContainers.box_l100w120h80, 3, true);

      const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
      await expect(result).resolves.toBe(100);
    });

    it("should be 1 loading meter for four pieces of 'box_l100w120h80' stacked on and next to each other", async () => {
      _cargo = new Cargo(_testContainers.box_l100w120h80, 4, true);

      const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
      await expect(result).resolves.toBe(100);
    });

    describe('calculating examples', () => {
      it('should be 320 with 16 pieces', async () => {
        _cargo = new Cargo(_testContainers.box_l80w120h120, 16, true);

        const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
        await expect(result).resolves.toBe(320);
      });
      it('should be 320 with 14 pieces', async () => {
        _cargo = new Cargo(_testContainers.box_l80w120h120, 14, true);

        const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
        await expect(result).resolves.toBe(320);
      });

      it('should be 160', async () => {
        _cargo = new Cargo(_testContainers.box_l160w120h80, 6, true);

        const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
        await expect(result).resolves.toBe(160);
      });
    });
  });

  // describe('validating if a cargo fits into a container', () => {
  //   it("one piece of 'oversized_box_l1500w120h80' should be -1 for a container of type 'Truck_l1360w240h270' .", async () => {
  //     _cargo = new Cargo(_testContainers.oversized_box_l1500w120h80, 1, false);

  //     const result = _loadingMeter.CalculateMinimumLoadingMeter(_cargo, _container);
  //     await expect(result).resolves.toBe(-1);
  //   });
  // });
});
