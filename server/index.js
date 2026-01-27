const fastify = require('fastify')({ logger: true });
const puppeteer = require('puppeteer');

// Enable CORS so your Next.js app can talk to this API
fastify.register(require('@fastify/cors'), { origin: '*' });

/**
 * Automated Scoring Logic
 * Weights: SEO (40%), Security (20%), Performance (20%), Social (20%)
 */
function generateGrade(audit) {
  let score = 0;

  // 1. SEO Scoring (Max 40 points)
  if (audit.title && audit.title.length > 10) score += 15;
  if (audit.metaDescription) score += 15;
  if (audit.h1Count === 1) score += 10; // Exactly one H1 is best practice

  // 2. Security (Max 20 points)
  if (audit.isHttps) score += 20;

  // 3. Performance (Max 20 points)
  if (audit.loadTime < 1500) score += 20;
  else if (audit.loadTime < 3000) score += 10;

  // 4. Social Readiness (Max 20 points)
  if (audit.hasOgImage) score += 20;

  // Map Score to Letter Grade
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

fastify.post('/api/generate-snapshot', async (request, reply) => {
  const { businessUrl } = request.body;
  if (!businessUrl) return reply.code(400).send({ error: 'URL is required' });

  const startTime = Date.now();
  
  // Puppeteer settings optimized for Docker (ARM/AMD64)
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox', 
      '--disable-setuid-sandbox', 
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  try {
    const page = await browser.newPage();
    const targetUrl = businessUrl.startsWith('http') ? businessUrl : `https://${businessUrl}`;
    
    // Visit the site
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Extract Audit Data
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
    const finalAudit = { ...audit, loadTime };
    const grade = generateGrade(finalAudit);

    await browser.close();

    // Return the professional report
    return {
      url: targetUrl,
      grade: grade,
      scoreDetails: {
        seo: audit.h1Count > 0 && audit.metaDescription ? 'Pass' : 'Improvement Needed',
        security: audit.isHttps ? 'Secure' : 'Unsecured',
        performance: `${loadTime}ms`,
        social: audit.hasOgImage ? 'Ready' : 'Missing Tags'
      },
      recommendation: grade === 'A' ? 'Great job! Maintain your lead.' : 'Significant opportunities found for digital optimization.',
      timestamp: new Date().toISOString()
    };

  } catch (err) {
    await browser.close();
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Failed to audit the site. Is the URL correct?' });
  }
});

// Start Server
fastify.listen({ port: 5000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
