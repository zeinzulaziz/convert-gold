// Cloudflare Worker: pemicu harian untuk workflow GitHub Actions.
// Cron Worker ini memanggil API workflow_dispatch, jadi update tidak bergantung
// pada scheduler GitHub yang sering telat/skip.
//
// Setup singkat:
//   1. cd automation/cloudflare-worker
//   2. npx wrangler login
//   3. npx wrangler secret put GH_TOKEN   (tempel fine-grained PAT: Actions: write)
//   4. npx wrangler deploy
// Detail lengkap: docs/auto-update-setup.md

const REPO = 'zeinzulaziz/convert-gold';
const WORKFLOW_FILE = 'update-gold-indonesia.yml';
const REF = 'main';

export default {
  async scheduled(event, env, ctx) {
    const url = `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GH_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'convert-gold-cron',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ref: REF }),
    });
    const body = await res.text();
    console.log(`dispatch ${res.status}: ${body}`);
    if (!res.ok) throw new Error(`dispatch gagal ${res.status}: ${body}`);
  },
};
