import { runCypher } from './cognodb';

/**
 * Seeds the complete ManagicAI Talent Representation & Operations Graph into CognoDB
 * (48 Nodes, 78 Multi-Hop Relationships)
 */
export async function seedCognoDBDatabase(): Promise<{
  success: boolean;
  nodesCreated: number;
  relationshipsCreated: number;
  message: string;
}> {
  const cypher = `
    // Wipe existing data
    MATCH (n) DETACH DELETE n;

    // ─────────────────────────────────────────────────────────────────────────
    // 1. TALENT ROSTER & INDUSTRY COLLABORATORS (8 People Entities)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (hrithik:Person:Talent {
      id: 'root-hrithik',
      name: 'Hrithik Roshan',
      role: 'Root Talent Entity • A-List Superstar & Producer',
      tier: 'Tier 1 Global A-Lister',
      avatar: '/founder.jpg',
      portfolioValuation: '₹335+ Cr Active Portfolio',
      clearanceScore: 100,
      status: 'On Set',
      currentProject: 'War 2 (YRF Spy Universe)',
      upcomingMilestone: 'Chroma Stage 4 Climax Shoot (London & Mumbai)',
      exclusiveTerritory: 'Worldwide (Luxury Timepieces & Athleisure)',
      centralityScore: 98,
      email: 'hrithik.mgmt@exceedworld.com',
      team: 'Talent Anchor'
    })

    CREATE (afsar:Person:Manager {
      id: 'p-afsar',
      name: 'Afsar Zaidi',
      role: 'Managing Partner & Lead Talent Agent',
      email: 'afsar@exceedworld.com',
      team: 'Executive Representation',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      centralityScore: 94
    })

    CREATE (jrntr:Person:Collaborator {
      id: 'ent-jrntr',
      name: 'Jr NTR',
      role: 'Pan-India Co-Star (War 2)',
      email: 'mgmt@jrntr.in',
      team: 'Cast Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      centralityScore: 86
    })

    CREATE (ayan:Person:Collaborator {
      id: 'ent-ayan',
      name: 'Ayan Mukerji',
      role: 'Director (War 2)',
      email: 'ayan.m@yrfstudios.com',
      team: 'Direction',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      centralityScore: 91
    })

    CREATE (siddharth:Person:Collaborator {
      id: 'ent-siddharth',
      name: 'Siddharth Anand',
      role: 'Director & Action Specialist (War & Fighter)',
      email: 'siddharth@marflixpictures.com',
      team: 'Direction',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      centralityScore: 84
    })

    CREATE (rakesh:Person:Collaborator {
      id: 'ent-rakesh',
      name: 'Rakesh Roshan',
      role: 'Producer & Director (Filmkraft)',
      email: 'rakesh@filmkraft.in',
      team: 'Production Leadership',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      centralityScore: 88
    })

    CREATE (zoya:Person:Collaborator {
      id: 'ent-zoya',
      name: 'Zoya Akhtar',
      role: 'Director & Screenwriter (ZNMD)',
      email: 'zoya@tigerbabyfilms.com',
      team: 'Direction & Writing',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      centralityScore: 82
    })

    CREATE (mukesh:Person:Collaborator {
      id: 'p-mukesh',
      name: 'Mukesh Bansal',
      role: 'Co-Founder, Cult.fit & HRX Partner',
      email: 'mukesh@cultfit.com',
      team: 'Venture Partner',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      centralityScore: 78
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 2. CATEGORY DOMAIN HUBS (5 Primary Knowledge Domains)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (hubFilms:Hub {
      id: 'hub-films',
      label: 'Film Franchises & Studios',
      category: 'movies',
      roleOrType: 'Category Hub',
      valuation: '₹1,500+ Cr Global Gross',
      status: 'Active Production Hub'
    })

    CREATE (hubBrands:Hub {
      id: 'hub-brands',
      label: 'Brand Equity & Ventures',
      category: 'brands',
      roleOrType: 'Category Hub',
      valuation: '₹1,200+ Cr Venture Valuation',
      status: '5 Active Commercial Contracts'
    })

    CREATE (hubEvents:Hub {
      id: 'hub-events',
      label: 'VIP Festivals & Global Galas',
      category: 'events',
      roleOrType: 'Category Hub',
      valuation: '50M+ Press Reach',
      status: '4 International Itineraries'
    })

    CREATE (hubLegal:Hub {
      id: 'hub-legal',
      label: 'Legal Covenants & Risk Defense',
      category: 'covenants',
      roleOrType: 'Category Hub',
      valuation: '100% Escrow Protection',
      status: 'Automated AI Defense Radar'
    })

    CREATE (hubCreators:Hub {
      id: 'hub-creators',
      label: 'Creative Collaborators',
      category: 'collaborators',
      roleOrType: 'Category Hub',
      valuation: '₹2,500+ Cr Cumulative Box Office',
      status: 'Active Industry Network'
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 3. FILM PRODUCTIONS & FRANCHISES (6 Film Entities)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (filmWar2:Film:Project {
      id: 'ent-war2',
      title: 'War 2',
      name: 'War 2 (YRF Spy Universe)',
      subtitle: 'Direct sequel in the YRF Spy Universe • Major Kabir returns with Jr NTR',
      studio: 'Yash Raj Films',
      year: '2025/26',
      role: 'Major Kabir Dhaliwal',
      status: 'in_progress',
      statusBadge: 'Filming',
      payday: '₹50.00 Cr',
      boxOffice: 'Budget ₹300 Cr',
      targetLaunch: '2026-08-28',
      healthScore: 96
    })

    CREATE (filmFighter:Film:Project {
      id: 'ent-fighter',
      title: 'Fighter',
      name: 'Fighter (2024)',
      subtitle: "India's first aerial action franchise film directed by Siddharth Anand",
      studio: 'Viacom18 Studios • Marflix',
      year: '2024',
      role: 'Squadron Leader Shamsher "Patty" Pathania',
      status: 'completed',
      statusBadge: 'Blockbuster',
      payday: '₹65.00 Cr',
      boxOffice: '₹360.5 Cr Global Gross',
      healthScore: 100
    })

    CREATE (filmKrrish4:Film:Project {
      id: 'ent-krrish4',
      title: 'Krrish 4',
      name: 'Krrish 4 Flagship IP',
      subtitle: "India's premier superhero franchise with 50% producer equity",
      studio: 'Filmkraft Productions • Red Chillies VFX',
      year: '2026/27',
      role: 'Krrish / Krishna Mehra',
      status: 'in_progress',
      statusBadge: 'Pre-Production',
      payday: '₹85.00 Cr Equity Stake',
      boxOffice: '50% Producer Royalty',
      healthScore: 92
    })

    CREATE (filmWar:Film:Project {
      id: 'ent-war',
      title: 'War',
      name: 'War (2019)',
      subtitle: 'Record-setting all-time blockbuster establishing RAW Major Kabir',
      studio: 'Yash Raj Films',
      year: '2019',
      role: 'Major Kabir Dhaliwal',
      status: 'completed',
      statusBadge: 'All-Time Hit',
      payday: '₹72.00 Cr',
      boxOffice: '₹475.5 Cr Global Box Office',
      healthScore: 100
    })

    CREATE (filmZnmd:Film:Project {
      id: 'ent-znmd',
      title: 'Zindagi Na Milegi Dobara',
      name: 'Zindagi Na Milegi Dobara',
      subtitle: 'Enduring cult classic drama directed by Zoya Akhtar',
      studio: 'Excel Entertainment',
      year: '2011',
      role: 'Arjun Saluja',
      status: 'completed',
      statusBadge: 'Cult Classic',
      payday: '₹25.00 Cr',
      boxOffice: '₹153.2 Cr Worldwide Gross',
      healthScore: 100
    })

    CREATE (filmSuper30:Film:Project {
      id: 'ent-super30',
      title: 'Super 30',
      name: 'Super 30',
      subtitle: 'Critically acclaimed biographical drama portraying mathematician Anand Kumar',
      studio: 'Reliance Entertainment',
      year: '2019',
      role: 'Anand Kumar',
      status: 'completed',
      statusBadge: 'Superhit',
      payday: '₹38.00 Cr',
      boxOffice: '₹208.0 Cr Global Gross',
      healthScore: 100
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 4. COMMERCIAL BRAND DEALS & VENTURES (7 Brand Entities)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (brandRolex:Brand:Deal {
      id: 'ent-rolex',
      title: 'Rolex International Ambassadorship',
      brand: 'Rolex International',
      category: 'Luxury Timepieces',
      amount: '₹45,00,000',
      term: '12 Months Exclusive',
      signedDate: '2026-08-14',
      status: 'locked',
      statusTag: 'Contract Executed',
      deliverables: '1x Global Campaign TVC, 2x Print Billboards, Cannes Red Carpet Styling',
      priority: 'high',
      isShieldVerified: true
    })

    CREATE (brandRado:Brand:Deal {
      id: 'ent-rado',
      title: 'Rado Switzerland: Master of Materials',
      brand: 'Rado Switzerland (Swatch Group)',
      category: 'Luxury Timepieces',
      amount: '₹45,00,000 / Cycle',
      term: '12-Year Rolling Exclusive',
      signedDate: '2026-01-10',
      status: 'active',
      statusTag: '12-Year Longstanding Partner',
      deliverables: 'Global High-Tech Ceramic ambassador, Baselworld showcase, Dubai flagship opening',
      priority: 'high',
      isShieldVerified: true
    })

    CREATE (brandHrx:Brand:Deal {
      id: 'ent-hrx',
      title: 'HRX by Hrithik Roshan: Activewear & Wearables',
      brand: 'HRX Brand Ventures',
      category: 'Fitness & Apparel Venture',
      valuation: '₹1,200 Cr Brand Equity',
      term: 'Perpetual Co-Ownership',
      signedDate: '2013-11-01',
      status: 'active',
      statusTag: '51% Co-Owned with Myntra',
      deliverables: "Fall 2026 Smart Bio-Rings, performance athleisure, Cult.fit workout integrations",
      priority: 'critical',
      isShieldVerified: true
    })

    CREATE (brandDew:Brand:Deal {
      id: 'ent-dew',
      title: 'Mountain Dew: Darr Ke Aage Jeet Hai',
      brand: 'Mountain Dew (PepsiCo)',
      category: 'Beverage Endorsement',
      amount: '₹35,00,000 Deal',
      term: 'Annual Contract',
      signedDate: '2026-03-15',
      status: 'active',
      statusTag: 'Flagship Action TVC',
      deliverables: 'High-altitude action commercial with extreme stunt coverage & 4K national broadcast',
      priority: 'critical',
      isShieldVerified: true
    })

    CREATE (brandBurgerKing:Brand:Deal {
      id: 'ent-burgerking',
      title: "Burger King India: The King's Crunch",
      brand: 'Burger King India',
      category: 'QSR Commercial Campaign',
      amount: '₹25,00,000 Deal',
      term: '6 Months Campaign',
      signedDate: '2026-05-20',
      status: 'active',
      statusTag: 'Viral #HrithikStunt Campaign',
      deliverables: 'Humorous 360° commercial television spots, food delivery app takeovers, and store activations',
      priority: 'medium',
      isShieldVerified: true
    })

    CREATE (brandNike:Brand:Deal {
      id: 'ent-nike',
      title: 'Nike Athletic Retainer',
      brand: 'Nike International',
      category: 'Sportswear & Footwear',
      amount: '₹35,00,000',
      term: 'Annual Contract',
      signedDate: '2026-07-28',
      status: 'active',
      statusTag: 'Active In Production',
      deliverables: '3x Instagram Reels, 1x Global YouTube Short, Signature Training Apparel Campaign',
      priority: 'medium',
      isShieldVerified: true
    })

    CREATE (brandBulgari:Brand:Deal {
      id: 'ent-bulgari',
      title: 'Bulgari Eyewear & Luxury Accessories',
      brand: 'Bulgari',
      category: 'Luxury Fashion',
      amount: '₹20,00,000',
      term: 'Seasonal (6 Months)',
      signedDate: '2026-06-10',
      status: 'completed',
      statusTag: 'Completed & Delivered',
      deliverables: 'Editorial Photoshoot, 1x VIP Launch Appearance, 2x Digital Posts',
      priority: 'low',
      isShieldVerified: true
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 5. VIP FESTIVALS & GLOBAL GALAS (4 Event Entities)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (evtCannes:Event:Festival:Milestone {
      id: 'ent-cannes',
      title: 'Festival de Cannes (79th Edition)',
      name: 'Festival de Cannes',
      subtitle: 'VIP Guest & Global Ambassador Red Carpet at Palais des Festivals',
      dateKey: 28,
      date: '2026-08-28',
      time: '04:00 PM',
      location: 'Palais des Festivals, Cannes, France',
      role: 'VIP Guest & Global Brand Ambassador',
      reach: '14.8M Impressions',
      status: 'scheduled',
      priority: 'high',
      styling: 'Custom Sabyasachi Tuxedo • Rolex Daytona Platinum'
    })

    CREATE (evtRedSea:Event:Festival:Milestone {
      id: 'ent-redsea',
      title: 'Red Sea Film Festival: Global Cinema Icon Honour',
      name: 'Red Sea Film Festival',
      subtitle: 'Keynote conversation on Indian action cinema & franchise scaling',
      dateKey: 28,
      date: '2026-08-28',
      time: '08:30 PM AST',
      location: 'Jeddah Historic District, Saudi Arabia',
      role: 'Guest of Honor & Global Cinema Icon',
      reach: '8.5M Reach',
      status: 'scheduled',
      priority: 'high',
      styling: 'Tom Ford Italian Silk Blend Suit'
    })

    CREATE (evtIifa:Event:Festival:Milestone {
      id: 'ent-iifa',
      title: 'IIFA Awards 2026: 25-Year Celebration & Grand Finale',
      name: 'IIFA Awards 2026',
      subtitle: '12-minute career milestone dance medley & Honorary Global Icon Felicitation',
      dateKey: 31,
      date: '2026-08-31',
      time: '02:00 PM',
      location: 'Etihad Arena, Yas Island, Abu Dhabi',
      role: 'Grand Finale Performer & Honoree',
      reach: '35.0M Global Broadcast',
      status: 'scheduled',
      priority: 'critical',
      styling: 'Bespoke Manish Malhotra Couture'
    })

    CREATE (evtFilmfare:Event:Festival:Milestone {
      id: 'ent-filmfare',
      title: '69th Filmfare Awards Ceremony',
      name: '69th Filmfare Awards',
      subtitle: 'Flagship Bollywood awards evening celebrating excellence in Hindi cinema',
      dateKey: 28,
      date: '2026-01-28',
      time: '07:00 PM',
      location: 'GIFT City Auditorium, Gujarat',
      role: 'Best Actor Nominee & Category Presenter',
      reach: '22.5M TV Viewers',
      status: 'completed',
      priority: 'medium',
      styling: 'Classic Black Tie by Giorgio Armani'
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 6. LEGAL COVENANTS & AUTOMATED RISK DEFENSE SHIELDS (4 Covenants)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (covWatchLock:Covenant:Shield {
      id: 'ent-watchlock',
      title: 'Swiss Watch Exclusivity Lock',
      category: 'covenants',
      roleOrType: 'Contractual Legal Covenant',
      valuation: '₹1.5 Cr Penalty Shield',
      status: 'active',
      beneficiary: 'Rolex & Rado Switzerland',
      summary: 'Strict non-compete covenant prohibiting any competing horology, luxury watch, or chronograph endorsements worldwide.'
    })

    CREATE (covStuntBond:Covenant:Shield {
      id: 'ent-stuntinsure',
      title: "Action Stunt Insurance Covenant (Lloyd's £15M Policy)",
      category: 'covenants',
      roleOrType: 'Underwritten Risk Shield',
      valuation: '£15M ($19M USD) Policy',
      status: 'active',
      underwriter: "Lloyd's of London Entertainment Desk",
      summary: 'Mandatory international completion bond requiring 48h rest buffer before overseas flights and aerial stunt sequences.'
    })

    CREATE (covAiDefense:Covenant:Shield {
      id: 'ent-aidefense',
      title: 'Perpetual AI Biometric Likeness Defense',
      category: 'covenants',
      roleOrType: 'Generative AI Defense Clause',
      valuation: 'Strict Zero-Infringement',
      status: 'active',
      summary: 'Protects facial biometric data, voice timbre, and motion-capture likeness from unauthorized generative AI cloning.'
    })

    CREATE (covEscrow:Covenant:Shield {
      id: 'ent-escrow',
      title: 'Auto-Escrow Settlement Vault',
      category: 'covenants',
      roleOrType: 'Financial Payout Guardian',
      valuation: '₹45,00,000 Locked in Escrow',
      status: 'guaranteed',
      summary: 'Cryptographic milestone escrow system holding client funds before talent call-sheet attendance with auto-release post shoot.'
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 7. DISPUTES & BLOCKED CONFLICTS (AI Conflict Radar Isolations)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (dispTagHeuer:Dispute:Conflict {
      id: 'rej-1',
      title: 'Tag Heuer Exclusivity Collision',
      subtitle: 'Violates active Rolex & Rado 12-month luxury watch covenant',
      status: 'blocked',
      priority: 'critical',
      openedAt: '2026-08-05T00:00:00Z',
      description: 'Competing luxury watch commercial deal offering ₹50L automatically blocked to protect ₹1.5 Cr penalty shield.',
      blockedTasksCount: 1,
      scheduleImpactDays: 0,
      riskTag: 'Exclusivity Collision'
    })

    CREATE (dispAiVoice:Dispute:Conflict {
      id: 'rej-2',
      title: 'Fast-Fashion AI Likeness Clause Collision',
      subtitle: 'Contract demanded unlimited 5-year generative AI face/voice synthesis rights',
      status: 'blocked',
      priority: 'high',
      openedAt: '2026-07-19T00:00:00Z',
      description: 'Flagged and rejected by AI Likeness Shield for unfair commercial exploitation terms.',
      blockedTasksCount: 1,
      scheduleImpactDays: 0,
      riskTag: 'Unfair Terms & AI Risk'
    })

    CREATE (dispEnergyDrink:Dispute:Conflict {
      id: 'rej-3',
      title: 'Carbonated Energy Drink Schedule Collision',
      subtitle: 'Shoot dates collided directly with War 2 London climax call-sheet',
      status: 'blocked',
      priority: 'high',
      openedAt: '2026-06-22T00:00:00Z',
      description: 'Severe date collision with 0 days rest buffer before overseas flight.',
      blockedTasksCount: 1,
      scheduleImpactDays: 3,
      riskTag: 'Schedule Collision'
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 8. SHOOT TASKS & ITINERARY CALL-SHEETS (6 Operational Tasks)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (tWar2Climax:Task:Shoot {
      id: 'evt-1',
      title: 'WAR 2 — Climax Combat Live Shoot with Jr. NTR',
      subtitle: 'Chroma Stage 4 heavy combat coverage, two-camera ARRI Alexa rig',
      description: 'Two-camera ARRI Alexa rig, wirework and stunt riggers on set with Jr NTR and Ayan Mukerji.',
      status: 'in_progress',
      priority: 'critical',
      dateKey: 28,
      time: '2:30 PM - 10:00 PM',
      dueDate: '2026-08-28',
      location: 'Stage 4, YRF Studios, Andheri West',
      category: 'Shoot',
      attendeeCount: 85
    })

    CREATE (tKrrish4Mocap:Task:Shoot {
      id: 'evt-2',
      title: 'KRRISH 4 — Motion Capture & Aerial Wire Rigging Pre-Viz',
      subtitle: 'Dynamic cape physics test and high-speed multi-target flight algorithms',
      description: 'Dynamic cape physics test and high-speed flight algorithms with VFX supervisors.',
      status: 'in_progress',
      priority: 'high',
      dateKey: 28,
      time: '5:00 PM - 5:45 PM',
      dueDate: '2026-08-28',
      location: 'Redchillies Mo-Cap Lab & Filmkraft Lounge',
      category: 'Milestone',
      attendeeCount: 12
    })

    CREATE (tFighterWorkshop:Task:Shoot {
      id: 'evt-3',
      title: 'FIGHTER Universe Extension — Tactical Aviation Workshop',
      subtitle: 'Aeronautical cockpit flight simulator review and aerial combat sequence script development',
      description: 'Cockpit simulator review and combat sequence script development with Siddharth Anand.',
      status: 'in_progress',
      priority: 'medium',
      dateKey: 29,
      time: '10:00 AM - 11:30 AM',
      dueDate: '2026-08-29',
      location: 'Marflix Creative Den, Bandra',
      category: 'Workshop',
      attendeeCount: 8
    })

    CREATE (tWar2Europe:Task:Shoot {
      id: 'evt-4',
      title: 'WAR 2 — European Overseas Stunt Block Briefing (Valencia & Alps)',
      subtitle: 'Stunt rig insurance sign-off and private flight manifest coordination (Tail VT-HRO)',
      description: 'Stunt rig insurance sign-off and private flight manifest coordination with Franz Spilhaus.',
      status: 'in_progress',
      priority: 'critical',
      dateKey: 30,
      time: '4:00 PM - 5:00 PM',
      dueDate: '2026-08-30',
      location: 'YRF International Wing & Kalina VIP Terminal',
      category: 'Launch',
      attendeeCount: 20
    })

    CREATE (tRolexTvc:Task:Deliverable {
      id: 't-rolex-tvc',
      title: 'Rolex 60s Global TVC Campaign Master Cut Signoff',
      subtitle: 'Final color grade and sound mix signoff before Cannes premiere',
      description: 'Broadcast-ready 4K HDR master review.',
      status: 'completed',
      priority: 'high',
      dateKey: 27,
      time: '11:00 AM',
      dueDate: '2026-08-27',
      category: 'Deliverable'
    })

    CREATE (tHrxWearables:Task:Deliverable {
      id: 't-hrx-wearables',
      title: 'HRX Smart Bio-Ring Series 5 Specifications Signoff',
      subtitle: 'Cult.fit sensor integration and firmware calibration',
      description: 'Hardware firmware lock for Bluetooth Low Energy PPG sensors.',
      status: 'in_progress',
      priority: 'medium',
      dateKey: 29,
      time: '04:00 PM',
      dueDate: '2026-08-29',
      category: 'Deliverable'
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 9. MEETINGS & STRATEGIC CONCLAVES (4 Sessions)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (mZoyaScript:Meeting {
      id: 'm-zoya-script',
      title: 'Director Zoya Akhtar Script Reading',
      subtitle: 'Tiger Baby Films character briefing and dialogue run-through',
      scheduledAt: '2026-08-18T11:00:00Z',
      dateKey: 18,
      time: '11:00 AM',
      attendeeCount: 4,
      status: 'completed',
      category: 'Meeting',
      unresolvedIssues: 0
    })

    CREATE (mRolexReview:Meeting {
      id: 'm-rolex-review',
      title: 'Rolex Ambassadorship Contract Review',
      subtitle: 'Rolex International legal terms and 12-month exclusive renewal signoff',
      scheduledAt: '2026-08-27T14:30:00Z',
      dateKey: 27,
      time: '02:30 PM',
      attendeeCount: 5,
      status: 'completed',
      category: 'Brand Collab',
      unresolvedIssues: 0
    })

    CREATE (mCannesJunket:Meeting {
      id: 'm-cannes-junket',
      title: 'Cannes Film Festival VIP Press Junket',
      subtitle: 'Festival de Cannes red carpet and international press briefing sync',
      scheduledAt: '2026-08-29T16:00:00Z',
      dateKey: 29,
      time: '04:00 PM',
      attendeeCount: 12,
      status: 'scheduled',
      category: 'VIP Gala',
      unresolvedIssues: 0
    })

    CREATE (mYrfConclave:Meeting {
      id: 'm-yrf-conclave',
      title: 'YRF Spy Universe Conclave: Kabir Multi-Film Narrative Arc',
      subtitle: 'Executive closed-door strategic roadmap aligning War 2, Alpha crossover, and solo Kabir franchise',
      scheduledAt: '2026-08-29T11:30:00Z',
      dateKey: 29,
      time: '11:30 AM',
      attendeeCount: 6,
      status: 'scheduled',
      category: 'Review',
      unresolvedIssues: 0
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 10. INVITATIONS & INCOMING INQUIRIES (4 Workspace Invitations)
    // ─────────────────────────────────────────────────────────────────────────
    CREATE (invRedSea:Invitation:WorkspaceItem {
      id: 'inv-1',
      title: 'Red Sea Film Festival: Global Cinema Icon Honour & In-Conversation',
      subtitle: 'Exclusive keynote on Indian action cinema & franchise scaling followed by Red Carpet Gala',
      description: 'Exclusive keynote on Indian action cinema & franchise scaling followed by Red Carpet Gala.',
      sender: 'Mohammed Al Turki (CEO, Red Sea Film Foundation)',
      senderName: 'Mohammed Al Turki',
      senderRole: 'CEO, Red Sea Film Foundation',
      project: 'Red Sea Film Fest',
      type: 'collab',
      date: 'Today, Aug 28',
      time: '8:30 PM - 10:30 PM AST',
      dateKey: 28,
      status: 'pending',
      priority: 'high',
      attendeeCount: 120
    })

    CREATE (invYrf:Invitation:WorkspaceItem {
      id: 'inv-2',
      title: 'YRF Spy Universe Conclave: Kabir Multi-Film Narrative Arc',
      subtitle: 'Executive closed-door strategic roadmap aligning War 2, Alpha crossover, and solo Kabir franchise',
      description: 'Executive closed-door strategic roadmap aligning War 2, Alpha crossover, and solo Kabir franchise.',
      sender: 'Aditya Chopra (Chairman, Yash Raj Films)',
      senderName: 'Aditya Chopra',
      senderRole: 'Chairman, Yash Raj Films',
      project: 'YRF Spy Universe',
      type: 'review',
      date: 'Tomorrow, Aug 29',
      time: '11:30 AM - 1:00 PM',
      dateKey: 29,
      status: 'pending',
      priority: 'critical',
      attendeeCount: 6
    })

    CREATE (invHrx:Invitation:WorkspaceItem {
      id: 'inv-3',
      title: 'HRX x Cult.fit Global Expansion & Series 5 Wearables Launch',
      subtitle: 'D2C international retail expansion strategy across GCC and launch of Series 5 Smart Bio-Bands',
      description: 'D2C international retail expansion strategy across GCC and launch of Series 5 Smart Bio-Bands.',
      sender: 'Afsar Zaidi (Managing Partner, Exceed & HRX)',
      senderName: 'Afsar Zaidi',
      senderRole: 'Managing Partner, Exceed & HRX',
      project: 'HRX Brand Ventures',
      type: 'collab',
      date: 'Aug 30, 2026',
      time: '4:00 PM - 6:00 PM',
      dateKey: 30,
      status: 'pending',
      priority: 'high',
      attendeeCount: 14
    })

    CREATE (invIifa:Invitation:WorkspaceItem {
      id: 'inv-4',
      title: 'IIFA Awards 2026: 25-Year Celebration & Finale Performance',
      subtitle: '12-minute career milestone dance medley rehearsal and Honorary Global Icon Felicitation',
      description: '12-minute career milestone dance medley rehearsal and Honorary Global Icon Felicitation.',
      sender: 'Andre Timmins (Director, Wizcraft International)',
      senderName: 'Andre Timmins',
      senderRole: 'Director, Wizcraft International',
      project: 'IIFA Awards 2026',
      type: 'project',
      date: 'Aug 31, 2026',
      time: '2:00 PM',
      dateKey: 31,
      status: 'accepted',
      priority: 'critical',
      attendeeCount: 45
    })

    // ─────────────────────────────────────────────────────────────────────────
    // 11. RELATIONSHIPS & CAUSAL GRAPH TOPOLOGY (75+ Labeled Edges)
    // ─────────────────────────────────────────────────────────────────────────
    // Root Talent Hierarchy to Hubs
    CREATE (hrithik)-[:HIERARCHY { label: 'PORTFOLIO_CONTAINS' }]->(hubFilms)
    CREATE (hrithik)-[:HIERARCHY { label: 'COMMERCIAL_EQUITY' }]->(hubBrands)
    CREATE (hrithik)-[:HIERARCHY { label: 'ATTENDS_GALAS' }]->(hubEvents)
    CREATE (hrithik)-[:HIERARCHY { label: 'PROTECTED_BY' }]->(hubLegal)
    CREATE (hrithik)-[:HIERARCHY { label: 'CREATIVE_ROSTER' }]->(hubCreators)

    // Hub to Entities
    CREATE (hubFilms)-[:HIERARCHY]->(filmWar2)
    CREATE (hubFilms)-[:HIERARCHY]->(filmFighter)
    CREATE (hubFilms)-[:HIERARCHY]->(filmKrrish4)
    CREATE (hubFilms)-[:HIERARCHY]->(filmWar)
    CREATE (hubFilms)-[:HIERARCHY]->(filmZnmd)
    CREATE (hubFilms)-[:HIERARCHY]->(filmSuper30)

    CREATE (hubBrands)-[:HIERARCHY]->(brandRolex)
    CREATE (hubBrands)-[:HIERARCHY]->(brandRado)
    CREATE (hubBrands)-[:HIERARCHY]->(brandHrx)
    CREATE (hubBrands)-[:HIERARCHY]->(brandDew)
    CREATE (hubBrands)-[:HIERARCHY]->(brandBurgerKing)
    CREATE (hubBrands)-[:HIERARCHY]->(brandNike)
    CREATE (hubBrands)-[:HIERARCHY]->(brandBulgari)

    CREATE (hubEvents)-[:HIERARCHY]->(evtCannes)
    CREATE (hubEvents)-[:HIERARCHY]->(evtRedSea)
    CREATE (hubEvents)-[:HIERARCHY]->(evtIifa)
    CREATE (hubEvents)-[:HIERARCHY]->(evtFilmfare)

    CREATE (hubLegal)-[:HIERARCHY]->(covWatchLock)
    CREATE (hubLegal)-[:HIERARCHY]->(covStuntBond)
    CREATE (hubLegal)-[:HIERARCHY]->(covAiDefense)
    CREATE (hubLegal)-[:HIERARCHY]->(covEscrow)

    CREATE (hubCreators)-[:HIERARCHY]->(ayan)
    CREATE (hubCreators)-[:HIERARCHY]->(siddharth)
    CREATE (hubCreators)-[:HIERARCHY]->(rakesh)
    CREATE (hubCreators)-[:HIERARCHY]->(zoya)
    CREATE (hubCreators)-[:HIERARCHY]->(jrntr)
    CREATE (hubCreators)-[:HIERARCHY]->(afsar)

    // Direct Talent Participation
    CREATE (hrithik)-[:STARS_IN]->(filmWar2)
    CREATE (hrithik)-[:STARS_IN]->(filmFighter)
    CREATE (hrithik)-[:STARS_IN]->(filmKrrish4)
    CREATE (hrithik)-[:STARS_IN]->(filmWar)
    CREATE (hrithik)-[:STARS_IN]->(filmZnmd)
    CREATE (hrithik)-[:STARS_IN]->(filmSuper30)

    CREATE (hrithik)-[:COMMERCIAL_EQUITY]->(brandRolex)
    CREATE (hrithik)-[:COMMERCIAL_EQUITY]->(brandRado)
    CREATE (hrithik)-[:COMMERCIAL_EQUITY]->(brandHrx)
    CREATE (hrithik)-[:COMMERCIAL_EQUITY]->(brandDew)
    CREATE (hrithik)-[:COMMERCIAL_EQUITY]->(brandBurgerKing)

    CREATE (hrithik)-[:ATTENDS_GALAS]->(evtCannes)
    CREATE (hrithik)-[:ATTENDS_GALAS]->(evtRedSea)
    CREATE (hrithik)-[:ATTENDS_GALAS]->(evtIifa)
    CREATE (hrithik)-[:ATTENDS_GALAS]->(evtFilmfare)

    CREATE (hrithik)-[:PROTECTED_BY]->(covWatchLock)
    CREATE (hrithik)-[:PROTECTED_BY]->(covStuntBond)
    CREATE (hrithik)-[:PROTECTED_BY]->(covAiDefense)
    CREATE (hrithik)-[:PROTECTED_BY]->(covEscrow)

    // Management & Representation
    CREATE (afsar)-[:REPRESENTS]->(hrithik)
    CREATE (afsar)-[:OWNS]->(brandRolex)
    CREATE (afsar)-[:OWNS]->(brandRado)
    CREATE (afsar)-[:OWNS]->(brandHrx)
    CREATE (afsar)-[:OWNS]->(brandDew)
    CREATE (mukesh)-[:PART_OF]->(brandHrx)

    // Creative Collaborations & Production Links
    CREATE (ayan)-[:DIRECTED_BY]->(filmWar2)
    CREATE (jrntr)-[:CO_STARS_WITH]->(filmWar2)
    CREATE (siddharth)-[:DIRECTED_BY]->(filmFighter)
    CREATE (siddharth)-[:DIRECTED_BY]->(filmWar)
    CREATE (rakesh)-[:PRODUCED_BY]->(filmKrrish4)
    CREATE (zoya)-[:DIRECTED_BY]->(filmZnmd)

    // Legal Governance & Shield Enforcements
    CREATE (covWatchLock)-[:LEGAL_GOVERNANCE]->(brandRolex)
    CREATE (covWatchLock)-[:LEGAL_GOVERNANCE]->(brandRado)
    CREATE (covWatchLock)-[:BLOCKS]->(dispTagHeuer)
    CREATE (covAiDefense)-[:BLOCKS]->(dispAiVoice)
    CREATE (covStuntBond)-[:GOVERNS]->(filmWar2)
    CREATE (covEscrow)-[:ESCROW_ESCORT]->(brandRolex)

    // Task & Shoot Connections
    CREATE (filmWar2)-[:PART_OF]->(tWar2Climax)
    CREATE (filmWar2)-[:PART_OF]->(tWar2Europe)
    CREATE (filmKrrish4)-[:PART_OF]->(tKrrish4Mocap)
    CREATE (filmFighter)-[:PART_OF]->(tFighterWorkshop)
    CREATE (brandRolex)-[:PART_OF]->(tRolexTvc)
    CREATE (brandHrx)-[:PART_OF]->(tHrxWearables)

    CREATE (hrithik)-[:OWNS]->(tWar2Climax)
    CREATE (hrithik)-[:OWNS]->(tKrrish4Mocap)
    CREATE (hrithik)-[:OWNS]->(tWar2Europe)
    CREATE (afsar)-[:OWNS]->(tRolexTvc)
    CREATE (afsar)-[:OWNS]->(tHrxWearables)

    // Meetings & Governance
    CREATE (afsar)-[:ATTENDS]->(mRolexReview)
    CREATE (hrithik)-[:ATTENDS]->(mCannesJunket)
    CREATE (ayan)-[:ATTENDS]->(mYrfConclave)
    CREATE (afsar)-[:ATTENDS]->(mYrfConclave)
    CREATE (zoya)-[:ATTENDS]->(mZoyaScript)
    CREATE (hrithik)-[:ATTENDS]->(mZoyaScript)

    CREATE (mRolexReview)-[:GOVERNS]->(brandRolex)
    CREATE (mCannesJunket)-[:GOVERNS]->(evtCannes)
    CREATE (mYrfConclave)-[:GOVERNS]->(filmWar2)

    // Invitations Connections
    CREATE (invRedSea)-[:CONCERNS]->(evtRedSea)
    CREATE (invYrf)-[:CONCERNS]->(filmWar2)
    CREATE (franz:Person:Collaborator {
      id: 'p-franz',
      name: 'Franz Spilhaus',
      role: 'International Stunt Coordinator',
      email: 'franz@stuntspilhaus.com',
      team: 'Stunt & Action',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      centralityScore: 75
    })

    CREATE (evtMami:Event:Festival:Milestone { id: 'ent-mami', title: 'MAMI Mumbai Film Festival Premiere', name: 'MAMI Mumbai Film Festival', subtitle: 'Opening gala keynote on creative AI and Indian cinematic storytelling', dateKey: 15, date: '2026-07-15', year: '2026', time: '06:00 PM', location: 'Grand Hyatt Convention Centre, Mumbai', role: 'Guest of Honor & Keynote Panelist', reach: '8.2M Impressions', status: 'Attended', priority: 'medium', styling: 'Bespoke Shantanu & Nikhil Bandhgala', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80' })
    CREATE (evtForbes:Event:Festival:Milestone { id: 'ent-forbes', title: 'Forbes Global 30 Under 30 Summit', name: 'Forbes Global Summit', subtitle: 'Celebrity keynote address on venture entrepreneurship and brand building (HRX)', dateKey: 4, date: '2026-05-04', year: '2026', time: '11:00 AM', location: 'Dubai Opera, Downtown Dubai, UAE', role: 'Celebrity Keynote Speaker on Creative AI', reach: '6.4M Impressions', status: 'Attended', priority: 'medium', styling: 'Tom Ford Italian Silk Blend Suit', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80' })

    // REVENUE STREAMS
    CREATE (revEndorsements:RevenueStream { id: 'rev-endorsements', name: 'Brand Endorsements', monthlyValue: 12500000, monthlyDisplay: '₹1.25 Cr', monthlyPercent: 42.0, monthlyGrowth: '+18% MoM', yearlyValue: 150000000, yearlyDisplay: '₹15.0 Cr', yearlyPercent: 42.4, yearlyGrowth: '+44% YoY', color: '#9333ea' })
    CREATE (revFilms:RevenueStream { id: 'rev-films', name: 'Feature Film Retainers', monthlyValue: 9500000, monthlyDisplay: '₹95 Lakhs', monthlyPercent: 32.0, monthlyGrowth: '+12% MoM', yearlyValue: 114000000, yearlyDisplay: '₹11.4 Cr', yearlyPercent: 32.2, yearlyGrowth: '+35% YoY', color: '#4f46e5' })
    CREATE (revGalas:RevenueStream { id: 'rev-galas', name: 'VIP Galas & Appearances', monthlyValue: 3500000, monthlyDisplay: '₹35 Lakhs', monthlyPercent: 12.0, monthlyGrowth: '+25% MoM', yearlyValue: 42000000, yearlyDisplay: '₹4.2 Cr', yearlyPercent: 11.9, yearlyGrowth: '+50% YoY', color: '#ec4899' })
    CREATE (revDigital:RevenueStream { id: 'rev-digital', name: 'Digital & Commercials', monthlyValue: 2800000, monthlyDisplay: '₹28 Lakhs', monthlyPercent: 9.0, monthlyGrowth: '+8% MoM', yearlyValue: 30000000, yearlyDisplay: '₹3.0 Cr', yearlyPercent: 8.5, yearlyGrowth: '+20% YoY', color: '#f59e0b' })
    CREATE (revRoyalties:RevenueStream { id: 'rev-royalties', name: 'Licensing & Royalties', monthlyValue: 1500000, monthlyDisplay: '₹15 Lakhs', monthlyPercent: 5.0, monthlyGrowth: '+5% MoM', yearlyValue: 18000000, yearlyDisplay: '₹1.8 Cr', yearlyPercent: 5.0, yearlyGrowth: '+15% YoY', color: '#10b981' })

    // ACTIVITY LOGS
    CREATE (act1:ActivityLog { id: 'act-1', type: 'shoot', title: 'War 2 Climax Call-Sheet Confirmed', detail: 'Chroma Stage 4 heavy combat with Jr. NTR • Call time 2:30 PM today', timeAgo: '12m ago', status: 'active', queryPrompt: 'Give me details on War 2 upcoming climax shoot with Jr NTR' })
    CREATE (act2:ActivityLog { id: 'act-2', type: 'deal', title: 'Rolex Ambassadorship Contract Ready', detail: '₹45,00,000 deal • Exclusivity clause cleared for 12 months in escrow', timeAgo: '35m ago', status: 'success', queryPrompt: 'Summarize the Rolex ₹45L brand deal terms and deliverables' })
    CREATE (act3:ActivityLog { id: 'act-3', type: 'gala', title: 'Cannes Festival VIP Press Junket', detail: 'Itinerary sync requested by French PR team for Palais des Festivals', timeAgo: '1h ago', status: 'active', queryPrompt: 'What is Hrithik schedule for the Cannes Film Festival VIP Gala?' })
    CREATE (act4:ActivityLog { id: 'act-4', type: 'conflict', title: 'Zero Double-Bookings Guarded', detail: 'Tag Heuer horology collision safely auto-blocked by Swiss Watch Lock', timeAgo: '2h ago', status: 'success', queryPrompt: 'Check for any schedule or brand exclusivity conflicts across August' })
    CREATE (act5:ActivityLog { id: 'act-5', type: 'director', title: 'Zoya Akhtar Script Reading Concluded', detail: 'Dialogue run-through completed with Tiger Baby Films', timeAgo: '3h ago', status: 'active', queryPrompt: 'Tell me about the Zoya Akhtar script reading session' })

    CREATE (invHrx)-[:CONCERNS]->(brandHrx)
    CREATE (invIifa)-[:CONCERNS]->(evtIifa)

    CREATE (hubEvents)-[:HIERARCHY]->(evtMami)
    CREATE (hubEvents)-[:HIERARCHY]->(evtForbes)
    CREATE (hubCreators)-[:HIERARCHY]->(franz)

    CREATE (hrithik)-[:ATTENDS_GALAS]->(evtMami)
    CREATE (hrithik)-[:ATTENDS_GALAS]->(evtForbes)
    CREATE (franz)-[:STUNT_COORDINATOR_FOR]->(filmWar2)

    CREATE (hrithik)-[:GENERATES_REVENUE]->(revEndorsements)
    CREATE (hrithik)-[:GENERATES_REVENUE]->(revFilms)
    CREATE (hrithik)-[:GENERATES_REVENUE]->(revGalas)
    CREATE (hrithik)-[:GENERATES_REVENUE]->(revDigital)
    CREATE (hrithik)-[:GENERATES_REVENUE]->(revRoyalties)

    CREATE (hrithik)-[:AUDITED_BY]->(act1)
    CREATE (hrithik)-[:AUDITED_BY]->(act2)
    CREATE (hrithik)-[:AUDITED_BY]->(act3)
    CREATE (hrithik)-[:AUDITED_BY]->(act4)
    CREATE (hrithik)-[:AUDITED_BY]->(act5)

    // Multi-Hop Causal Release & Stunt Precedence Chains
    CREATE (tWar2Climax)-[:ENABLES]->(tWar2Europe)
    CREATE (tWar2Europe)-[:REQUIRED_FOR]->(evtCannes)
    CREATE (covStuntBond)-[:UNLOCKS]->(tWar2Europe)
    CREATE (tRolexTvc)-[:UNLOCKS]->(evtCannes)
    CREATE (evtCannes)-[:PRECEDES]->(evtIifa)

    RETURN count(*) AS totalEntities;
  `;

  try {
    const result = await runCypher(cypher);
    if (!result.isLiveDb) {
      return {
        success: false,
        nodesCreated: 0,
        relationshipsCreated: 0,
        message: 'CognoDB not reachable. Seed stored in fallback.',
      };
    }

    return {
      success: true,
      nodesCreated: 64,
      relationshipsCreated: 114,
      message: 'CognoDB Cloud populated with 64 ManagicAI talent nodes & 114 multi-hop relationships over Bolt Protocol!',
    };
  } catch (error: any) {
    return {
      success: false,
      nodesCreated: 0,
      relationshipsCreated: 0,
      message: `Seed error: ${error.message}`,
    };
  }
}

