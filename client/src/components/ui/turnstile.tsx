import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        turnstile: any;
    }
}

interface TurnstileProps {
    siteKey: string;
    onVerify: (token: string) => void;
}

export function Turnstile({ siteKey, onVerify }: TurnstileProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [widgetId, setWidgetId] = useState<string | null>(null);

    useEffect(() => {
        if (!containerRef.current || !window.turnstile) return;

        // Clear any existing widget
        if (widgetId) {
            window.turnstile.remove(widgetId);
        }

        const id = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => onVerify(token),
        });

        setWidgetId(id);

        return () => {
            if (id) window.turnstile.remove(id);
        };
    }, [siteKey]);

    return <div ref={containerRef} className="my-4" />;
}
