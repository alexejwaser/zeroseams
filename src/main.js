import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CarouselStage } from '@/canvas';
import { Toolbar, LayerPanel, PropertiesPanel, ContextMenu } from '@/ui';
import { AIProvider } from '@/ai';
function App() {
    return (_jsxs("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            background: '#1a1a1a',
            fontFamily: 'system-ui, sans-serif',
            overflow: 'hidden',
        }, children: [_jsx(Toolbar, {}), _jsxs("div", { style: {
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden',
                }, children: [_jsx(LayerPanel, {}), _jsx("div", { style: {
                            flex: 1,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            padding: 24,
                            background: '#111',
                            boxSizing: 'border-box',
                        }, children: _jsx(CarouselStage, {}) }), _jsx(PropertiesPanel, {})] }), _jsx(ContextMenu, {})] }));
}
const rootEl = document.getElementById('root');
if (!rootEl)
    throw new Error('Root element not found');
ReactDOM.createRoot(rootEl).render(_jsx(React.StrictMode, { children: _jsx(AIProvider, { children: _jsx(App, {}) }) }));
