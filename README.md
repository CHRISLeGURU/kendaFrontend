# KENDA - Urban Mobility on Cardano Blockchain

A decentralized ride-sharing platform built on the Cardano blockchain, enabling secure, transparent, and rewarding urban mobility.

## 🚀 Features

- **Blockchain Powered**: Built on Cardano for secure and transparent transactions
- **Wallet Integration**: Connect with popular Cardano wallets (Nami, Eternl, Flint, Yoroi)
- **Interactive Map**: Find and request rides in real-time
- **Token Rewards**: Earn KENDA tokens for every ride
- **Dark Mode**: Beautiful dark-themed UI optimized for mobile use

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Custom components following KENDA design system
- **Icons**: Lucide React
- **Maps**: Leaflet
- **Blockchain**: MeshJS (Cardano wallet integration)
- **Fonts**: Inter & Manrope (Google Fonts)

## 🎨 Design System

### Color Palette
- **Background**: `#000000` (Primary), `#0C0C0C` (Secondary)
- **Borders**: `#1A1A1A`
- **Accent**: `#F0B90B` (Kenda Yellow)
- **Text**: `#FFFFFF` (Primary), `#9A9A9A` (Secondary)
- **Error**: `#FF4747`

### Typography
- **Headings**: Manrope (Bold/Semi-Bold)
- **Body**: Inter (Regular/Medium)
- **Sizes**: H1 (32px), H2 (24px), Body (14-16px)

### Component Rules
- **Buttons**: Yellow background, black text, 10-12px radius
- **Cards**: Dark background (#0C0C0C), border (#1A1A1A), 12px radius, 24px padding
- **Inputs**: Dark background, white text, yellow focus ring
- **Spacing**: Multiples of 8px (8, 16, 24, 32)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Project Structure

```
kendaFrontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Landing page
│   ├── map/               # Map view page
│   └── wallet/            # Wallet page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── layout/            # Layout components
│       ├── header.tsx
│       └── footer.tsx
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🔗 Blockchain Integration

KENDA uses MeshJS to integrate with the Cardano blockchain:

- Connect Cardano wallets (Nami, Eternl, Flint, Yoroi)
- View ADA and KENDA token balances
- Transaction history
- Secure on-chain ride records

## 📱 Mobile First

The application is designed with a mobile-first approach, optimized for users on the move.

## 🤝 Contributing

Contributions are welcome! Please follow the KENDA design system guidelines when creating new components.

## 📄 License

© 2024 KENDA. Built on Cardano. All rights reserved.

## 🔮 Roadmap

- [ ] Complete Leaflet map integration
- [ ] Implement MeshJS wallet connection
- [ ] Add real-time ride matching
- [ ] Integrate KENDA token smart contracts
- [ ] Build driver dashboard
- [ ] Add ride history and analytics
- [ ] Implement rating system
- [ ] Mobile app (React Native)
