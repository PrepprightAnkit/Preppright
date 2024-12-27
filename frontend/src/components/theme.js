const theme = {
  colors: {
    primary: {
      light: '#EEF2FF', // indigo-50
      main: '#4F46E5', // indigo-600
      dark: '#3730A3', // indigo-800
      gradient: 'from-indigo-600 to-indigo-800',
      hover: '#4338CA' // indigo-700
    },
    secondary: {
      light: '#BFDBFE', // blue-200
      main: '#3B82F6', // blue-500
      dark: '#1E40AF', // blue-800
      hover: '#2563EB' // blue-600
    },
    success: {
      light: '#BBF7D0', // green-200
      main: '#22C55E', // green-500
      hover: '#16A34A' // green-600
    },
    error: {
      light: '#FECACA', // red-200
      main: '#EF4444', // red-500
      hover: '#DC2626' // red-600
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      600: '#4B5563',
      800: '#1F2937'
    }
  },
  spacing: {
    section: 'py-20 px-4',
    container: 'max-w-6xl mx-auto'
  },
  typography: {
    hero: 'text-5xl font-bold',
    heading: 'text-4xl font-bold',
    subheading: 'text-2xl font-bold',
    body: 'text-gray-600 text-lg leading-relaxed',
    gradient: 'bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent py-2'
  },
  components: {
    button: {
      base: 'px-8 py-4 rounded-xl font-semibold transition-all duration-300',
      primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg hover:scale-105',
      secondary: 'bg-blue-500 hover:bg-blue-600 text-white',
      success: 'bg-green-500 hover:bg-green-600 text-white'
    },
    card: {
      base: 'bg-white rounded-xl transition-all duration-300',
      hover: 'hover:shadow-xl hover:scale-105',
      padding: 'p-6'
    },
    icon: {
      base: 'bg-indigo-50 rounded-xl flex items-center justify-center',
      size: 'w-14 h-14',
      color: 'text-indigo-600'
    }
  }
};

export default theme;