# The Prompt Ladder

## Task

Create a small account settings form for a React and TypeScript capstone project.

This ladder shows how one weak request becomes a reusable engineering prompt. Each version keeps the previous wording and adds exactly one named layer.

## Run 1 — Weak baseline

### Prompt

> Build a settings form.

### Representative output

> Here is a basic React component with three inputs and a save button. The component stores values in local state and prints them to the console when the form is submitted.

```tsx
export default function SettingsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return <form>{/* inputs */}</form>;
}
```

### Notes

- **What changed in the prompt:** Nothing; this is the genuinely weak baseline.
- **What improved in the output:** Nothing yet. It produced code quickly, but the result was generic and incomplete.
- **What still failed:** No clear purpose, validation, accessibility requirements, project conventions, error behavior, or verification.
- **What I would try next:** State exactly what the form must allow a user to do.

## Run 2 — Layer added: clearer goal

### Prompt

> Build a settings form that lets a signed-in user update their display name and email address, validates both fields, and shows whether saving succeeded or failed.

### Representative output

> The form now includes display-name and email fields, required-field checks, an email-format check, and success and error messages after submission.

```tsx
const emailIsValid = /^\S+@\S+\.\S+$/.test(email);
if (!displayName.trim() || !emailIsValid) {
  setStatus("error");
  return;
}
```

### Notes

- **What changed in the prompt:** Added one clearer, testable goal.
- **What improved in the output:** The generated component stopped inventing unrelated fields and added observable success, failure, and validation behavior.
- **What still failed:** The code assumed a generic user and used labels and feedback that would not necessarily work well for the intended user.
- **What I would try next:** Define the audience.

## Run 3 — Layer added: defined audience

### Prompt

> Build a settings form that lets a signed-in user update their display name and email address, validates both fields, and shows whether saving succeeded or failed. The audience is non-technical users using the product on desktop or mobile.

### Representative output

> The revised UI uses plain-language labels, short helper text, a visible “Save changes” action, and confirmation text that avoids technical terminology.

```tsx
<p className={styles.helperText}>
  We will use this address for account notifications.
</p>
```

### Notes

- **What changed in the prompt:** Added only the intended audience.
- **What improved in the output:** The wording became clearer and stopped exposing implementation terms such as “request failed” and “payload.”
- **What still failed:** This did not materially improve the component architecture or validation logic. It also added extra helper text that made the small form feel more crowded on mobile.
- **What I would try next:** Supply the real project context so the code fits the repository instead of only improving the copy.

## Run 4 — Layer added: real context

### Prompt

> Build a settings form that lets a signed-in user update their display name and email address, validates both fields, and shows whether saving succeeded or failed. The audience is non-technical users using the product on desktop or mobile. This is a React and TypeScript project built with Vite; components use named exports, strict types, semantic HTML, accessible labels, and CSS Modules as documented in `CLAUDE.md`.

### Representative output

> The component now uses a named export, an explicit `SettingsFormProps` type, semantic form markup, associated labels, an `aria-live` status region, and a co-located CSS Module.

```tsx
export type SettingsFormProps = {
  initialValues: SettingsValues;
  onSave: (values: SettingsValues) => Promise<void>;
};

export function SettingsForm({ initialValues, onSave }: SettingsFormProps) {
  // ...
}
```

### Notes

- **What changed in the prompt:** Added only the repository's actual technical and accessibility context.
- **What improved in the output:** The code stopped using a default export and inline styles, introduced strict prop types, and added accessible status announcements consistent with the project rules.
- **What still failed:** The answer mixed explanation, component code, styles, and usage notes in one long block, making it hard to apply safely.
- **What I would try next:** Specify the output structure.

## Run 5 — Layer added: specified output format

### Prompt

> Build a settings form that lets a signed-in user update their display name and email address, validates both fields, and shows whether saving succeeded or failed. The audience is non-technical users using the product on desktop or mobile. This is a React and TypeScript project built with Vite; components use named exports, strict types, semantic HTML, accessible labels, and CSS Modules as documented in `CLAUDE.md`. Return the result in four sections: assumptions, file tree, complete contents of each new file, and a short manual test checklist.

### Representative output

> **Assumptions:** An authenticated user and an async save function are provided by the parent.
>
> **File tree:**
> `src/components/settings-form/settings-form.tsx`
> `src/components/settings-form/settings-form.module.css`
> `src/components/settings-form/settings-form.test.tsx`
>
> **Manual checks:** Submit invalid email, retry after a failed save, tab through every control, and confirm the status message is announced.

### Notes

- **What changed in the prompt:** Added only a required response format.
- **What improved in the output:** The answer became scannable and implementation-ready; assumptions were separated from code and every proposed file was named explicitly.
- **What still failed:** The response proposed tests but did not prove that they passed or that the implementation built successfully.
- **What I would try next:** Require verification and reporting of actual results.

## Run 6 — Layer added: verification requirements

### Prompt

> Build a settings form that lets a signed-in user update their display name and email address, validates both fields, and shows whether saving succeeded or failed. The audience is non-technical users using the product on desktop or mobile. This is a React and TypeScript project built with Vite; components use named exports, strict types, semantic HTML, accessible labels, and CSS Modules as documented in `CLAUDE.md`. Return the result in four sections: assumptions, file tree, complete contents of each new file, and a short manual test checklist. After implementation, run the available lint, type-check, test, and build scripts; report each command and result, and do not claim success for any command you could not run.

### Representative output

> **Verification**
>
> - `npm run lint` — passed
> - `npm run typecheck` — passed
> - `npm test -- settings-form` — 5 tests passed
> - `npm run build` — passed
>
> The tests cover required values, invalid email, successful save, failed save, and disabling the submit button while saving. No unverified command is reported as successful.

### Notes

- **What changed in the prompt:** Added only explicit verification requirements.
- **What improved in the output:** The final response distinguished generated code from verified behavior and supplied evidence for validation, async states, and build compatibility.
- **What still failed:** Visual behavior at very narrow mobile widths still needs a human check because automated scripts do not prove that the layout looks correct.
- **What I would try next:** Perform the manual checklist in a browser and record any responsive-layout issue.

## Side-by-side conclusion

The baseline returned the fastest answer but required the most interpretation and review. Adding a clearer goal produced the largest functional improvement. Defining the audience improved language but did not improve the engineering and made the mobile UI slightly more crowded; this was the least useful step by itself. Project context removed several convention and accessibility mistakes. The output format made the response easier to apply, while verification requirements turned an apparently complete answer into one supported by evidence.

## Final reusable prompt

```text
Build a [feature] that lets [user type] complete [specific goal], including [required success, validation, loading, empty, and error behaviors].

The audience is [defined audience and usage context]. This project uses [framework, language, and relevant libraries]. Follow the conventions in [rules file or referenced files], including [typing, component, styling, and accessibility expectations].

Return the result in four sections:
1. Assumptions
2. Proposed file tree
3. Complete contents of each new or changed file
4. A short manual test checklist

After implementation, run the available lint, type-check, test, and build scripts. Report each command and its actual result. Do not claim that a check passed if you could not run it, and clearly identify anything that still requires human verification.
```
