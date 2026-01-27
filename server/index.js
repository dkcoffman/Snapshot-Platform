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
      return {
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content,
        h1Count: document.querySelectorAll('h1').length,
        isHttps: window.location.protocol === 'https:',
        hasOgImage: !!document.querySelector('meta[property="og:image"]'),
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
    await fastify.listen({ port: 5000, host: '0.0.0.0' });
    console.log('--- Mac-Native Audit Engine Live on Port 5000 ---');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
