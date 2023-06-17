/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://catchreview-client-app.vercel.app',
    generateRobotsTxt: true,
};
