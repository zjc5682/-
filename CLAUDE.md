# Project Documentation

## Overview

This is a music application project with:
- `electron-app/` - Electron desktop application
- `music_api/` - Music API backend
- `start.bat` - Startup script
- `陈.sql` - Database schema

## Git Configuration

- **Remote**: https://github.com/zjc5682/-.git
- **Branch**: main (default)

## Available Skills

### git-smart-commit

Smart git commit with auto-generated messages based on changes.

**Usage:**
```
/git-smart-commit
```

**Features:**
- Analyzes current changes (staged and unstaged)
- Groups related changes logically
- Generates conventional commit messages
- Supports interactive mode for message review
- Can split unrelated changes into separate commits

**Commit Message Format:**
```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore

## Development

### Quick Start
```bash
# Start the application
./start.bat

# Or run components separately
cd electron-app && npm start
cd music_api && npm start
```

### Git Workflow

1. **Check status**: `git status`
2. **Stage changes**: `git add .` or `git add <file>`
3. **Smart commit**: `/git-smart-commit` or `git commit -m "type(scope): message"`
4. **Push to remote**: `git push origin main`

## Notes

- The project uses conventional commits for better changelog generation
- All dependencies should be installed before running
- Check `electron-app/package.json` and `music_api/package.json` for specific dependencies
