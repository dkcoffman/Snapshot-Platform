const fastify = require('fastify')({ logger: true });
const puppeteer = require('puppeteer');

// 1. Enable CORS for the Next.js Frontend
fastify.register(require('@fastify/cors'), { origin: '*' });

// 2. Automated Scoring Logic
function generateGrade(audit) {
  let score = 0;
  if (audit.title && audit.title.length > 10) score += 15;
  if (audit.metaDescription) score += 15;
  if (audit.h1Count === 1) score += 10;
  if (audit.isHttps) score += 20;
  if (audit.loadTime < 2000) score += 20;
  else if (audit.loadTime < 4000) score += 10;
  if (audit.hasOgImage) score += 20;

  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

// 3. The Audit Route
fastify.post('/api/generate-snapshot', async (request, reply) => {
  const { businessUrl } = request.body;
  if (!businessUrl) return reply.code(400).send({ error: 'URL required' });

  const targetUrl = businessUrl.startsWith('http') ? businessUrl : `https://${businessUrl}`;
  const startTime = Date.now();

  let browser;
  try {
    // Optimized for Mac/ARM64 Docker Container
    browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium',
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Use a standard Mac User Agent to prevent bot detection
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Analyze the site
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    const audit = await page.evaluate(() => {
      const getContacts = () => {
        const bodyText = document.body.innerText;
        const emails = Array.from(document.querySelectorAll('a[href^="mailto:"]')).map(a => a.href.replace('mailto:', ''));
        const phones = Array.from(document.querySelectorAll('a[href^="tel:"]')).map(a => a.href.replace('tel:', ''));

        // Simple regex fallback if no mailto/tel links
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
        const phoneRegex = /(\+?1?[-.]?\s?\(?\d{3}\)?[-.]?\s?\d{3}[-.]?\s?\d{4})/g;

        if (emails.length === 0) {
          const found = bodyText.match(emailRegex);
          if (found) emails.push(...found);
        }

        const socialLinks = Array.from(document.querySelectorAll('a')).map(a => a.href).filter(href =>
          href.includes('facebook.com') ||
          href.includes('instagram.com') ||
          href.includes('linkedin.com') ||
          href.includes('twitter.com')
        );

        return {
          emails: [...new Set(emails)].slice(0, 3), // Unique and limit to 3
          phones: [...new Set(phones)].slice(0, 3),
          socials: [...new Set(socialLinks)]
        };
      };

      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content,
        h1Count: document.querySelectorAll('h1').length,
        isHttps: window.location.protocol === 'https:',
        hasOgImage: !!document.querySelector('meta[property="og:image"]'),
        contactInfo: getContacts()
      };
    });

    const loadTime = Date.now() - startTime;
    const grade = generateGrade({ ...audit, loadTime });
    await browser.close();

    return {
      url: targetUrl,
      grade,
      scoreDetails: {
        seo: (audit.h1Count > 0 && audit.metaDescription) ? 'Pass' : 'Improvement Needed',
        security: audit.isHttps ? 'Secure' : 'Unsecured',
        performance: `${loadTime}ms`,
        social: audit.hasOgImage ? 'Ready' : 'Missing Tags'
      },
      recommendation: grade === 'A' ? 'Excellent! Optimized for search.' : 'Opportunities for optimization found.',
      contactInfo: audit.contactInfo,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    if (browser) await browser.close();
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Audit Failed', message: 'Could not analyze site.' });
  }
});

// 4. Start the Server
const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    const HOST = process.env.HOST || '0.0.0.0';
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`--- Mac-Native Audit Engine Live on Port ${PORT} ---`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
