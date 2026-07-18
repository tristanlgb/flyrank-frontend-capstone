# Project Rules

1. Forms must use React Hook Form with a Zod schema; validation must not exist only inside submit handlers.
2. Every form control must have a visible, programmatically associated label. Related checkbox or radio controls must use `fieldset` and `legend`.
3. New form behavior must include tests for valid submission, invalid input, and asynchronous submission state.
4. Text input values must be normalized in the validation schema before reaching application code.
5. A feature is incomplete until `npm test`, `npm run typecheck`, and `npm run build` pass.
