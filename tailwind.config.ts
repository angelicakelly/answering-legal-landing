import type { Config } from 'tailwindcss';

const config: Config = {
  // Asegúrate de que esta ruta de contenido sea correcta para tu proyecto (app router)
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // **UTILIZA ESTAS CLASES PARA TUS ESTILOS DE MARCA**
        // Reemplaza los valores HEX con los colores exactos de Answering Legal en Figma.
        'primary-blue': '#1a56db',
        'cta-hover': '#1548a3',
        'bg-section': '#f8f8f8', // Si hay un fondo gris claro en una sección
      },
      // Si el Figma usa una fuente específica (ej. Inter), la defines aquí:
      // fontFamily: {
      //   'sans': ['Inter', 'sans-serif'],
      // }
    },
  },
  plugins: [],
};

export default config;
