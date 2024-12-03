let parse = await import('@wordpress/scripts/config/webpack.config.js'), defaultConfig = parse.default;
import path from 'path';
import { fileURLToPath } from 'url';

const filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filePath);

// Save each index file in the dist folder starting from block.index
defaultConfig.output.filename = 'block.build.js'; // Use a placeholder for dynamic naming
defaultConfig.output.path = path.resolve(__dirname, 'dist');

export default defaultConfig;