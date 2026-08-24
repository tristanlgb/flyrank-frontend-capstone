# Capstone Reflection



My name is Tristan Lenzberg, and I am a Full Stack Developer student. At the
start of this course, I wanted to grow as a developer, but I did not believe I
could improve very much in artificial intelligence. AI felt like a specialized
field outside my usual frontend and backend work. This course changed that
view: I learned that improving with AI means asking better questions, setting
clear boundaries, testing the results, and making the final decisions myself.

The hardest part of the capstone was not producing the interface. It was keeping the visible
experience, the server contract, the tests, and the documentation consistent
while the project evolved from separate assignments into one portfolio. A
generated interface can look complete while the client sends the wrong field,
the server expects another shape, the public deployment lacks a credential, or
the README still describes an older screen. The work became credible only when
I treated those boundaries as part of the product.

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

At first, I thought the objective was to produce a polished site that collected
my assignments and projects. What changed was my definition of
“finished.” A page is not finished because it renders or because an AI tool can
describe it convincingly. It is finished enough to share when another person
can understand the claim, follow the links, reproduce the setup, test the
important path, and see its limitations.
That shift turned the portfolio from a class artifact into a small operational
product.

Three lessons are especially transferable. First, define the contract before
optimizing the presentation. The message-shape bug showed how easily two valid
pieces can fail at their boundary. Writing the expected input, output, failure
states, and evidence first makes both human and AI-assisted implementation more
reliable. Second, test the public experience rather than trusting the local
one. A passing build did not prove that metadata, deployment aliases, external
links, responsive layout, or the server function worked in production. The
most useful checks followed the same path a reviewer would follow. Third,
documentation is part of the implementation. Keeping the README, architecture,
evaluation results, limitations, and live URLs current made gaps visible and
prevented the polished interface from overstating what had actually been
verified.

AI changed how quickly I could explore options, review drafts, generate test
cases, and identify weak assumptions. It did not remove the need for judgment.
I rejected suggestions that added visual noise, kept real screenshots where a
generated image would weaken the proof, and verified proposed code through
tests, type checking, accessibility tools, production requests, and Git diffs.
The most valuable use of AI was not producing more output; it was creating a
faster critique-and-verification loop while I remained responsible for the
final decision.

If I build a second version, I would make the evidence model visible inside the
portfolio instead of leaving most of it in repository documentation. Each case
study could expose a compact panel with its live URL, source, latest automated
checks, accessibility result, known limitation, and last verified date. I would
also replace the in-memory rate limiter with a shared store, add stronger tests
for streaming cancellation and WebGL lifecycle behavior, verify the experience
on real Safari and Firefox devices, and configure a production model key only
after adding appropriate usage monitoring.

In Week 1, I was unsure whether AI was a skill I could genuinely develop. I now
have proof that I can use it deliberately: decide what it should do, verify
what it produces, explain the system, and state where the product still stops.
More importantly, I gained the confidence to keep learning. That is the working
habit I want to carry into my next Full Stack projects.
