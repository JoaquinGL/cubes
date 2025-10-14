# 🎲 The Arithmetic Challenge

<div align="center">

![Svelte](https://img.shields.io/badge/Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Matter.js](https://img.shields.io/badge/Matter.js-4B4B4D?style=for-the-badge&logo=javascript&logoColor=white)

**An interactive numbers puzzle game with physics-based gameplay**

[Demo](#) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage)

</div>

---

## 📖 About

**The Arithmetic Challenge** is a fun and engaging numbers puzzle game inspired by the classic "Countdown" numbers game. Players must combine six random numbers using basic arithmetic operations to reach a target number. The twist? It features realistic physics simulation using Matter.js, making the gameplay tactile and interactive!

### 🎯 Game Rules

- You receive **6 random numbers** (with a choice of how many "large" numbers: 25, 50, 75, 100)
- A **target number** between 100-999 is generated
- Drag and drop two number cubes into operation baskets (➕ ➖ ✖️ ➗)
- The result becomes a new cube you can use for further calculations
- Try to reach the exact target or get as close as possible!

### 🌍 Multilingual Support

The game is fully localized in:
- 🇪🇸 **Spanish** (Español)
- 🇬🇧 **English**

---

## ✨ Features

- 🎮 **Physics-based gameplay** - Interactive drag-and-drop with realistic physics
- 🧮 **Automatic solver** - See the ideal solution after finishing
- 📱 **Fully responsive** - Optimized for desktop, tablet, and mobile
- 🌐 **Bilingual** - Available in English and Spanish
- 🎨 **Beautiful UI** - Handwritten-style font with warm, kindergarten-inspired colors
- ⚡ **Fast & lightweight** - Built with Svelte and Vite
- 🎯 **Smart basket placement** - Optimized layouts for different screen sizes

---

## 🚀 Technologies

- **[Svelte 5](https://svelte.dev/)** - Reactive frontend framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[Matter.js](https://brm.io/matter-js/)** - 2D physics engine for realistic interactions
- **CSS3** - Custom styling with responsive design

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm

### Setup

```bash
# Clone the repository
git clone https://github.com/JoaquinGL/cubes.git

# Navigate to the project directory
cd cubes

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🎮 Usage

### Development

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type-check the project
```

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

---

## 🗂️ Project Structure

```
cubes/
├── src/
│   ├── lib/
│   │   ├── Board.svelte          # Game board with physics
│   │   ├── Basket.svelte         # Operation baskets
│   │   ├── Cube.svelte           # Number cubes with physics
│   │   ├── Game.svelte           # Main game logic
│   │   ├── NumberSelection.svelte # Initial screen
│   │   ├── HowToPlayModal.svelte # Instructions modal
│   │   ├── Victory.svelte        # Victory screen
│   │   ├── Summary.svelte        # Game summary
│   │   ├── engine.ts             # Matter.js physics setup
│   │   ├── solver.ts             # Algorithm to find solutions
│   │   ├── stores.ts             # Svelte stores
│   │   └── i18n.ts               # Internationalization
│   ├── App.svelte                # Root component
│   ├── main.ts                   # Entry point
│   └── app.css                   # Global styles
├── public/                        # Static assets
├── index.html                     # HTML entry point
└── package.json                   # Dependencies and scripts
```

---

## 🎨 Design Philosophy

The game features a warm, **kindergarten-inspired aesthetic** with:
- **Handwritten font** (Patrick Hand) for a friendly, approachable feel
- **Warm color palette** (creams, browns, oranges) reminiscent of wooden toys
- **Smooth animations** and physics interactions
- **Minimalist UI** focused on gameplay

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the classic "Countdown" numbers game
- Physics simulation powered by [Matter.js](https://brm.io/matter-js/)
- Font: [Patrick Hand](https://fonts.google.com/specimen/Patrick+Hand) by Patrick Wagesreiter
- Built with ❤️ using [Svelte](https://svelte.dev/)

---

## 📧 Contact

Created by [@JoaquinGL](https://github.com/JoaquinGL)

⭐ Star this repo if you find it useful!

---

<div align="center">
  Made with 🎲 and ☕
</div>
