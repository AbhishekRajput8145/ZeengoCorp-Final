import { insertNewsletterSchema } from "../../shared/schema";

interface Env {
    SENDGRID_API_KEY?: string;
    RECIPIENT_EMAIL?: string;
    TURNSTILE_SECRET_KEY?: string;
    SENDER_EMAIL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const data = await request.json();

        // Validation
        const parseResult = insertNewsletterSchema.safeParse(data);
        if (!parseResult.success) {
            return new Response(JSON.stringify({ message: "Invalid email" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }

        if (parseResult.data.bot_field) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }

        const { email, token } = parseResult.data;
        const ip = request.headers.get("CF-Connecting-IP") || "unknown";

        // Cloudflare Turnstile Verification
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

        // Send Email Notification for Newsletter (SendGrid)
        const sendgridKey = env.SENDGRID_API_KEY;


        if (sendgridKey) {
            await fetch("https://api.sendgrid.com/v3/mail/send", {
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
                    subject: `New Newsletter Subscriber: ${email}`,
                    content: [{
                        type: "text/plain",
                        value: `A new user has subscribed to the newsletter.\n\nEmail: ${email}`
                    }]
                })
            });
        }

        return new Response(JSON.stringify({ success: true, message: "Subscribed successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (err) {
        return new Response(JSON.stringify({ message: "Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
