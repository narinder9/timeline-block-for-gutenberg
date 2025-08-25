export const allowedUnits = ['px', 'em', 'rem', '%'];

export function sanitizeNumber(value, { min = 0, max = 1000, allowFloat = true } = {}) {
  const num = allowFloat ? Number(value) : parseInt(value, 10);
  if (!Number.isFinite(num)) return null;
  const clamped = Math.max(min, Math.min(max, num));
  return clamped;
}

export function sanitizeUnit(unit) {
  return allowedUnits.includes(unit) ? unit : null;
}

export function withUnit(value, unit, limits) {
  const n = sanitizeNumber(value, limits);
  const u = sanitizeUnit(unit);
  if (n === null || !u) return '';
  return `${n}${u}`;
}

export function sanitizeColor(value) {
  if (typeof value !== 'string') return '';
  const v = value.trim();
  const hex = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
  const rgb = /^rgb\(\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*\)$/i;
  const rgba = /^rgba\(\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:[01]?\d?\d|2[0-4]\d|25[0-5])\s*,\s*(?:0|1|0?\.\d+)\s*\)$/i;
  const hsl = /^hsl\(\s*(?:[0-2]?\d?\d|3[0-5]\d)\s*,\s*(?:\d{1,2}|100)%\s*,\s*(?:\d{1,2}|100)%\s*\)$/i;
  const hsla = /^hsla\(\s*(?:[0-2]?\d?\d|3[0-5]\d)\s*,\s*(?:\d{1,2}|100)%\s*,\s*(?:\d{1,2}|100)%\s*,\s*(?:0|1|0?\.\d+)\s*\)$/i;
  return (hex.test(v) || rgb.test(v) || rgba.test(v) || hsl.test(v) || hsla.test(v)) ? v : '';
}

export function sanitizeFontFamily(value) {
  if (typeof value !== 'string') return '';
  // Allow letters, digits, spaces, hyphens and commas. Strip quotes to avoid breaking quote-wrapping.
  const cleaned = value.replace(/['"]/g, '').match(/[a-zA-Z0-9 ,\-]+/g);
  const v = cleaned ? cleaned.join('').trim() : '';
  return v.length > 60 ? v.slice(0, 60) : v;
}

export function sanitizeFontWeight(value) {
  if (typeof value === 'number' && value % 100 === 0 && value >= 100 && value <= 900) return String(value);
  const v = String(value || '').toLowerCase();
  const allowed = new Set(['normal', 'bold', '100','200','300','400','500','600','700','800','900']);
  return allowed.has(v) ? v : '';
}

export function sanitizeKeyword(value, allowed) {
  const v = String(value || '').toLowerCase().trim();
  return allowed.includes(v) ? v : '';
}

// Sanitize Google Font subset tokens (e.g., latin, latin-ext, cyrillic)
// - Lowercase, trim
// - Allow only [a-z0-9-]
// - Truncate to a reasonable max length
export function sanitizeFontSubset(value) {
  if (typeof value !== 'string') return '';
  const v = value.toLowerCase().trim();
  const cleaned = v.replace(/[^a-z0-9\-]/g, '');
  return cleaned.length > 30 ? cleaned.slice(0, 30) : cleaned;
}