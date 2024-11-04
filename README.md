# FriendScope

FriendScope is a modern web application designed to help individuals evaluate and strengthen their friendships through scientific assessment and personalized insights. Built with Next.js and TypeScript, it offers a sophisticated yet user-friendly interface for examining different aspects of interpersonal relationships.

## ✨ Key Features

- 🔍 **Scientific Assessment**: Comprehensive questionnaire based on psychological research
- 📊 **Visual Analytics**: Interactive charts showing different aspects of friendship
- 🎯 **Personalized Insights**: Tailored recommendations based on assessment results
- 🔐 **Privacy-Focused**: No account required, data stored locally
- 💫 **Elegant UI**: Smooth animations and responsive design
- 📱 **Cross-Platform**: Seamless experience across all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand with persist middleware
- **Data Visualization**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Additional Libraries**: 
  - date-fns for date handling
  - jsPDF for PDF generation
  - Lottie for animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.17.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ChanMeng666/friendscope.git
cd friendscope

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
friendscope/
├── app/                 # Next.js app directory
│   ├── about/          # About page
│   ├── assess/         # Assessment flow
│   ├── results/        # Results visualization
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── layout/        # Layout components
├── lib/               # Utilities and stores
├── hooks/             # Custom hooks
└── public/            # Static assets
```

## ⚙️ Core Features

- **Scientific Assessment**: Evaluates 10 key aspects of friendship including trust, communication, and emotional support
- **Visual Insights**: Radar charts and trend analysis for comprehensive understanding
- **Progress Tracking**: Historical data visualization and comparison tools
- **Exportable Results**: PDF export functionality for assessment results
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- UI components based on [shadcn/ui](https://ui.shadcn.com/)
- Design inspiration from various friendship assessment tools
- Icon library provided by [Lucide](https://lucide.dev/)

## Author

**Chan Meng**
- LinkedIn: [chanmeng666](https://www.linkedin.com/in/chanmeng666/)
- GitHub: [ChanMeng666](https://github.com/ChanMeng666)
