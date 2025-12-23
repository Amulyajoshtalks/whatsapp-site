const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

function requireEnv(name, value) {
  if (!value) {
    throw new Error(
      `Missing ${name}. Set it in your environment (CRA requires REACT_APP_ prefix).`
    );
  }
}

export async function insertWhatsAppSiteContact(row) {
  requireEnv("REACT_APP_SUPABASE_URL", SUPABASE_URL);
  requireEnv("REACT_APP_SUPABASE_ANON_KEY", SUPABASE_ANON_KEY);

  const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/whats_app_site_contact`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Supabase insert failed (${res.status} ${res.statusText})${text ? `: ${text}` : ""}`
    );
  }

  return true;
}



