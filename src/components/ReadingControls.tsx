import { useEffect, useState, type ReactNode } from "react";
import type { Locale } from "../i18n";
import "./ReadingControls.css";

interface Props {
    locale: Locale;
    children: ReactNode;
}

export default function ReadingControls({ locale, children }: Props) {
    const [size, setSize] = useState(100);
    const [ready, setReady] = useState(false);
    useEffect(() => setReady(true), []);
    const text = locale === "bn"
        ? { label: "লেখার আকার", smaller: "ছোট করুন", larger: "বড় করুন", reset: "স্বাভাবিক" }
        : { label: "Text size", smaller: "Smaller", larger: "Larger", reset: "Reset" };

    return (
        <div className="reading-area">
            <div className="reading-controls" role="group" aria-label={text.label}>
                <span>{text.label}</span>
                <button type="button" disabled={!ready || size <= 90} onClick={() => setSize((value) => Math.max(90, value - 10))}>{text.smaller}</button>
                <output aria-live="polite" aria-label={text.label}>{new Intl.NumberFormat(locale).format(size)}%</output>
                <button type="button" disabled={!ready || size >= 140} onClick={() => setSize((value) => Math.min(140, value + 10))}>{text.larger}</button>
                <button type="button" disabled={!ready || size === 100} onClick={() => setSize(100)}>{text.reset}</button>
            </div>
            <div style={{ fontSize: `${size}%` }}>{children}</div>
        </div>
    );
}
