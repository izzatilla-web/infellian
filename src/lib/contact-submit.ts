/* eslint-disable prettier/prettier */
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";
import { en } from "@/i18n/en";
import { ru } from "@/i18n/ru";
import { uz } from "@/i18n/uz";

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_ATTEMPTS_PER_WINDOW = 5;
const RATE_LIMIT_KEY_PREFIX = "contact-submit:";
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

const contactMessages = {
  en: en.contact,
  ru: ru.contact,
  uz: uz.contact,
} as const;

function resolveLanguage(language: string | undefined): keyof typeof contactMessages {
  return language === "ru" || language === "uz" ? language : "en";
}

function normalizeName(value: string): string {
  return value
    .replace(/\s+/g, " ")
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x1F\x7F]+/g, " ")
    .replace(/[^\p{L}\p{N}\s'’.-]/gu, " ")
    .trim();
}

function normalizePhone(value: string): string {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.startsWith("998")) {
    return (
      "+998 " +
      digitsOnly.slice(3, 5) +
      " " +
      digitsOnly.slice(5, 8) +
      " " +
      digitsOnly.slice(8, 10) +
      " " +
      digitsOnly.slice(10, 12)
    );
  }

  if (digitsOnly.length >= 9) {
    return (
      "+998 " +
      digitsOnly.slice(0, 2) +
      " " +
      digitsOnly.slice(2, 5) +
      " " +
      digitsOnly.slice(5, 7) +
      " " +
      digitsOnly.slice(7, 9)
    );
  }

  return value.trim();
}

function formatRateLimitKey(): string {
  const forwardedFor = getRequestHeader("x-forwarded-for") ?? "";
  const realIp = getRequestHeader("x-real-ip") ?? "";
  const ip = (forwardedFor.split(",")[0] || realIp || getRequestIP() || "unknown").trim();
  return `${RATE_LIMIT_KEY_PREFIX}${ip || "unknown"}`;
}

function checkRateLimit(rateLimitMessage: string): void {
  const key = formatRateLimitKey();
  const now = Date.now();
  const current = rateLimitStore.get(key) ?? { count: 0, windowStart: now };

  if (current.windowStart + RATE_LIMIT_WINDOW_MS <= now) {
    current.count = 0;
    current.windowStart = now;
  }

  if (current.count >= MAX_ATTEMPTS_PER_WINDOW) {
    throw new Error(rateLimitMessage);
  }

  current.count += 1;
  rateLimitStore.set(key, current);
}

export const submitContact = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().trim().min(2).max(80),
      phone: z.string().trim().min(9).max(30),
      website: z.string().trim().max(100).optional().default(""),
      language: z.enum(["en", "ru", "uz"]).optional().default("en"),
    }),
  )
  .handler(async ({ data }) => {
    const locale = resolveLanguage(data.language);
    const messages = contactMessages[locale];

    if (data.website && data.website.trim().length > 0) {
      throw new Error(messages.spamRejected);
    }

    const name = normalizeName(data.name);
    const phone = normalizePhone(data.phone);

    if (!name || name.length < 2) {
      throw new Error(messages.invalidName);
    }

    const phoneDigits = phone.replace(/\D/g, "");
    const isValidPhone = /^998\d{9}$/.test(phoneDigits) || /^\+?\d{9,15}$/.test(phoneDigits);
    if (!isValidPhone) {
      throw new Error(messages.invalidPhone);
    }

    checkRateLimit(messages.rateLimit);

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error(messages.configMissing);
    }

    const message = [
      messages.telegramTitle,
      `${messages.telegramName}: ${name}`,
      `${messages.telegramPhone}: ${phone}`,
      messages.telegramSource,
    ].join("\n");

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true,
        protect_content: true,
      }),
    });

    const telegramPayload = (await telegramResponse.json()) as {
      ok?: boolean;
      description?: string;
    };

    if (!telegramResponse.ok || !telegramPayload.ok) {
      throw new Error(telegramPayload.description || messages.deliveryFailed);
    }

    return { success: true };
  });
