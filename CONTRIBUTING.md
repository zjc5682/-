# 贡献指南

感谢你对本项目的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告 Bug

1. 确保 Bug 尚未在 [Issues](https://github.com/zjc5682/-/issues) 中报告
2. 创建一个新的 Issue，包含以下信息：
   - 清晰的标题和描述
   - 重现步骤
   - 预期行为 vs 实际行为
   - 环境信息（操作系统、Node.js 版本等）
   - 截图或错误日志（如果适用）

### 建议新功能

1. 在 [Issues](https://github.com/zjc5682/-/issues) 中创建一个 Feature Request
2. 描述你想要的功能
3. 解释为什么这个功能对项目有价值
4. 如果可能，提供设计草图或示例代码

### 提交代码

#### 1. Fork 项目

```bash
# 在 GitHub 上 Fork 项目
git clone https://github.com/your-username/-.git
cd cheng
```

#### 2. 创建功能分支

```bash
git checkout -b feature/AmazingFeature
```

#### 3. 提交更改

```bash
git add .
git commit -m 'feat: Add some AmazingFeature'
```

#### 4. 推送到分支

```bash
git push origin feature/AmazingFeature
```

#### 5. 创建 Pull Request

在 GitHub 上创建一个 Pull Request，包含：
- 清晰的标题和描述
- 关联的 Issue（如果有）
- 更改的详细说明
- 测试结果（如果适用）

## 开发规范

### 代码风格

#### 前端 (Vue.js)
- 使用 ESLint + Prettier 进行代码格式化
- 遵循 Vue 3 组合式 API 风格
- 使用 TypeScript（如果项目支持）
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case

#### 后端 (Node.js)
- 使用 ESLint 进行代码检查
- 遵循 MVC 架构模式
- 使用 async/await 处理异步操作
- 错误处理要完善
- 日志记录要详细

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**类型**:
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `build`: 构建系统或外部依赖
- `ci`: CI 配置
- `chore`: 其他更改

**示例**:
```
feat(music): add lyrics display feature

- Add lyrics component
- Integrate with lyrics API
- Support synchronized lyrics

Closes #123
```

### 分支管理

- `master`: 主分支，保持稳定
- `develop`: 开发分支，用于集成新功能
- `feature/*`: 功能分支，用于开发新功能
- `fix/*`: 修复分支，用于修复 Bug
- `release/*`: 发布分支，用于准备新版本

### 测试

#### 前端测试
```bash
cd electron-app
npm run test
```

#### 后端测试
```bash
cd music_api
npm test
```

#### 代码检查
```bash
# 前端
cd electron-app
npm run lint

# 后端
cd music_api
npm run lint
```

## 文档

### 更新文档

如果更改影响了用户界面或 API，请更新相应的文档：
- `README.md`: 项目概述和使用说明
- `CHANGELOG.md`: 版本更新日志
- `docs/`: 详细文档

### 代码注释

- 复杂的逻辑需要添加注释
- 公共 API 需要 JSDoc 注释
- 避免无意义的注释

## 行为准则

### 我们的承诺

为了营造一个开放和友好的环境，我们作为贡献者和维护者承诺：
- 接受任何人对项目的贡献
- 不歧视任何人
- 专注于对社区最有利的事情
- 对其他社区成员表示同理心

### 我们的标准

积极的行为包括：
- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

不可接受的行为包括：
- 使用性暗示的语言或图像
- 恶意评论或人身攻击
- 公开或私下骚扰
- 未经许可发布他人的私人信息
- 其他不道德或不专业的行为

## 许可证

通过贡献代码，你同意你的贡献将在 [ISC 许可证](LICENSE) 下发布。

## 联系方式

如果你有任何问题，可以通过以下方式联系我们：
- [GitHub Issues](https://github.com/zjc5682/-/issues)
- 邮件：[待添加]

## 致谢

感谢所有为这个项目做出贡献的人！

---

**再次感谢你的贡献！** 🎵
