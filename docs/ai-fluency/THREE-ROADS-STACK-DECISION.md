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

This is the most powerful option, and most of that power is unnecessary today. The advantage is that my live starting page already uses this stack and Vercel supports it directly. The trade-off is that I must maintain framework conventions, server/client component decisions, and a larger dependency surface. I can control that cost by keeping the first version static, using one small App Router structure, and avoiding server features until a real requirement appears.

## Pressure test

If I choose the simplest option, the site can be finished quickly, but it weakens my React and TypeScript claim. React with Vite is sufficient and has the smallest framework cost. Next.js adds conventions and server features that this portfolio does not currently need. I can finish and maintain the project more confidently with Vite while keeping it to the planned sections and avoiding authentication, a CMS, or a database unless a real requirement appears. Vite can display the required work properly: screenshots, detailed case studies, live demos, repositories, the AI mentor, and repeated contact calls to action.

## My decision

I chose **React, TypeScript, Vite, and Vercel**. In my professional and project experience, I prefer Vite because its development setup is fast, direct, and familiar to me. It lets me focus on React components, TypeScript contracts, accessibility, and product behavior without adding framework conventions that the current project does not need.

I did not choose plain HTML because the portfolio should demonstrate the frontend stack I want to use professionally. I did not choose Next.js because the current application does not require server rendering, an integrated CMS, or App Router features. Next.js remains a valid option for a future project when those requirements are real, but choosing it here would add complexity without strengthening the portfolio's main claim.

The deployed capstone now uses React, TypeScript, and Vite for the interface, with a small Vercel Function for the protected AI endpoint. This gives me the lightweight frontend workflow I prefer while still keeping API credentials and validation on the server.

