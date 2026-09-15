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

async function getRepoIssues(owner, repo, page, perPage) {
  const requestURL = `${baseURL}/repos/${owner}/${repo}/issues?page=${page}&per_page=${perPage}`;

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

  const mappedData = data
    .filter((issue) => !("pull_request" in issue))
    .map((issue) => {
      return {
        title: issue.title,
        issueUrl: issue.html_url,
        issueNumber: issue.number,
        issueState: issue.state,
        authorUsername: issue.user?.login ?? null,
        authorProfileUrl: issue.user?.html_url ?? null,
        authorAvatarUrl: issue.user?.avatar_url ?? null,
      };
    });

  return mappedData;
}

async function getRepoPulls(owner, repo, page, perPage, pullState) {
  const requestURL = `${baseURL}/repos/${owner}/${repo}/pulls?page=${page}&per_page=${perPage}&state=${pullState}`;

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

  const mappedData = data.map((pull) => {
    return {
      number: pull.number,
      title: pull.title,
      url: pull.html_url,
      state: pull.state,
      draft: pull.draft,

      authorUsername: pull.user?.login ?? null,
      authorProfileUrl: pull.user?.html_url ?? null,
      authorAvatarUrl: pull.user?.avatar_url ?? null,

      createdAt: pull.created_at,
      updatedAt: pull.updated_at,
      closedAt: pull.closed_at,
      mergedAt: pull.merged_at,
    };
  });

  return mappedData;
}

export {
  getRepository,
  getRepoCommits,
  getRepoContributors,
  getRepoIssues,
  getRepoPulls,
};
