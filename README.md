# Container Loading Problem
## Summary
The container loading problem deals with the question of how many smaller cubes are going to fit in a larger rectangle. This app deals with the simpler question of how many pallet will fit into a truck by using the loading meter approach

## Current Version
still under construction

## Supported Actions

### trucks
 * List of all available trucks
 * All ***Crud actions***

 | Field             | Type   | 
|:------------------|:-------|
| vehicleIdentifier | string |
| height | number |
| width | number |
| length | number |

### orders
 * List of all available orders
 * Groups a set of cargos 
 * All ***Crud actions***

 | Field             | Type   | 
|:------------------|:-------|
| name | string |

### cargos
 * List of all assigned cargos for an given order
 * Can be assigned to a truck as a loading
 * All ***Crud actions***

 | Field             | Type   | 
|:------------------|:-------|
| name | string |
| height | number |
| width | number |
| length | number |
| quantity | number |
| isStackable | boolean |

### Used Stack
- React
- node.js
- express
- MariaDB

### Used 3rd Party Libs
- client
    + typescript
    + react
    + react-redux
    + reduxjs/toolkit
    + axios
    + webpack
    + mui
    + jest
- server
    + express
    + mariadb
    + sequelize
    + sequelize-typescript
    + node
    + ts-node
    + nodemon
    + typescript

***
