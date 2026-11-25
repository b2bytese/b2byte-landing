export interface RateLimiterOptions {
  windowMs: number;
  limit: number;
  maxEntries: number;
}

export interface RateLimiter {
  check(key: string, now?: number): boolean;
  clear(): void;
  size(): number;
}

export function createRateLimiter({
  windowMs,
  limit,
  maxEntries,
}: RateLimiterOptions): RateLimiter {
  const entries = new Map<string, { count: number; reset: number }>();

  function pruneExpired(now: number) {
    for (const [k, entry] of entries) {
      if (now > entry.reset) {
        entries.delete(k);
      }
    }
  }

  return {
    check(key: string, now = Date.now()): boolean {
      pruneExpired(now);

      const entry = entries.get(key);
      if (!entry) {
        while (entries.size >= maxEntries) {
          const oldestKey = entries.keys().next().value;
          if (oldestKey === undefined) break;
          entries.delete(oldestKey);
        }
        entries.set(key, { count: 1, reset: now + windowMs });
        return true;
      }

      if (entry.count >= limit) {
        return false;
      }

      entry.count++;
      return true;
    },
    clear() {
      entries.clear();
    },
    size() {
      return entries.size;
    },
  };
}

export function extractClientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cfIp = headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const ips = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const rightmost = ips.at(-1);
    if (rightmost) return rightmost;
  }

  return "unknown";
}
