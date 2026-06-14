const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envFile = path.join(__dirname, '.env');

  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf-8');
    const envLines = envContent.split('\n');

    envLines.forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...valueParts] = line.split('=');
        const value = valueParts.join('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

module.exports = loadEnv;
