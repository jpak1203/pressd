import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
    theme: {
        tokens: {
            fonts: {
                heading: { value: 'var(--pressd-sans)' },
                body: { value: 'var(--pressd-sans)' },
                mono: { value: 'var(--pressd-mono)' },
            },
        },
    },
    globalCss: {
        ':root': {
            '--pressd-bg': '#0c0c0f',
            '--pressd-surface': '#131318',
            '--pressd-surface-2': '#1B1B22',
            '--pressd-border': '#2E2E3D',
            '--pressd-text': '#F0EFF6',
            '--pressd-text-sub': '#B8B6D0',
            '--pressd-text-muted': '#9E9CB8',
            '--pressd-accent': '#C8A7FF',
            '--pressd-accent-dim': '#A97FFF',
            '--pressd-accent-glow': '#c8a7ff22',
            '--pressd-red': '#FF8FA6',
            '--pressd-green': '#5CFFC2',
            '--pressd-mono': "'DM Mono', monospace",
            '--pressd-sans': "'DM Sans', sans-serif",
        },
        '*': {
            boxSizing: 'border-box',
        },
        'html, body, #root': {
            minHeight: '100%',
        },
        body: {
            margin: 0,
            minWidth: '320px',
            background:
                'linear-gradient(160deg, #101017 0%, #0c0c0f 40%, #12101a 100%), radial-gradient(900px 520px at 12% 8%, #8b64d81f, transparent 62%), radial-gradient(1100px 620px at 82% -10%, #c8a7ff24, transparent 62%)',
            backgroundColor: 'var(--pressd-bg)',
            backgroundAttachment: 'fixed',
            color: 'var(--pressd-text)',
            fontFamily: 'var(--pressd-sans)',
            lineHeight: 1.5,
            fontSynthesis: 'none',
            textRendering: 'optimizeLegibility',
        },
        a: {
            color: 'inherit',
            textDecoration: 'none',
        },
        form: {
            width: '100%',
        },
        '.pressd-mono': {
            fontFamily: 'var(--pressd-mono)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
        },
        '.pressd-link': {
            color: 'var(--pressd-text)',
            textDecoration: 'underline',
            textDecorationColor: 'transparent',
            textUnderlineOffset: '3px',
            transition:
                'color 0.15s ease, text-decoration-color 0.15s ease, opacity 0.15s ease',
        },
        '.pressd-link:hover, .pressd-link:focus-visible': {
            color: 'var(--pressd-text)',
            textDecorationColor: 'var(--pressd-accent)',
        },
    },
})

export const pressdSystem = createSystem(defaultConfig, config)
