export const normalizePhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("8") && digits.length === 11) {
    return `7${digits.slice(1)}`;
  }

  if (digits.startsWith("7") && digits.length === 11) {
    return digits;
  }

  return digits;
};

export const createChatId = (phone: string): string => {
  const normalizedPhone = normalizePhone(phone);

  return `${normalizedPhone}@c.us`;
};
