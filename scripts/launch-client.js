// Launch scripts for starting both vite dev server
const yargs = require('yargs');
const process = require('process');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});

function getYarnCmd() {
  if (process.platform === 'win32') {
    return 'yarn.cmd';
  }

  return 'yarn';
}

// Cannot use https since the Fathom5 backend only uses http currently
const options = {
  ColorPalette: 'color-palette',
  DeploymentConfig: 'deployment-config',
  ClientPort: 'client-port',
  ServerPort: 'server-port',
  ClientOnly: 'client-only',
  ProxyPort: 'proxy-port',
  GraphQLServer: 'graphql-server',
};

const flags = yargs(process.argv.slice(2))
  .usage('Usage: $0 [opts] -- [pack arguments]')
  .version('1.1.0')
  .alias('h', 'help')
  .option(options.ClientOnly, {
    describe: 'Only build and launch the client front-end.',
    nargs: 0,
    default: false,
    boolean: true,
    group: 'Client',
  })
  .option(options.ClientPort, {
    describe: 'Specify the port of the client to run on.',
    nargs: 1,
    number: true,
    group: 'Client',
  })
  .option(options.ColorPalette, {
    describe: 'Pick the initial color palette for the app.',
    nargs: 1,
    string: true,
    group: 'Client',
  })
  .option(options.ServerPort, {
    describe: 'Specify the port of the server to run on.',
    nargs: 1,
    number: true,
    group: 'Server',
  })
  .option(options.DeploymentConfig, {
    describe: 'The path to a deployment config.',
    nargs: 1,
    normalize: true,
    group: 'Server',
  })
  .option(options.ProxyPort, {
    describe: 'Specify the port for the server to proxy to.',
    nargs: 1,
    number: true,
    group: 'Server',
  })
  .option(options.GraphQLServer, {
    describe: 'Specify the GraphQL server',
    nargs: 1,
    number: true,
    group: 'Server',
  }).argv;

const serveArgs = ['vite', 'serve'];

if (flags[options.ServerPort]) {
  process.env.serverPort = flags[options.ServerPort];
}

if (flags[options.ClientPort]) {
  process.env.clientPort = flags[options.ClientPort];
}

if (flags[options.ClientPort]) {
  process.env.clientPort = flags[options.ClientPort];
}

process.env.GraphQLServer = flags[options.GraphQLServer] ?? process.env.GRAPHQL_SERVER_CLI;

spawn(getYarnCmd(), serveArgs, { cwd: process.cwd(), stdio: 'inherit' });
