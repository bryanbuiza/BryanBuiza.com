// POST /api/contact: recibe el formulario de contacto, comprueba con Turnstile
// que no sea un bot y envía el mensaje por correo a CONTACT_TO_EMAIL.
//
// Respuestas (JSON):
//   200 { ok: true }
//   4xx/5xx { ok: false, error: "<mensaje para mostrar al visitante>" }

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const LIMITS = { name: 100, email: 254, message: 5000 };

// Validación básica: algo@algo.algo, sin espacios.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactForm {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
}

export async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Método no permitido." }, 405, { Allow: "POST" });
  }

  let form: ContactForm;
  try {
    form = await readForm(request);
  } catch {
    return json({ ok: false, error: "No se pudo leer el formulario." }, 400);
  }

  const invalid = validate(form);
  if (invalid) {
    return json({ ok: false, error: invalid }, 400);
  }

  const human = await verifyTurnstile(
    form.turnstileToken,
    env.TURNSTILE_SECRET_KEY,
    request.headers.get("CF-Connecting-IP"),
  );
  if (!human) {
    return json(
      { ok: false, error: "No pudimos verificar que no eres un robot. Inténtalo de nuevo." },
      403,
    );
  }

  try {
    await env.EMAIL.send({
      from: { name: "Formulario bryanbuiza.com", email: env.CONTACT_FROM_EMAIL },
      to: env.CONTACT_TO_EMAIL,
      // Al responder el correo, la respuesta va directo al visitante.
      replyTo: { name: form.name, email: form.email },
      subject: `Nuevo mensaje de ${form.name}`,
      text: [
        `Nombre: ${form.name}`,
        `Correo: ${form.email}`,
        "",
        form.message,
        "",
        "—",
        "Enviado desde el formulario de contacto de bryanbuiza.com",
      ].join("\n"),
    });
  } catch (error) {
    console.error("contact: email send failed", error);
    return json(
      {
        ok: false,
        error: "No se pudo enviar el mensaje. Inténtalo más tarde o escríbeme por LinkedIn.",
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}

async function readForm(request: Request): Promise<ContactForm> {
  const data = await request.formData();
  const field = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  return {
    // El nombre va en el asunto y en la cabecera Reply-To: sin saltos de línea.
    name: field("name").replace(/[\r\n]+/g, " "),
    email: field("email"),
    message: field("message"),
    turnstileToken: field("cf-turnstile-response"),
  };
}

/** Devuelve el error a mostrar, o null si el formulario es válido. */
function validate(form: ContactForm): string | null {
  if (!form.name || !form.email || !form.message) {
    return "Completa tu nombre, correo y mensaje.";
  }
  if (form.name.length > LIMITS.name) {
    return `El nombre puede tener hasta ${LIMITS.name} caracteres.`;
  }
  if (form.email.length > LIMITS.email || !EMAIL_PATTERN.test(form.email)) {
    return "Revisa tu correo electrónico.";
  }
  if (form.message.length > LIMITS.message) {
    return `El mensaje puede tener hasta ${LIMITS.message} caracteres.`;
  }
  if (!form.turnstileToken) {
    return "Espera a que termine la verificación anti-robots.";
  }
  return null;
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body });
    const result = await response.json<{ success: boolean; "error-codes"?: string[] }>();
    if (!result.success) {
      console.warn("contact: turnstile rejected", result["error-codes"]);
    }
    return result.success;
  } catch (error) {
    console.error("contact: turnstile verification failed", error);
    return false;
  }
}

function json(body: unknown, status: number, headers: Record<string, string> = {}): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}
