import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filePath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filePath);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/shared/api"),
      "@ui": path.resolve(__dirname, "./src/shared/ui"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@helpers": path.resolve(__dirname, "./src/shared/helpers"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@services": path.resolve(__dirname, "./src/shared/services")
    }
  }
})
