---
name: git-smart-commit
description: Smart git commit with auto-generated messages based on changes
---

# Git Smart Commit

Intelligently create git commits by analyzing code changes and generating meaningful commit messages.

## Usage

```
/git-smart-commit
```

## What it does

1. **Analyzes current changes** - Reviews staged and unstaged modifications
2. **Groups related changes** - Identifies logical units of work
3. **Generates commit messages** - Creates clear, conventional commit messages
4. **Stages intelligently** - Groups files by feature/fix type
5. **Commits with context** - Includes relevant details in commit body

## Commit Message Format

Follows Conventional Commits specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/fixing tests
- `build`: Build system changes
- `ci`: CI configuration
- `chore`: Other changes

## Example Output

```
feat(music-api): add playlist synchronization

Implement real-time playlist sync across devices using WebSocket.
- Add sync endpoint for playlist updates
- Handle conflict resolution for concurrent edits
- Add retry logic for failed sync attempts

Closes #42
```

## Options

- **Interactive mode**: Review and edit generated messages before commit
- **Auto-stage**: Automatically stage all changes before analysis
- **Split commits**: Create separate commits for unrelated changes
