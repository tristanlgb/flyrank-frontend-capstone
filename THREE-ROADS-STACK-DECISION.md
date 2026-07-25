# Three Roads: Portfolio Stack Decision

## My real constraints

- **Budget:** The tools and hosting must be free.
- **Skill level:** I am comfortable with React and TypeScript and have some experience with NestJS and MongoDB. I do not have professional experience with .NET or PHP.
- **Portfolio goal:** Show a hiring manager that I can build maintainable frontend interfaces, explain my decisions, and review AI-assisted work. The site needs four sections: Home, Work, About, and Contact.
- **How the work must appear:** The Work section needs screenshots or small image galleries, readable case studies, links to live demos, and links to GitHub repositories.
- **Dynamic features:** Not yet. The first version does not need accounts, a database, a CMS, or a custom backend. Project information can live in the code.

## Three options I considered

### 1. Static HTML and CSS on GitHub Pages

I could build one small static site with HTML, CSS, and a little JavaScript, store it in GitHub, and publish it with GitHub Pages for free. It would not need a backend.

This is the simplest option and would be fast to publish. It can display text, screenshots, and links without a problem. The trade-off is that it does not show React or TypeScript, which are the main skills I want the portfolio to prove. Repeating case-study markup would also become harder to maintain as I add projects.

### 2. React, TypeScript, and Vite on Vercel

I could build the portfolio as a small React application, use TypeScript for clear component contracts, and use Vite for a lightweight development setup. Vercel can host it for free. It does not need a backend yet; case studies can be typed data rendered by reusable components.

This option matches my current skills and the job I want. It supports responsive image galleries, long-form case studies, demo links, repository links, and a clear contact action. The trade-off is that it requires more setup than plain HTML and I still need to maintain dependencies, accessibility, and deployment settings.

### 3. Next.js and TypeScript on Vercel

I could use Next.js with TypeScript and deploy it to Vercel. It could provide separate routes, metadata, image optimization, server rendering, and an easy path to APIs or a CMS later. A backend would still not be required for the first version.

This is the most powerful option, but most of that power is unnecessary today. I would maintain framework conventions, server/client component decisions, and a larger dependency surface. It could show my work well, but it would add learning and debugging time without improving the first portfolio enough.

## Pressure test

If I choose the simplest option, the site can be finished quickly, but it weakens my React and TypeScript claim. If I choose the most powerful option, I must maintain features and conventions that the portfolio does not currently need. React with Vite fits within a two-week build because I already understand the core stack and can keep the sitemap small. It also displays my work properly: screenshots, detailed case studies, live demos, repositories, and repeated contact calls to action.

## My decision

I chose **React, TypeScript, Vite, and Vercel**. I did not choose plain HTML because the portfolio should demonstrate the frontend stack I want to be hired for. I did not choose Next.js because its additional capabilities do not solve a current requirement.

I can maintain the chosen stack because it is close to what I already know, the architecture can stay small, and there is no backend to operate. It shows my work well without turning the portfolio itself into a bigger project than the work it is supposed to present. If I later need authenticated content, a CMS, or stored contact submissions, I can reconsider a backend then—not yet.
