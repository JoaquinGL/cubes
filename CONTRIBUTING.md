# Contributing to The Arithmetic Challenge

First off, thank you for considering contributing to The Arithmetic Challenge! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** if applicable
- **Environment details** (browser, OS, screen size)

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear use case** - Why would this feature be useful?
- **Proposed solution** - How do you envision it working?
- **Alternative solutions** - Have you considered other approaches?

### 🔧 Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Commit with clear messages**
7. **Push to your fork** and submit a pull request

#### Coding Standards

- Use **TypeScript** for type safety
- Follow the existing **code style**
- Write **meaningful commit messages**
- Keep components **small and focused**
- Add **comments** for complex logic
- Ensure **responsive design** works on all devices

#### Before Submitting

- [ ] Code follows the project's style guidelines
- [ ] Changes have been tested on desktop and mobile
- [ ] No console errors or warnings
- [ ] Documentation has been updated
- [ ] Commit messages are clear and descriptive

### 🌍 Translations

Want to add a new language? Great!

1. Add translations to `src/lib/i18n.ts`
2. Test all screens with the new language
3. Update the README with the new language flag

### 📝 Documentation

Improvements to documentation are always appreciated:

- Fix typos or unclear explanations
- Add examples or screenshots
- Improve installation instructions
- Translate documentation

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/cubes.git

# Install dependencies
npm install

# Start dev server
npm run dev

# Run type checking
npm run check
```

## Project Architecture

### Key Components

- **Board.svelte**: Physics world and basket management
- **Cube.svelte**: Individual number cubes with Matter.js bodies
- **Game.svelte**: Main game logic and state management
- **stores.ts**: Svelte stores for game state
- **solver.ts**: Algorithm to find optimal solutions

### Adding a New Feature

1. **Plan the feature** - Consider how it fits with existing code
2. **Create components** - Keep them modular and reusable
3. **Add translations** - Support both languages
4. **Test responsiveness** - Ensure it works on all screen sizes
5. **Update documentation** - Help others understand your feature

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Questions?

Feel free to open an issue with the `question` label!

---

Thank you for contributing! 🎲✨

