/* -- set app title --*/
const AppTitle = 'ADMIN META MART';

/* -- set app mode -- */
const AppMode = ['development'];
// const AppMode = [''];

/* -- set API URLs --*/
const testing = 'https://dserver.metamart.world';
const production = 'https://dserver.metamart.world';
// let development = 'http://localhost:4006';
let development = production;

if (process.env.REACT_APP_LOCAL_URL) development = 'http://localhost:4006';

let SocketUrl;
let env = AppMode[0] || 'development', networkId = '', message = '', explorer = '';
// let env = 'production', networkId = '', message = '', explorer = '';
switch (AppMode[0]) {
  case 'development':
    networkId = 4;
    message = 'Please switch your network to Rinkeby testnet';
    SocketUrl = development;
    explorer = 'https://metamart.metawarriors.world'
    break;
  case 'production':
    networkId = 1;
    SocketUrl = production;
    message = 'Please switch your network to Ethereum Mainnet';
    explorer = 'https://metamart.metawarriors.world'
    break;
  case 'testing':
    networkId = 4;
    SocketUrl = testing;
    message = 'Please switch your network to Rinkeby testnet';
    explorer = 'https://rinkeby.etherscan.io'
    break;
  default:
    networkId = 4;
    SocketUrl = 'http://localhost:4006';
    message = 'Please switch your network to Rinkeby testnet';
    explorer = 'https://rinkeby.etherscan.io'
}

let ApiUrl = `${SocketUrl}/api`;

export { AppTitle, ApiUrl, SocketUrl, networkId, message, explorer, env };