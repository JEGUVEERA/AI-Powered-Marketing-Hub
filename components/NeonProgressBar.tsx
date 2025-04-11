// components/NeonProgressBar.tsx
export default function NeonProgressBar() {
    return (
      <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 neon-progress-bar"></div>
      </div>
    )
  }
  