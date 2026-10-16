# Run the two portfolio versions separately

The deployed application remains on `main`. The single-page redesign is on `redesign/single-page` and is not approved for deployment.

| Version | Branch | Development address |
| --- | --- | --- |
| Current production design | `main` | http://localhost:5173 |
| Single-page redesign | `redesign/single-page` | http://localhost:5174 |

## Preview the redesign

In the existing `/Users/bhoomika/Desktop/portfolio` checkout, confirm that the branch is `redesign/single-page`, then run:

```sh
git status --short --branch
npm ci
npm run dev
```

The redesign's `dev` script uses port 5174 with strict port checking. If that port is occupied, use the existing preview or stop that server deliberately before restarting; the script will not silently move to another port.

## Preview the production design alongside it

Create a separate worktree from the redesign checkout so switching versions does not replace files under a running server:

```sh
git fetch origin
git worktree add ../portfolio-production-preview main
cd ../portfolio-production-preview
npm ci
npm run dev -- --port 5173 --strictPort
```

If `main` already has a worktree, use that directory instead; `git worktree list` shows its location. Install dependencies independently in each checkout because the two versions have different dependency sets.

## Save work without publishing it

Commit redesign changes on `redesign/single-page` and push that branch explicitly. GitHub backup is separate from publication. Do not merge the redesign into `main` or invoke Vercel deployment until the owner requests it. Keep environment files and `.vercel/` out of Git; the repository ignore rules already cover them.

Stop a preview with Ctrl+C in the terminal running it. Before removing a worktree, stop its server and confirm its working tree is clean. No worktree needs to be removed merely to keep the other version running.
