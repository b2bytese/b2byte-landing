import { describe, it, expect } from "vitest";
import { createRateLimiter, extractClientIp } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("permite até N requisições dentro da janela e bloqueia a (N+1)-ésima", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, limit: 3, maxEntries: 100 });
    const t0 = 1_000;

    expect(limiter.check("1.2.3.4", t0)).toBe(true);
    expect(limiter.check("1.2.3.4", t0 + 100)).toBe(true);
    expect(limiter.check("1.2.3.4", t0 + 200)).toBe(true);
    expect(limiter.check("1.2.3.4", t0 + 300)).toBe(false);
    expect(limiter.check("1.2.3.4", t0 + 60_001)).toBe(true);
  });

  it("remove entradas expiradas para evitar vazamento de memória", () => {
    const limiter = createRateLimiter({ windowMs: 1_000, limit: 5, maxEntries: 100 });

    limiter.check("10.0.0.1", 1_000);
    limiter.check("10.0.0.2", 1_000);
    expect(limiter.size()).toBe(2);

    limiter.check("10.0.0.3", 2_500);
    expect(limiter.size()).toBe(1);
  });

  it("respeita maxEntries removendo entradas antigas quando o limite é atingido", () => {
    const limiter = createRateLimiter({ windowMs: 60_000, limit: 5, maxEntries: 2 });

    limiter.check("10.0.0.1", 1_000);
    limiter.check("10.0.0.2", 1_010);
    limiter.check("10.0.0.3", 1_020);

    expect(limiter.size()).toBe(2);
  });
});

describe("extractClientIp", () => {
  it("prioriza x-real-ip sobre x-forwarded-for e retorna unknown quando ausente", () => {
    const withRealIp = new Headers({
      "x-real-ip": " 203.0.113.10 ",
      "x-forwarded-for": "198.51.100.1, 198.51.100.2",
    });
    expect(extractClientIp(withRealIp)).toBe("203.0.113.10");

    const withCfIp = new Headers({
      "cf-connecting-ip": "198.51.100.9",
      "x-forwarded-for": "198.51.100.1",
    });
    expect(extractClientIp(withCfIp)).toBe("198.51.100.9");

    const withForwardedOnly = new Headers({
      "x-forwarded-for": "198.51.100.1, 198.51.100.2",
    });
    expect(extractClientIp(withForwardedOnly)).toBe("198.51.100.2");

    expect(extractClientIp(new Headers())).toBe("unknown");
  });
});
