let parse = await import('@wordpress/scripts/config/webpack.config.js'), defaultConfig = parse.default;

if (process.env.TARGET == 'node') {
  defaultConfig.output.globalObject = 'global';
  defaultConfig.output.publicPath = '';
}

export default defaultConfig;
