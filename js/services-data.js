const servicesData = {
    "ai-presenter": {
        id: "ai-presenter",
        name: "AI Presenter Videos",
        heroHeadline: "Professional AI Presenter Videos That Grow Your Business",
        description: "High-converting AI presenter videos for social media, advertisements, education and product promotions.",
        rating: "4.9",
        orders: "84",
        startingPrice: "LKR 3,500",
        deliveryTime: "2 Business Days",
        icon: "🤖",
        benefits: [
            "Save Production Cost",
            "Faster Than Traditional Video Shoots",
            "Ready Within Days"
        ],
        packages: [
            { title: "1 Video", price: "LKR 3,500", delivery: "2 Business Days", costPer: "Only LKR 3,500 / Video" },
            { title: "5 Videos", price: "LKR 14,000", badge: "20% OFF", delivery: "7 Business Days", costPer: "Only LKR 2,800 / Video" },
            { title: "10 Videos", price: "LKR 25,000", badge: "29% OFF", delivery: "12 Business Days", costPer: "Only LKR 2,500 / Video" }
        ],
        included: [
            "AI Presenter",
            "Script Writing",
            "Scene Planning",
            "Voice Generation",
            "Professional Editing",
            "Background Music",
            "HD Export",
            "Commercial License"
        ],
        faqs: [
            { q: "Can I use my own logo?", a: "Yes! Every video is fully branded with your logo and brand colors." },
            { q: "Can I choose the AI presenter?", a: "Absolutely. We have a diverse library of professional avatars to match your brand identity." },
            { q: "Do I own the videos?", a: "Yes. You receive full commercial rights to use the videos anywhere forever." },
            { q: "Can I request revisions?", a: "Yes, every package includes milestone approvals and minor revisions." },
            { q: "How long is delivery?", a: "Depending on the package, delivery takes between 2 to 12 business days." },
            { q: "What languages are supported?", a: "We support over 60 languages with native-sounding accents." }
        ]
    },
    "static-posts": {
        id: "static-posts",
        name: "Static Social Media Posts",
        heroHeadline: "Dominate Your Industry With Elite Social Media Designs",
        description: "Custom-engineered static posts. We craft visual psychology optimized for Facebook, Instagram, and high-level B2B LinkedIn campaigns.",
        rating: "4.9",
        orders: "118",
        startingPrice: "LKR 5,000",
        deliveryTime: "4 Business Days",
        icon: "📱",
        benefits: [
            "Stop The Scroll Instantly",
            "Build Brand Authority",
            "Drive High-Intent Traffic"
        ],
        packages: [
            { title: "10 Posts", price: "LKR 5,000", delivery: "4 Business Days", costPer: "Only LKR 500 / Post" },
            { title: "20 Posts", price: "LKR 9,000", badge: "10% OFF", delivery: "7 Business Days", costPer: "Only LKR 450 / Post" },
            { title: "30 Posts", price: "LKR 12,000", badge: "20% OFF", delivery: "10 Business Days", costPer: "Only LKR 400 / Post" }
        ],
        included: [
            "Custom Designs",
            "Social Media Ready Formats",
            "High Resolution Exports",
            "Brand Colour Matching",
            "Source Files (Optional)"
        ],
        faqs: [
            { q: "Can I request specific post sizes?", a: "Yes, we can optimize designs for Instagram Square, Stories, or LinkedIn landscapes." },
            { q: "Do you write the captions?", a: "This service focuses purely on high-converting visual design, not copywriting." },
            { q: "Can you use my own photos?", a: "Absolutely. Provide your assets and we will integrate them seamlessly." }
        ]
    },
    "product-ads": {
        id: "product-ads",
        name: "Product Advertisement",
        heroHeadline: "Explode Your E-Commerce Sales With Studio-Quality Ads",
        description: "High-end product launches and promotional campaigns designed for ecommerce dominance and scaling online sales.",
        rating: "4.8",
        orders: "112",
        startingPrice: "LKR 12,000",
        deliveryTime: "4 Business Days",
        icon: "📦",
        benefits: [
            "Lower Your Cost-Per-Acquisition",
            "Hook Buyers in 3 Seconds",
            "Highlight Product Features"
        ],
        packages: [
            { title: "1 Product Ad", price: "LKR 12,000", delivery: "4 Business Days", costPer: "Only LKR 12,000 / Ad" },
            { title: "3 Product Ads", price: "LKR 32,400", badge: "10% OFF", delivery: "8 Business Days", costPer: "Only LKR 10,800 / Ad" },
            { title: "5 Product Ads", price: "LKR 48,000", badge: "20% OFF", delivery: "12 Business Days", costPer: "Only LKR 9,600 / Ad" }
        ],
        included: [
            "Storyboard Planning",
            "Script Writing",
            "Product Animation & B-Roll",
            "Motion Graphics",
            "Sound Design",
            "HD Export"
        ],
        faqs: [
            { q: "Do I need to ship my product to you?", a: "If you have 3D models or high-res photos, no. Otherwise, yes, for live-action b-roll." },
            { q: "What platform are these optimized for?", a: "Primarily Meta (Facebook/IG) and TikTok performance marketing." }
        ]
    },
    "cinematic-ads": {
        id: "cinematic-ads",
        name: "Cinematic Advertisement",
        heroHeadline: "Hollywood-Level Storytelling That Defies The Competition",
        description: "Luxury brand storytelling and high-budget commercial productions designed to completely distance you from the competition.",
        rating: "5.0",
        orders: "23",
        startingPrice: "LKR 25,000",
        deliveryTime: "6 Business Days",
        icon: "🎬",
        benefits: [
            "Elevate Brand Perception",
            "Create Emotional Connection",
            "Command Premium Prices"
        ],
        packages: [
            { title: "1 Story Ad", price: "LKR 25,000", delivery: "6 Business Days", costPer: "Only LKR 25,000 / Ad" },
            { title: "3 Story Ads", price: "LKR 67,500", badge: "10% OFF", delivery: "12 Business Days", costPer: "Only LKR 22,500 / Ad" },
            { title: "5 Story Ads", price: "LKR 100,000", badge: "20% OFF", delivery: "18 Business Days", costPer: "Only LKR 20,000 / Ad" }
        ],
        included: [
            "Concept Development",
            "Script Writing",
            "Character Design",
            "Storyboard",
            "Cinematic Editing",
            "Motion Graphics",
            "Premium Sound Design",
            "4K / HD Export"
        ],
        faqs: [
            { q: "Are actors included?", a: "Yes, we handle sourcing professional talent if required for the narrative." },
            { q: "Can this be used for TV broadcasting?", a: "Yes, we can provide the specific formats and color spaces required for broadcast TV." }
        ]
    }
};

const timelineSteps = [
    { step: 1, title: "Submit Requirements", desc: "Fill out a rapid onboarding brief." },
    { step: 2, title: "Script Approval", desc: "We craft the hook and narrative." },
    { step: 3, title: "Video Production", desc: "Our team executes the creative." },
    { step: 4, title: "Final Delivery", desc: "You receive high-converting assets." }
];
