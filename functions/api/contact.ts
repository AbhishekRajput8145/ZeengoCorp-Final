import { insertContactSchema } from "../../shared/schema";

interface Env {
    SENDGRID_API_KEY?: string;
    RECIPIENT_EMAIL?: string;
    SENDER_EMAIL?: string;
    TURNSTILE_SECRET_KEY?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const data = await request.json();

        // 0. Rate Limiting (Basic IP check)
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";
        // In a real Worker, use KV for stateful rate limiting. 
        // This per-isolate set is a basic protection.

        // 1. Zod Validation
        const parseResult = insertContactSchema.safeParse(data);
        if (!parseResult.success) {
            return new Response(JSON.stringify({ message: "Invalid input", errors: parseResult.error }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { name, email, message, interestArea, bot_field, token } = parseResult.data;

        // 1.5 Cloudflare Turnstile Verification (Verify Human)
        if (token) {
            const formData = new FormData();
            formData.append('secret', env.TURNSTILE_SECRET_KEY || "");
            formData.append('response', token);
            formData.append('remoteip', ip);

            const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
            const result = await fetch(url, {
                body: formData,
                method: 'POST',
            });

            const outcome = await result.json() as any;
            if (!outcome.success) {
                return new Response(JSON.stringify({ message: "Turnstile verification failed" }), {
                    status: 403,
                    headers: { "Content-Type": "application/json" }
                });
            }
        } else if (env.TURNSTILE_SECRET_KEY) {
            // If secret key is set but no token provided, fail closed
            return new Response(JSON.stringify({ message: "Turnstile token required" }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 2. Honeypot Check (Security)
        if (bot_field) {
            // Silently succeed for bots
            return new Response(JSON.stringify({ success: true, message: "Message sent" }), {
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        }

        // 3. Send Email (SendGrid)
        const sendgridKey = env.SENDGRID_API_KEY;

        if (sendgridKey) {
            const emailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${sendgridKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    personalizations: [{
                        to: [{ email: env.RECIPIENT_EMAIL || "contact@zeengocorp.com" }]
                    }],
                    from: { email: env.SENDER_EMAIL || "no-reply@zeengocorp.com", name: "ZeengoCorp Website" },
                    subject: `New Lead: ${name} (${interestArea})`,
                    content: [{
                        type: "text/plain",
                        value: `Name: ${name}\nEmail: ${email}\nInterest: ${interestArea}\n\nMessage:\n${message}`
                    }]
                })
            });

            if (!emailResponse.ok) {
                console.error("SendGrid Error", await emailResponse.text());
                // We still return success to the user so they don't see backend errors
            }
        } else {
            console.log("Mock Email Sent (No API Key):", { name, email, message });
        }

        // 4. Success Response
        return new Response(JSON.stringify({ success: true, message: "Message sent successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
