import { cn } from "@/lib/utils";

const ASCII_ART = `+---=========XXXXXXXXX==-++             ++++++                                                        XX==-+                              ++++++
+----=======XXXXXXXXXX==-++                              ++                                           XXX=-+                             ++++++++
+------====XXXXXXXXXXXX=-++                             +++                                           XXX=-+:                            +++----+++
++-------===XXXXXXXXXXX=--+                             +++                                           XXX=-++                            ++-------++           +
+++++-----==XXXXXXXXXXX=--+                             ++-                                           XX==-++                            ++---=----++++    +++++
++++++++---==XXXXXXXXXX=--+                             +--                                           XX==-++                            ++--====----+++++++----
++++++++++--==XXXXXXXXX=--+                             +--                                           X==--+                             ++--======----------==-
+++:     ++--==XXXXXXX==-++                             +--                                           ==--++                             ++--===================
+++       ++--===XXX===--++                             +--                                           ---++                              ++--============XXXXXXX
++          ++--=====---++                              +--                                           ++++                               :+---=========XXXXXXXXX
++           +++------+++                               +--                                           +                                  ++----=======XXXXXXXXXX
-+             ++++++++                                 ++-                                                       +++++                  +++------====XXXXXXXXXX
-+                                ++                    ++-                                                      ++++++++                +++--------===XXXXXXXXX
-+                              +++++++                 ++-                                                      +++----++              :++++++------===XXXXXXXX
-+                              +++--+++               ++++                                                      ++-------++           +++++++++++++--==XXXXXXXX
-+                             ++------+++            +++++                                                      +---===---+++       +++++++++++++++++--==XXXXXX
-+                             ++---=----++         +++++++                                                      +--======---+++++++++----++++       ++--==XXXXX
-+                             ++--=====---++++++++++++++++                                                      +--========---------------++:        ++--======
-+                             ++-=======-----+++--------++                                                      +--=====================--++           ++------
++                             ++-==========------====---++                                                      +--===============XXX====-++            ++++--+
++                             ++-======================--+                                                      +--===========XXXXXXXXX==--+               ++++
+                              ++-=============XXXXXXX==--+                                                      +---=========XXXXXXXXXXX=--+
                               ++--=========XXXXXXXXXXX==-+                                                      ++---========XXXXXXXXXXX==-+
                               ++--=========XXXXXXXXXXX==-+                                                      ++------======XXXXXXXXXX==-+
         +++++                 ++----========XXXXXXXXXXX=-+:                             +++---+++              +++---------===XXXXXXXXXX==-+
        ++++++++               ++---------===XXXXXXXXXXX=-++                             ++------+++           +++++++++++----==XXXXXXXXX==-+
       ++------++             ++++----------==XXXXXXXXXX=-++                            ++--====---++        :+++++++++++++++--==XXXXXXXX=--+
       ++---==---++          +++++++++++++---==XXXXXXXX==-+:                            ++--======---++++++++++++++++++     +++--==XXXXX==-++
       +--======--++++    +++++++++++++::+++--===XXXXXX=--+                             ++-=========--------------++++        ++--=======--++
       +--=======----++++++------+++:       ++--===XX===--+                             ++-===XXX=====------===----++          +++---==---++
       +--==XXX====--------------+++         ++---====---++                             ++-===XXXXX==============--++            +++----+++
       +--==XXXXX==============--++            ++------+++                              ++-===XXXXXX====XXXXXXX==--++              ++++++
       +--==XXXXXX========XX====-++              ++++++++                               ++--===XXXXXXXXXXXXXXXXX==-++                                :+
       +--===XXXXXXXXXXXXXXXXX==--+                                                     ++--=========XXXXXXXXXXX==-++                              +++++++
       +--=========XXXXXXXXXXXX=--+                               ++++++                ++---=========XXXXXXXXXXX=-++                             +++----+++    `;

export function AsciiBackground({
  opacity = 0.18,
  className,
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <pre
      aria-hidden="true"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-[-1] select-none",
        "text-[var(--color-accent)] whitespace-pre",
        className
      )}
      style={{
        fontFamily: `var(--font-mono),'IBM Plex Mono',monospace`,
        fontSize: "clamp(7px,0.76vw,12px)",
        lineHeight: 1.14,
        letterSpacing: "0.06em",
        opacity,
        maskImage: "linear-gradient(transparent,#000 22%,#000 75%,transparent)",
      }}
    >
      {ASCII_ART}
    </pre>
  );
}
