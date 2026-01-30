export interface Product {
    id: string;
    title: string;
    description: string;
    category: 'AI Workforce' | 'Digital Presence' | 'Advertising';
    price: string;
    triggerCondition?: (scoreDetails: any) => boolean;
}

export const products: Product[] = [
    {
        id: 'seo-fix',
        title: 'SEO Jumpstart',
        description: 'Fix H1 tags, metadata, and site structure to rank higher on Google.',
        category: 'Digital Presence',
        price: '$299',
        triggerCondition: (details) => details?.seo !== 'Pass'
    },
    {
        id: 'ai-receptionist',
        title: 'AI Receptionist',
        description: '24/7 automated answering service that books appointments for you.',
        category: 'AI Workforce',
        price: '$99/mo',
    },
    {
        id: 'social-ads',
        title: 'Managed Meta Ads',
        description: 'High-converting Facebook & Instagram campaigns managed by AI.',
        category: 'Advertising',
        price: '$499/mo',
        triggerCondition: (details) => details?.social !== 'Ready'
    },
    {
        id: 'profile-sync',
        title: 'Google Profile Sync',
        description: 'Ensure your hours, location, and photos are perfect across 50+ directories.',
        category: 'Digital Presence',
        price: '$49/mo',
        triggerCondition: (details) => details?.performance && parseInt(details.performance) > 2000
    }
];
