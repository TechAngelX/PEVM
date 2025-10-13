cat > README.md << 'EOF'
# Regressify

### Interactive Regression Visualization Tool

**A visual salary prediction tool comparing regression methods, to help * understand machine learning regression models through real-world salary predictions**

<div align="center">

![Regressify Screenshot](./public/images/screenshot1.png)

[![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.x-8884d8?style=for-the-badge)](https://recharts.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[View Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## About The Project

**Regressify** is an educational web application that makes machine learning regression models easy to understand through interactive visualizations. Built for students, educators, and data science enthusiasts, it demonstrates how different regression algorithms predict tech salaries based on years of experience.

### Why Regressify?

- **Visual Learning**: See how each model works in real-time
- **Real-World Context**: Uses realistic salary data with natural variation (±£10k noise)
- **Comparative Analysis**: Switch between 4 models instantly to understand their differences
- **No Black Box**: Every model includes detailed explanations of how it works, when to use it, and its trade-offs

---

## Features

### Four Regression Models

| Model | Best For | Visual Pattern |
|-------|----------|----------------|
| **Linear Regression** | Simple relationships, small datasets | Straight diagonal line |
| **Polynomial Regression** | Career growth curves, natural plateaus | Smooth curve that flattens |
| **Decision Tree** | Clear rules, HR salary bands | Horizontal steps/stairs |
| **Neural Network** | Complex patterns, hidden factors | Wavy curve with oscillations |

### Interactive Features

- **Live Chart Updates** - Click any model to see predictions instantly
- **Expandable Details** - Show/hide technical explanations with one click
- **Real Data Simulation** - Each reload generates new realistic salary data
- **Educational Content** - Pros, cons, and real-world examples for each model
- **Smooth Animations** - Beautiful transitions and gradients

### Additional Concepts Explained

- **Ridge Regression** - How to handle 50+ features without overfitting
- **Lasso Regression** - Automatic feature selection that eliminates weak factors
- **Noise & Variance** - Why real-world predictions scatter around the trend line
- **Model Trade-offs** - Understanding when each algorithm shines

---

## Tech Stack

- **React 18** - Modern UI framework with hooks
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS 3** - Utility-first styling framework
- **Recharts** - Composable charting library built on React components
- **JavaScript (ES6+)** - Modern ECMAScript features

---

## Getting Started

### Prerequisites

- Node.js 16+ and npm installed
- Basic understanding of React (helpful but not required)

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/regressify.git

# Navigate to project directory
cd regressify

# Install dependencies
npm install

# Start development server
npm run dev
