function getGitHubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2026-03-10",
    "User-Agent": "DevPulse",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };
}

export default getGitHubHeaders;
