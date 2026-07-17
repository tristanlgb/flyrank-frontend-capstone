# AI Development Guide

## Project

This repository contains the frontend capstone for the FlyRank Frontend AI Engineering track.

## Stack

- Node.js LTS
- React
- TypeScript with strict type checking
- Vite
- CSS Modules for component styles
- Vitest and Testing Library for tests
- ESLint and Prettier for code quality

## Conventions

- Use functional React components and named exports.
- Keep components small, accessible, and focused on one responsibility.
- Prefer semantic HTML; support keyboard navigation and visible focus states.
- Avoid `any`; define explicit types for component props and API data.
- Place reusable components in `src/components` and feature code in `src/features`.
- Co-locate component tests and styles with the component.
- Use lowercase kebab-case for file names and PascalCase for component names.
- Never commit secrets. Document required variables in `.env.example`.

## Git workflow

- Follow Conventional Commits 1.0.0: `type(scope): description`.
- Use common types such as `feat`, `fix`, `docs`, `test`, `refactor`, and `chore`.
- Keep commits focused and write descriptions in the imperative mood.

## Before finishing a task

Run the available lint, type-check, test, and build scripts. Update documentation when behavior or setup changes.
