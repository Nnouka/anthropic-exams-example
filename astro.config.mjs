import { defineConfig } from 'astro/config';

// On GitHub Actions, GITHUB_REPOSITORY is "owner/name"; derive the Pages URL from it.
const [owner, name] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isUserSite = name === `${owner}.github.io`;

export default defineConfig({
  site: owner ? `https://${owner}.github.io` : undefined,
  base: name && !isUserSite ? `/${name}` : '/',
});
