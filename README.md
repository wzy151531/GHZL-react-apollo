This project was bootstrapped with Create React App.

## GHZL-react-apollo-antd

### `quick start`

Use 'yarn' to install the dependencies,then use 'yarn start' to start the project.<br/>
Use two accounts with different authority to login:<br/>
1. username: GHZL, password: admin, authority: admin.
2. username: GHZL, password: subadmin, authority: sub-admin.

### `features`

This project is designed to be a management system,it has several features:
1. authorization in menu and pages.
2. config the routerData in certain file.
3. local login function.

### `UI framework`

Use ant-design as UI framework.<br/>

### `state`

Cause the graphql doesn't need a lot of rendering data states to manage,
it's not necessary to use umi-dva to manage complicated states.<br/>
To fix the problem that active menu item can show correctly in basicLayout,this project use redux
 to manage the global state: 'activeMenu'.

### `graphql/apollo`

Cause the demand of data rendering may be changed in the future,to minimize
the time costs in editing the api,it's more elegant to use graphql.</br>

This project use apollo with react.</br>