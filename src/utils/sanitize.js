/**
 * Client-side input sanitization & validation helpers
 * Supports Arabic-Indic numerals (٠-٩) and standard international formats
 */

const ARABIC_DIGIT_MAP = {
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
};

export function normalizeDigits(value = '') {
  if (typeof value !== 'string') return '';
  return value.replace(/[٠-٩۰-۹]/g, (d) => ARABIC_DIGIT_MAP[d] ?? d);
}

export function sanitizeText(value = '', maxLength = 120) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\u0000-\u001F\u007F<>]/g, '')
    .slice(0, maxLength);
}

export function sanitizePhoneInput(value = '') {
  if (typeof value !== 'string') return '';
  const normalized = normalizeDigits(value);
  return normalized.replace(/[^\d+\s-]/g, '').slice(0, 16);
}

export function isValidSaudiPhone(phone = '') {
  const normalized = normalizeDigits(phone).replace(/[\s-]/g, '');
  if (!normalized) return true; // Optional unless supplied
  return /^(05\d{8}|5\d{8}|(\+?966|00966)5\d{8})$/.test(normalized);
}
