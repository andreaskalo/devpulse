const baseURL = "https://api.github.com";

async function getRepository(owner, repo) {
  const requestURL = `${baseURL}/repos/${owner}/${repo}`;

  const response = await fetch(requestURL, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
      "User-Agent": "DevPulse",
    },
  });

  if (!response.ok) {
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  const {
    owner: { login },
    name,
    html_url,
    forks_count,
    stargazers_count,
    description,
    open_issues_count,
    language,
  } = data;

  return {
    owner: login,
    name: name,
    url: html_url,
    forks: forks_count,
    tars: stargazers_count,
    description: description,
    open_issues_count: open_issues_count,
    anguage: language,
  };
}

async function getRepoCommits(owner, repo, page, per_page) {
  const requestURL = `${baseURL}/repos/${owner}/${repo}/commits?page=${page}&per_page=${per_page}`;
  const response = await fetch(requestURL, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
      "User-Agent": "DevPulse",
    },
  });

  if (!response.ok) {
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  const commits = data.map((item) => {
    return {
      sha: item.sha,
      message: item.commit.message,
      author_name: item.commit.author.name,
      author_username: item.author?.login ?? null,
      date: item.commit.author.date,
      url: item.html_url,
    };
  });

  return commits;
}

async function getRepoContributors(owner, repo, page, perPage) {
  const requestURL = `${baseURL}/repos/${owner}/${repo}/contributors?page=${page}&per_page=${perPage}`;

  const response = await fetch(requestURL, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
      "User-Agent": "DevPulse",
    },
  });

  if (!response.ok) {
    const error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();

  const mappedData = data.map((user) => {
    return {
      username: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
      contributions: user.contributions,
    };
  });

  return mappedData;
}

export { getRepository, getRepoCommits, getRepoContributors };
