export interface Lead {
    id: number;
    domain: string;
    score: number;
    status: 'New' | 'Contacted' | 'Converted';
    lastAction: string;
    contactInfo: {
        email?: string;
        phone?: string;
    };
}

export const MOCK_LEADS: Lead[] = [
    {
        id: 1,
        domain: 'acme-landscaping.com',
        score: 45,
        status: 'New',
        lastAction: 'Audit Generated 2h ago',
        contactInfo: { email: 'info@acme.com', phone: '555-0123' }
    },
    {
        id: 2,
        domain: 'bistro-deluxe.org',
        score: 58,
        status: 'Contacted',
        lastAction: 'Email Sent 1d ago',
        contactInfo: { email: 'manager@bistro.org' }
    },
    {
        id: 3,
        domain: 'tech-startups.net',
        score: 92,
        status: 'Converted',
        lastAction: 'Signed Contract 3d ago',
        contactInfo: { phone: '555-9876' }
    },
    {
        id: 4,
        domain: 'local-plumber.com',
        score: 30,
        status: 'New',
        lastAction: 'Audit Generated 5m ago',
        contactInfo: { email: 'admin@plumber.com' }
    },
    {
        id: 5,
        domain: 'city-bakery.com',
        score: 65,
        status: 'Contacted',
        lastAction: 'Called 2d ago',
        contactInfo: { email: 'orders@city-bakery.com', phone: '(555) 555-5555' }
    }
];
