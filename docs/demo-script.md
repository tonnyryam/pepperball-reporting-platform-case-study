# Two-minute demo script

Follow the seven-section site order: users; reporting outputs; operational workflow; chatbot/report doctor/governed oracle; value and assumptions; technical foundation; evidence. Demonstrate one source-grounded retrieval with citation/fallback, one read-only doctor diagnostic, and one oracle refusal before opening the workbook or repository. Do not repeat artifact links or imply autonomous decisions.

## Opening - 15 seconds

This is a synthetic model of the reliability controls I built around a scheduled
manufacturing reporting workflow. It contains no production connection or data.

## System - 25 seconds

Walk left to right: source evidence becomes normalized facts, then a durable
expected-output obligation. A deterministic report is published only when its
governed material identity is new, and every accepted write is verified by exact
readback.

## Failure scenarios - 60 seconds

1. Start with a missing source. The obligation stays pending with zero writes.
2. Add late qualified evidence. The same canonical output advances once.
3. Replay equivalent evidence with a different capture marker. Material identity
   remains the same, so the cycle is a no-op.
4. Simulate an accepted write whose response is lost. The engine retains the
   candidate and performs GET-only settlement with no second PUT.
5. Attempt a second writer lease. It is refused until the first owner releases.

## Close - 20 seconds

The core lesson is that self-healing needs explicit limits. It should recover
technical gaps, but it must not invent missing facts, bypass protected ownership,
or turn network ambiguity into extra write authority.
