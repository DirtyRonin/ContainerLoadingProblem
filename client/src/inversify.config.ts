// file inversify.config.ts

import '@abraham/reflection'
import { Container } from "inversify";
import { TYPES } from "./utils/shared/registerSymbols";
import { IContainerHelper, ILoadAnalyzer } from "./interfaces";
import { ContainerHelper } from "./utils/mathHelper";
import { LoadAnalyzer } from "./pages/loadFactor/LoadAnalyzer";
import { IContainerLoading } from './interfaces/IContainerLoading';
import ContainerLoading from './pages/loadFactor/ContainerLoading';

const myContainer = new Container();
myContainer.bind<IContainerHelper>(TYPES.ContainerHelper).to(ContainerHelper);
myContainer.bind<IContainerLoading>(TYPES.ContainerLoading).to(ContainerLoading);
myContainer.bind<ILoadAnalyzer>(TYPES.LoadAnalyzer).to(LoadAnalyzer);

export { myContainer };