// file inversify.config.ts

import '@abraham/reflection'
import { Container } from "inversify";
import { TYPES } from "./utils/shared/registerSymbols";
import { IContainerHelper, ILoadAnalyzer } from "./interfaces";
import { ContainerHelper } from "./utils/mathHelper";
import { LoadAnalyzer } from "./pages/loadFactor/LoadAnalyzer";

const myContainer = new Container();
myContainer.bind<IContainerHelper>(TYPES.ContainerHelper).to(ContainerHelper);
myContainer.bind<ILoadAnalyzer>(TYPES.LoadAnalyzer).to(LoadAnalyzer);

export { myContainer };