const express = require('express');
const router = express.Router();
const apiDocs = require('../config/api-doc');
const ResponseHelper = require('../utils/response');
const logger = require('../utils/logger');

class ApiDocController {
  static startTime = Date.now();

  static getUptime() {
    const uptime = Date.now() - ApiDocController.startTime;
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours} hours, ${minutes} minutes`;
    } else if (minutes > 0) {
      return `${minutes} minutes, ${seconds} seconds`;
    } else {
      return `${seconds} seconds`;
    }
  }

  static getHealth(req, res) {
    const healthData = {
      name: apiDocs.name,
      version: apiDocs.version,
      description: apiDocs.description,
      status: 'running',
      uptime: ApiDocController.getUptime(),
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/api/health',
        docs: '/api/docs',
        music: '/api/music',
        sheet: '/api/sheet'
      },
      documentation: {
        full: '/api/docs/full',
        markdown: '/api/docs/markdown',
        postman: '/api/docs/postman'
      }
    };

    res.json(ResponseHelper.success(healthData, '服务运行正常'));
  }

  static getFullDocs(req, res) {
    const docsWithUptime = {
      ...apiDocs,
      server: {
        ...apiDocs.server,
        uptime: ApiDocController.getUptime(),
        currentTime: new Date().toISOString()
      }
    };

    res.json(ResponseHelper.success(docsWithUptime, '完整API文档'));
  }

  static getMarkdownDocs(req, res) {
    res.type('text/markdown');

    const markdown = `# ${apiDocs.name}

> Version: ${apiDocs.version}
> Description: ${apiDocs.description}

## 基础信息

- **Base URL**: ${apiDocs.baseUrl}
- **环境**: ${apiDocs.server.environment}
- **状态**: ${apiDocs.server.status}
- **运行时长**: ${ApiDocController.getUptime()}

## 通用响应格式

### 成功响应
\`\`\`json
${JSON.stringify(apiDocs.responseFormats.success, null, 2)}
\`\`\`

### 错误响应
\`\`\`json
${JSON.stringify(apiDocs.responseFormats.error, null, 2)}
\`\`\`

## 错误码说明

| Code | 说明 |
|------|------|
${Object.entries(apiDocs.errorCodes).map(([code, desc]) => `| ${code} | ${desc} |`).join('\n')}

## 接口列表

${Object.entries(apiDocs.endpoints).map(([key, endpoint]) => {
      if (key === 'health') {
        return `### ${endpoint.method} ${endpoint.path}

${endpoint.description}

**参数**: 无

**示例请求**:
\`\`\`
${endpoint.example.request}
\`\`\`

**示例响应**:
\`\`\`json
${JSON.stringify(endpoint.example.response, null, 2)}
\`\`\`
`;
      }

      return `## ${endpoint.name}

${endpoint.description}

${endpoint.endpoints.map(ep => {
        let epDoc = `### ${ep.method} ${ep.path}

${ep.description}

`;

        if (ep.parameters && ep.parameters.length > 0) {
          epDoc += `**参数**:
| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
${ep.parameters.map(p => `| ${p.name} | ${p.type} | ${p.required ? '是' : '否'} | ${p.default || '-'} | ${p.description} |`).join('\n')}

`;
        }

        if (ep.requestBody) {
          epDoc += `**请求体** (${ep.requestBody.required ? '必填' : '可选'}):
\`\`\`json
${JSON.stringify(ep.requestBody.example || ep.requestBody.schema, null, 2)}
\`\`\`

`;
        }

        if (ep.example) {
          epDoc += `**示例请求**:
\`\`\`
${ep.example.request}
\`\`\`

**示例响应**:
\`\`\`json
${JSON.stringify(ep.example.response, null, 2)}
\`\`\`
`;
        }

        return epDoc;
      }).join('\n---\n')}`;
    }).join('\n\n---\n\n')}

## 注意事项

${Object.entries(apiDocs.notes).map(([key, note]) => `- **${key}**: ${note}`).join('\n')}

---

*文档生成时间: ${new Date().toISOString()}*
`;

    res.send(markdown);
  }

  static getPostmanCollection(req, res) {
    const collection = {
      info: {
        name: apiDocs.name,
        description: apiDocs.description,
        schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
      },
      variable: [
        {
          key: 'baseUrl',
          value: apiDocs.baseUrl
        }
      ],
      item: Object.entries(apiDocs.endpoints)
        .filter(([key]) => key !== 'health')
        .map(([key, endpoint]) => ({
          name: endpoint.name,
          description: endpoint.description,
          item: endpoint.endpoints.map(ep => ({
            name: `${ep.method} ${ep.path}`,
            request: {
              method: ep.method,
              header: [
                {
                  key: 'Content-Type',
                  value: 'application/json'
                }
              ],
              url: {
                raw: `{{baseUrl}}${ep.path}`,
                host: ['{{baseUrl}}'],
                path: ep.path.split('/').filter(Boolean)
              },
              description: ep.description
            },
            response: []
          }))
        }))
    };

    res.json(ResponseHelper.success(collection, 'Postman Collection'));
  }
}

router.get('/', ApiDocController.getHealth.bind(ApiDocController));
router.get('/full', ApiDocController.getFullDocs.bind(ApiDocController));
router.get('/markdown', ApiDocController.getMarkdownDocs.bind(ApiDocController));
router.get('/postman', ApiDocController.getPostmanCollection.bind(ApiDocController));

module.exports = router;
