/// <reference types="@cloudflare/workers-types" />

type Env = {
    SENDGRID_API_KEY: string;
    RECIPIENT_EMAIL: string;
    SENDER_EMAIL: string;
    TURNSTILE_SECRET_KEY: string;
}

// Global type for Pages Functions
declare type PagesFunction<T = unknown> = (context: EventContext<T, any, Record<string, unknown>>) => Promise<Response>;

interface EventContext<Env, P, Data> {
    request: Request;
    functionPath: string;
    waitUntil: (promise: Promise<any>) => void;
    passThroughOnException: () => void;
    next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
    env: Env;
    params: P;
    data: Data;
}
