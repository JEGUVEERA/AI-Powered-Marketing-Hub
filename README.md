# AI-Powered Marketing Hub

## Project Overview

The AI-Powered Marketing Hub is a comprehensive web application designed to streamline and enhance various marketing tasks through the power of AI. It leverages cutting-edge technologies to provide tools for generating marketing content, analyzing sentiment, creating social media posts, generating images, creating and managing email campaigns, and more.

## Project Structure

The project is organized into several key directories, each serving a specific purpose:
```
├── .vscode/
│   └── settings.json                # VS Code settings for the project.
├── app/                            # Main application routes and pages.
│   ├── api/                       # API routes for the application.
│   │   ├── chat/
│   │   │   └── route.ts          # API route for chat interactions.
│   │   ├── generate/
│   │   │   └── route.ts          # API route for content generation.
│   │   ├── generate-content/
│   │   │   └── route.ts          # API route for generating marketing content.
│   │   ├── generate-image/
│   │   │   └── route.ts          # API route for generating images.
│   │   ├── generate-social/
│   │   │   └── route.ts          # API route for generating social media posts.
│   │   ├── generate_post/
│   │   │   └── route.ts          # API route for generating general posts.
│   │   └── tts/                  # API route for text-to-speech functionalities.
│   │       ├── audio/
│   │       │   └── route.ts      # API route to get the audio.
│   │       └── route.ts          # API route for the text to speech.
│   ├── chat-history/               # Page to display chat history.
│   │   ├── loading.tsx            # Loading state for chat history.
│   │   └── page.tsx               # Main page component for chat history.
│   ├── chatbot/                   # Chatbot main page.
│   │   └── page.tsx               # Chatbot component.
│   ├── data-visualizer/           # Data visualization page.
│   │   └── page.tsx               # Data visualization component.
│   ├── email-generator/           # Email generator page.
│   │   └── page.tsx               # Email generator component.
│   ├── image-generator/           # Image generator page.
│   │   └── page.tsx               # Image generator component.
│   ├── login/                     # Login page.
│   │   └── page.tsx               # Login component.
│   ├── marketing-content-generator/ # Marketing content generator page.
│   │   └── page.tsx               # Marketing content generator component.
│   ├── register/                  # Register page.
│   │   └── page.tsx               # Register component.
│   ├── sentiment/                 # Sentiment analysis page.
│   │   └── page.tsx               # Sentiment analysis component.
│   ├── social-media-generator/   # Social media post generator page.
│   │   └── page.tsx               # Social media post generator component.
│   ├── text-to-speech/            # Text-to-speech page.
│   │   └── page.tsx               # Text-to-speech component.
│   ├── globals.css                # Global CSS styles.
│   ├── layout.tsx                 # Root layout for the application.
│   └── page.tsx                   # Home page component.
├── components/                      # Reusable UI components.
│   ├── ui/                       # Radix UI components.
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── utils/                     # Utility functions for components.
│   │   ├── chatHistory.ts       # Utility functions for chat history.
│   │   └── sentimentUtils.ts    # Utility functions for sentiment analysis.
│   ├── Navbar.tsx                 # Main navigation bar component.
│   ├── auth-provider.tsx          # Authentication provider.
│   ├── charts.tsx                 # Chart components.
│   ├── chat-bot.tsx               # Chatbot UI component.
│   ├── chat-history.tsx           # Chat history UI component.
│   ├── data-visualization.tsx     # Data visualization UI component.
│   ├── email-generator.tsx        # Email generator UI component.
│   ├── floating-action-button.tsx # Floating action button component.
│   ├── home.tsx                   # Home UI component.
│   ├── image-generator.tsx        # Image generator UI component.
│   ├── marketing-content-generator.tsx # Marketing content generator UI component.
│   ├── mode-toggle.tsx            # Dark/light mode toggle component.
│   ├── sentiment-analysis.tsx     # Sentiment analysis UI component.
│   ├── social-media-generator.tsx # Social media generator UI component.
│   ├── text-to-speech.tsx         # Text-to-speech UI component.
│   └── theme-provider.tsx         # Theme provider component.
├── hooks/                          # Custom React hooks.
│   ├── use-auth.ts                # Authentication hook.
│   ├── use-mobile.tsx             # Mobile device detection hook.
│   └── use-toast.ts               # Toast notification hook.
├── lib/                            # Utility and helper functions.
│   ├── sampleCSV.ts                # Sample CSV data.
│   └── utils.ts                  # General utility functions.
├── public/                         # Static assets.
│   ├── images/
│   │   └── ai-marketing-hub.png   # Logo image.
│   ├── placeholder-logo.png       # Placeholder logo image.
│   ├── placeholder-logo.svg       # Placeholder logo SVG.
│   ├── placeholder-user.jpg       # Placeholder user image.
│   ├── placeholder.jpg            # Placeholder image.
│   └── placeholder.svg            # Placeholder SVG.
├── styles/                         # CSS styles.
│   └── globals.css               # Global styles.
├── cat_sunglasses.png               # Example image file
├── components.json                 # Configuration file for shadcn/ui.
├── next.config.mjs                # Next.js configuration file.
├── package-lock.json              # npm package lock file.
├── package.json                    # npm project configuration file.
├── pnpm-lock.yaml                 # pnpm package lock file.
├── postcss.config.mjs              # PostCSS configuration file.
├── tailwind.config.ts             # Tailwind CSS configuration file.
├── test.mp3                     # Example mp3 file
├── tsconfig.json                  # TypeScript configuration file.
└── tts.py                         # Python script for Text-to-Speech functions.
```
## File Descriptions and Functionalities

### Root Level

-   **`cat_sunglasses.png`**: Example image asset.
-   **`components.json`**: Configuration file for `shadcn/ui`.
-   **`next.config.mjs`**: Next.js project configuration.
-   **`package-lock.json`, `package.json`**: npm package manager files.
-   **`pnpm-lock.yaml`**: pnpm package manager file.
-   **`postcss.config.mjs`**: PostCSS configuration for styling.
-   **`tailwind.config.ts`**: Tailwind CSS configuration.
-   **`test.mp3`**: Example audio asset.
-   **`tsconfig.json`**: TypeScript compiler options.
-   **`tts.py`**: Python script for text-to-speech processing.

### `.vscode/`

-   **`settings.json`**: VS Code editor settings.

### `app/`

-   **`api/`**: Contains API routes using Next.js API routes:
    -   **`chat/route.ts`**: Handles chat interactions.
    -   **`generate/route.ts`**: Manages content generation.
    -   **`generate-content/route.ts`**: Generates marketing content.
    -   **`generate-image/route.ts`**: Handles image generation.
    -   **`generate-social/route.ts`**: Generates social media posts.
    -   **`generate_post/route.ts`**: Creates posts.
    -   **`tts/`**:
        -   **`audio/route.ts`**: Provides audio for text-to-speech.
        -   **`route.ts`**: Main text-to-speech processing.
-   **`chat-history/`**:
    -   **`loading.tsx`**: Loading component for chat history.
    -   **`page.tsx`**: Main component to display chat history.
-   **`chatbot/`**:
    -   **`page.tsx`**: Main chatbot component.
-   **`data-visualizer/`**:
    -   **`page.tsx`**: Component for data visualization.
-   **`email-generator/`**:
    -   **`page.tsx`**: Component for generating emails.
-   **`image-generator/`**:
    -   **`page.tsx`**: Component for image generation.
-   **`login/`**:
    -   **`page.tsx`**: Login page component.
-   **`marketing-content-generator/`**:
    -   **`page.tsx`**: Component for generating marketing content.
-   **`register/`**:
    -   **`page.tsx`**: Registration page component.
-   **`sentiment/`**:
    -   **`page.tsx`**: Component for sentiment analysis.
-   **`social-media-generator/`**:
    -   **`page.tsx`**: Component for generating social media posts.
-   **`text-to-speech/`**:
    -   **`page.tsx`**: Component for text-to-speech conversion.
-   **`globals.css`**: Global CSS for the entire application.
-   **`layout.tsx`**: Root layout component for all pages.
-   **`page.tsx`**: Home page component.

### `components/`

-   **`ui/`**: Reusable UI components created with Radix UI.
-   **`utils/`**: Utility functions for components.
    -   **`chatHistory.ts`**: Functions for managing chat history.
    -   **`sentimentUtils.ts`**: Functions for sentiment analysis.
-   **`Navbar.tsx`**: Navigation bar component.
-   **`auth-provider.tsx`**: Authentication provider.
-   **`charts.tsx`**: Reusable chart components.
-   **`chat-bot.tsx`**: Chatbot UI component.
-   **`chat-history.tsx`**: Chat history UI component.
-   **`data-visualization.tsx`**: Data visualization UI component.
-   **`email-generator.tsx`**: Email generator UI component.
-   **`floating-action-button.tsx`**: Floating action button component.
-   **`home.tsx`**: Home UI component.
-   **`image-generator.tsx`**: Image generator UI component.
-   **`marketing-content-generator.tsx`**: Marketing content generator UI component.
-   **`mode-toggle.tsx`**: Dark/light mode toggle component.
-   **`sentiment-analysis.tsx`**: Sentiment analysis UI component.
-   **`social-media-generator.tsx`**: Social media generator UI component.
-   **`text-to-speech.tsx`**: Text-to-speech UI component.
-   **`theme-provider.tsx`**: Theme provider component.

### `hooks/`

-   **`use-auth.ts`**: Custom hook for authentication.
-   **`use-mobile.tsx`**: Custom hook for detecting mobile devices.
-   **`use-toast.ts`**: Custom hook for toast notifications.

### `lib/`

-   **`sampleCSV.ts`**: Sample CSV data for testing or examples.
-   **`utils.ts`**: General utility functions.

### `public/`

-   **`images/`**:
    -   **`ai-marketing-hub.png`**: The logo for the AI Marketing Hub.
-   **`placeholder-logo.png`, `placeholder-logo.svg`, `placeholder-user.jpg`, `placeholder.jpg`, `placeholder.svg`**: Placeholder assets.

### `styles/`

-   **`globals.css`**: Global CSS styles for the application.

## Functionalities

-   **Chatbot**: Enables interactive conversations.
-   **Chat History**: Stores and displays chat history.
-   **Data Visualization**: Presents data in charts and other visual formats.
-   **Email Generator**: Creates email content.
-   **Image Generator**: Generates images based on user input.
-   **Login & Registration**: Manages user authentication.
-   **Marketing Content Generator**: Creates various types of marketing content.
-   **Sentiment Analysis**: Analyzes text for sentiment.
-   **Social Media Generator**: Creates social media posts.
-   **Text-to-Speech**: Converts text into audio.
-   **Dark/Light Mode**: Toggle for color mode.
-   **Authentication**: User login and registration.

## How to Use

1.  **Clone the Repository**:
```
bash
    git clone [repository-url]
    
```
2.  **Install Dependencies**:
```
bash
    pnpm install
    
```
3.  **Run the Application**:
```
bash
    pnpm dev
    
```
4.  **Access**: Open your browser and go to `http://localhost:3000`.

## Technologies Used

-   **Next.js**: For server-side rendering and routing.
-   **React**: For building the user interface.
-   **TypeScript**: For type safety.
-   **Tailwind CSS**: For styling.
-   **Shadcn/ui**: For UI components.
- **Radix UI**: For unstyled UI components.
- **Pnpm**: Package manager.

