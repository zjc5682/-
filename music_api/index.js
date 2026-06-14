const loadEnv = require('./src/config/env');
loadEnv();

const App = require('./src/app');
const logger = require('./src/utils/logger');

async function main() {
  try {
    const app = new App();
    await app.start();
  } catch (error) {
    logger.error('应用程序启动失败', { error: error.message });
    console.error('启动失败:', error.message);
    process.exit(1);
  }
}

main();
