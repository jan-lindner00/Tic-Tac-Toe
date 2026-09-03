import { defineConfig, configDefaults} from "vitest/config"

export default defineConfig({
     test: {
        setupFiles: ["./test-setup.js"],
        environment: 'jsdom',
        globals: true,
        coverage: {
            provider: 'istanbul'
        },
        exclude: [
            ...configDefaults.exclude,
            '/test-setup.ts',
            '**/*.d.ts',
            'src/index.tsx',
            'src/router.tsx',
            'src/vite-env.d.ts'
        ]
    }
})