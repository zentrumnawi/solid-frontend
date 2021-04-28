import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

const packageJson = require('../package.json');

export enum LIBRARIES {
  STORE = '@ngxs/store',
  DEVTOOLS = '@ngxs/devtools-plugin',
  ROUTERPLUGIN = '@ngxs/router-plugin',
  DISPATCH_DECORATOR = '@ngxs-labs/dispatch-decorator',
}

export const DEPENDENCIES: NodeDependency[] = [
  {
    type: NodeDependencyType.Default,
    name: LIBRARIES.DEVTOOLS,
    version: packageJson.peerDependencies[LIBRARIES.DEVTOOLS],
  },
  {
    type: NodeDependencyType.Default,
    name: LIBRARIES.STORE,
    version: packageJson.peerDependencies[LIBRARIES.STORE],
  },
  {
    type: NodeDependencyType.Default,
    name: LIBRARIES.ROUTERPLUGIN,
    version: packageJson.peerDependencies[LIBRARIES.ROUTERPLUGIN],
  },
  {
    type: NodeDependencyType.Default,
    name: LIBRARIES.DISPATCH_DECORATOR,
    version: packageJson.peerDependencies[LIBRARIES.DISPATCH_DECORATOR],
  },
];
