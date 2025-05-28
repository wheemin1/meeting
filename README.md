# Meeting Timezone Planner 🌍

A modern, beautiful web application for coordinating meetings across different time zones. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Multi-timezone Support**: Supports multiple cities and timezones worldwide
- **Real-time Collaboration**: Multiple participants can join and update their availability
- **Smart Time Matching**: Automatically finds common available time slots for all participants
- **Multilingual**: Supports Korean and English languages
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful gradient designs with smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns & date-fns-tz
- **State Management**: React Hooks
- **Storage**: LocalStorage

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   └── room/[roomId]/     # Room page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── date-selector.tsx # Date selection component
│   └── time-grid-selector.tsx # Time slot selection
├── lib/                  # Utility libraries
│   ├── storage.ts        # LocalStorage service
│   ├── timezone.ts       # Timezone utilities
│   └── i18n.ts          # Internationalization
├── types/                # TypeScript type definitions
├── data/                 # Static data (cities, etc.)
└── public/               # Static assets
```

## 🎯 Key Features

### Time Zone Management
- Supports 20+ major cities worldwide
- Automatic timezone detection and conversion
- Real-time local time display for each participant

### Meeting Coordination
- Create meeting rooms with unique IDs
- Participants can join with their location and availability
- Smart algorithm finds optimal meeting times for all participants

### User Experience
- Beautiful, modern interface with gradient designs
- Smooth animations and transitions
- Mobile-responsive design
- Copy-to-clipboard room sharing

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/[USERNAME]/meeting-timezone-planner.git
cd meeting-timezone-planner
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build

To create a production build:

```bash
npm run build
```

## 🌐 Deployment

This project is configured for easy deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy!

## 🔧 Environment Variables

No environment variables are required for basic functionality as the app uses LocalStorage for data persistence.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Date utilities from [date-fns](https://date-fns.org/)

---

Made with ❤️ for better global collaboration
