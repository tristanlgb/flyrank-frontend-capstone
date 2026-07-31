# Capstone Reflection

The hardest part was not producing the interface. It was keeping the visible
experience, the server contract, the tests, and the documentation consistent
while the project evolved from separate assignments into one portfolio. A
generated interface can look complete while the client sends the wrong field,
the server expects another shape, the public deployment lacks a credential, or
the README still describes an older screen. The work became credible only when
I treated those boundaries as part of the product.

If I started again, I would define the final information architecture and
evidence model earlier. I originally built the portfolio milestone, shader,
mentor, workflow drill, and evidence agent as separate artifacts. That made
each assignment easier to understand, but consolidation required additional
continuity work. Next time I would keep one small production shell from the
start, add each capability behind a clear interface, and maintain one current
deployment checklist as the project changes.

The most surprising lesson was that verification often changes design
decisions rather than merely approving them. Lighthouse and axe did not just
produce scores: they showed that the accent color failed on both light and dark
surfaces, that a visually compact mobile logo had an accessible-name mismatch,
and that a missing favicon created a production console error. Similarly,
end-to-end testing exposed a client/server message-shape mismatch that unit
tests alone did not reveal.

I also learned that a fallback is useful only when its boundary is honest. The
deterministic mentor keeps the public flow available without spending API
credits or exposing a key, but it is not a substitute for a live language
model. Documenting that distinction makes the project less impressive in one
sentence and more trustworthy as a whole. The result I would carry into a team
is a simple rule: AI output is a proposal; the accepted product is the proposal
plus tests, accessibility checks, production evidence, and an explanation of
what still is not proven.
