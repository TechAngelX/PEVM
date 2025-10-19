# PEVM Converter — Polkadot ↔ Ethereum Address Tool

![App Screenshot](/images/screenshot1.png)

---

## Overview

PEVM Converter is a lightweight web tool that converts between Polkadot/Substrate (SS58) and Ethereum (0x) addresses.

It uses official Polkadot.js cryptographic utilities to ensure every conversion is accurate, reversible, and chain-compatible, just like Moonbeam, Astar, and other EVM-compatible Substrate networks.

The interface is built with React and TailwindCSS, designed to be clean, minimal, and modern, with branding by Tech Angel X.

---

## Features

- Two-way conversion between Polkadot SS58 and Ethereum 0x formats  
- Uses @polkadot/util-crypto for true cryptographic conversions  
- Accurate and reversible mapping  
- Modern UI with Inter font and glass-style panels  
- Custom branding with logo and signature in the top-left corner  
- Runs locally or on any static host (Vite / React app)

---

## Screenshot

![Screenshot](/images/screenshot1.png)

---

## Tech Stack

- React — Component-based UI  
- TailwindCSS — Styling and layout  
- @polkadot/util and @polkadot/util-crypto — Address conversion  
- Vite — Development and build tool  

---

## Installation

```bash
# Clone the project
git clone https://github.com/yourusername/pevm-converter.git

# Go to the project folder
cd pevm-converter

# Install dependencies
npm install

# Start the development server
npm run dev
Then open your browser and visit http://localhost:5173 (or the port shown in your terminal).

How It Works
Direction	Input Example	Output Example
Polkadot → EVM	148CkH8YBzA1pbudK1bMo2zUMHZwbucBVH8s3utwTS687UiR	0x8a32f59713f0a129fbc395dbc853f51ab53d45d1
EVM → Polkadot	0x2afe75c81f3a70e4d35c0028d39e5965b9b4efed	5G9tenfErXkSpinEaqzLyoWxystrLo4YZYGwMcXmD9FhnYrL

Conversions are exactly reversible, using:

addressToEvm(ss58Address) → returns EVM-compatible bytes

evmToAddress(0xAddress, 42) → returns SS58-format Substrate address

File Structure
pgsql
Copy code
pevm/
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   └── screenshot1.png
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
Branding
This project includes a small signature block:

Tech Angel X
by Ricki Angel

with your logo (/public/images/logo.png) pinned to the top-left corner of the app.

License
This project is provided as open source under the MIT License.

© 2025 Ricki Angel | Tech Angel X
