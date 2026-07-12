// Serverless function to return GitHub contribution calendar as an SVG.
// Deploy to Vercel/Netlify as a serverless function. Requires GITHUB_TOKEN env var.

module.exports = async (req, res) => {
  const user = (req.query.user || req.query.username || 'pradhankiran400-dotcom').toString();
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    // Fallback: proxy a public SVG provider (ghchart.rshah.org) so the site still shows a graph
    try {
      const fallbackUrl = `https://ghchart.rshah.org/${encodeURIComponent(user)}`;
      const r = await fetch(fallbackUrl);
      const svg = await r.text();
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 's-maxage=3600, max-age=300');
      res.statusCode = 200;
      res.end(svg);
      return;
    } catch (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('GITHUB_TOKEN missing and fallback failed: ' + String(err));
      return;
    }
  }

  const query = `query($login:String!){ user(login:$login){ contributionsCollection{ contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount color } } } } } }`;

  try {
    const r = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify({ query, variables: { login: user } })
    });
    const j = await r.json();
    if (j.errors) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(j.errors));
      return;
    }

    const weeks = j.data.user.contributionsCollection.contributionCalendar.weeks || [];
    const weeksCount = weeks.length;
    const cell = 12; // cell size
    const gap = 3; // gap between cells
    const width = weeksCount * (cell + gap) + 10;
    const height = 7 * (cell + gap) + 10;

    // Build SVG calendar
    let svg = `<?xml version="1.0" encoding="UTF-8"?>`;
    svg += `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>`;
    svg += `<rect width='100%' height='100%' fill='transparent'/>`;

    for (let wi = 0; wi < weeksCount; wi++) {
      const week = weeks[wi];
      const days = week.contributionDays || [];
      for (let di = 0; di < days.length; di++) {
        const day = days[di];
        const col = day.color || '#ebedf0';
        const x = 5 + wi * (cell + gap);
        const y = 5 + di * (cell + gap);
        const title = `${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'}`;
        svg += `<rect x='${x}' y='${y}' width='${cell}' height='${cell}' rx='2' ry='2' fill='${col}'><title>${title}</title></rect>`;
      }
    }

    svg += `</svg>`;

    res.setHeader('Content-Type', 'image/svg+xml');
    // Cache for 5 minutes in browser, 1 hour on CDN
    res.setHeader('Cache-Control', 's-maxage=3600, max-age=300');
    res.statusCode = 200;
    res.end(svg);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error fetching GitHub contributions: ' + String(err));
  }
};
