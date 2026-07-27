const DEFAULT_PIPELINE_ID = 14008859;
const DEFAULT_STATUS_ID = 108123767;

const LEAD_FIELDS = {
  objetivo: 409306,
  utm_content: 409194,
  utm_medium: 409196,
  utm_campaign: 409198,
  utm_source: 409200,
  utm_term: 409202,
  utm_referrer: 409204,
  referrer: 409206,
  gclid: 409210,
  fbclid: 409212,
};

function clean(value, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function fieldValue(fieldId, value) {
  if (!value) return null;
  return {
    field_id: fieldId,
    values: [{ value }],
  };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, error: "Método não permitido." });
  }

  const token = process.env.KOMMO_LONG_LIVED_TOKEN;
  const subdomain = process.env.KOMMO_SUBDOMAIN || "leodutra100";
  const pipelineId = Number(process.env.KOMMO_PIPELINE_ID || DEFAULT_PIPELINE_ID);
  const statusId = Number(process.env.KOMMO_STATUS_ID || DEFAULT_STATUS_ID);

  if (!token) {
    console.error("KOMMO_LONG_LIVED_TOKEN não configurado.");
    return response.status(500).json({ ok: false, error: "Integração indisponível." });
  }

  const body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : (request.body || {});

  // Campo invisível para bloquear robôs simples.
  if (body.website) {
    return response.status(200).json({ ok: true });
  }

  const nome = clean(body.nome, 120);
  const empresa = clean(body.empresa, 160);
  const email = clean(body.email, 180).toLowerCase();
  const whatsapp = clean(body.whatsapp, 40);
  const dor = clean(body.dor, 1000);

  if (!nome || !email || !whatsapp) {
    return response.status(400).json({
      ok: false,
      error: "Preencha nome, e-mail e WhatsApp.",
    });
  }

  const tracking = {
    utm_content: clean(body.utm_content, 250),
    utm_medium: clean(body.utm_medium, 250),
    utm_campaign: clean(body.utm_campaign, 250),
    utm_source: clean(body.utm_source, 250),
    utm_term: clean(body.utm_term, 250),
    utm_referrer: clean(body.utm_referrer, 500),
    referrer: clean(body.referrer, 500),
    gclid: clean(body.gclid, 500),
    fbclid: clean(body.fbclid, 500),
  };

  const leadCustomFields = [
    fieldValue(LEAD_FIELDS.objetivo, dor),
    ...Object.entries(tracking).map(([key, value]) => fieldValue(LEAD_FIELDS[key], value)),
  ].filter(Boolean);

  const contactCustomFields = [
    {
      field_code: "PHONE",
      values: [{ value: whatsapp, enum_code: "MOB" }],
    },
    {
      field_code: "EMAIL",
      values: [{ value: email, enum_code: "WORK" }],
    },
  ];

  const lead = {
    name: `Diagnóstico do site — ${empresa || nome}`,
    pipeline_id: pipelineId,
    status_id: statusId,
    custom_fields_values: leadCustomFields,
    _embedded: {
      contacts: [
        {
          first_name: nome,
          custom_fields_values: contactCustomFields,
        },
      ],
      ...(empresa ? { companies: [{ name: empresa }] } : {}),
      tags: [{ name: "Site ALT" }, { name: "Diagnóstico" }],
    },
    request_id: `site-alt-${Date.now()}`,
  };

  try {
    const kommoResponse = await fetch(`https://${subdomain}.kommo.com/api/v4/leads/complex`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify([lead]),
    });

    const responseText = await kommoResponse.text();
    let kommoData = null;

    try {
      kommoData = responseText ? JSON.parse(responseText) : null;
    } catch {
      kommoData = responseText;
    }

    if (!kommoResponse.ok) {
      console.error("Erro Kommo:", kommoResponse.status, kommoData);
      return response.status(502).json({
        ok: false,
        error: "Não foi possível registrar o diagnóstico agora.",
      });
    }

    return response.status(200).json({
      ok: true,
      lead_id: Array.isArray(kommoData) ? kommoData[0]?.id : undefined,
    });
  } catch (error) {
    console.error("Falha de comunicação com Kommo:", error);
    return response.status(502).json({
      ok: false,
      error: "Não foi possível registrar o diagnóstico agora.",
    });
  }
}
