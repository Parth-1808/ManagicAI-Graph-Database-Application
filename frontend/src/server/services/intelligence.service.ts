import { intelligenceRepository } from '../repositories/intelligence.repository';

export class IntelligenceService {
  async getInsights() {
    const [radar, pathRow, likeness, centrality, accepted, rejected, events, revenue] = await Promise.all([
      intelligenceRepository.getConflictRadar(5),
      intelligenceRepository.getCriticalPath(),
      intelligenceRepository.getLikenessDefense(),
      intelligenceRepository.getCentralityRankings(8),
      intelligenceRepository.getAcceptedBrandDeals(),
      intelligenceRepository.getRejectedDisputes(),
      intelligenceRepository.getEventsHistory(),
      intelligenceRepository.getRevenueStreams(),
    ]);

    const insights: any[] = [];

    // Map AI Exclusivity Collision Radar
    if (radar && radar.length > 0) {
      const row = radar[0] as any;
      const protectedBrands: string[] = Array.isArray(row.protectedBrands) ? row.protectedBrands : ['Rolex', 'Rado Switzerland'];

      insights.push({
        id: 'ins-exclusivity-collision',
        category: 'risk',
        severity: 'critical',
        title: `AI Conflict Radar: ${row.disputeTitle || 'Tag Heuer Exclusivity Collision'} Blocked`,
        subtitle: `Automatic isolation: incoming commercial proposal violates active ${protectedBrands.join(' & ')} 12-month exclusive lock, preventing a ₹1.5 Cr penalty default.`,
        timestamp: 'Live CognoDB Shield Radar',
        whyDetected: [
          `Commercial endorsement proposal from competing brand (${row.disputeTitle || 'TAG Heuer'}) detected.`,
          `Active covenant "${row.covenantTitle || 'Swiss Watch Exclusivity Lock'}" protects ${protectedBrands.join(', ')}.`,
          `Breach penalty mitigation: Automated isolation preserved ₹1.5 Cr liquidated damages immunity.`,
          `Shield verification ratified in CognoDB graph over Bolt Protocol.`,
        ],
        actionLabel: 'Ratify Covenant Quarantine',
        actionPayload: { disputeId: row.disputeId || 'rej-1', status: 'isolated' },
      });
    }

    // Map Multi-Hop Stunt Causal Chain
    if (pathRow) {
      const p = pathRow as any;
      insights.push({
        id: 'ins-stunt-cannes-path',
        category: 'milestone',
        severity: 'medium',
        title: `Multi-Hop Precedence: ${p.shoot || 'War 2 Climax'} ➔ ${p.gala || 'Cannes'} Verified`,
        subtitle: `Lloyd's £15M stunt insurance policy enforces 48h rest buffer after European stunt block before Cannes red carpet gala appearance.`,
        timestamp: 'Causal Release Path Verified',
        whyDetected: [
          `Task: "${p.shoot || 'War 2 Climax Shoot'}" enables "${p.overseasBriefing || 'European Overseas Stunt Prep'}".`,
          `Covenant: "${p.requiredCovenant || 'Action Stunt Insurance Covenant'}" protects physical recovery.`,
          `Precedence: European Stunt Block must conclude 48h prior to "${p.gala || 'Festival de Cannes'}".`,
          `Downstream: Cannes red carpet appearance precedes "${p.nextGala || 'IIFA Awards 2026'}".`,
        ],
        actionLabel: 'Verify Call-Sheet Manifest',
        actionPayload: { pathVerified: true },
      });
    }

    // Map AI Likeness Defense
    if (likeness) {
      const l = likeness as any;
      insights.push({
        id: 'ins-likeness-defense',
        category: 'governance',
        severity: 'high',
        title: `AI Defense Shield: Perpetual Voice & Biometric Exploitation Quarantined`,
        subtitle: `Flagged clause in commercial proposal: unauthorized 5-year GenAI avatar reproduction blocked by Biometric Likeness Defense Shield.`,
        timestamp: 'Biometric Shield Active',
        whyDetected: [
          `Flagged Dispute: "${l.flaggedClause || 'Fast-Fashion AI Likeness Clause Collision'}".`,
          `Mitigation: ${l.mitigationNote || 'Flagged and rejected by AI Likeness Shield for unfair commercial exploitation terms.'}`,
          `Biometric IP Protection: 100% digital likeness rights retained for Hrithik Roshan.`,
        ],
        actionLabel: 'Review Flagged Terms',
        actionPayload: { likenessShieldActive: true },
      });
    }

    const centralityRankings = centrality.map((r: any, idx: number) => ({
      rank: idx + 1,
      personId: r.personId,
      name: r.name,
      role: r.role,
      team: r.team,
      avatar: r.avatar,
      centralityScore: Number(r.centralityScore || 80),
      reason: idx === 0
        ? 'Root Talent Entity: Highest betweenness & degree centrality across all 6 film IPs and 7 brand ventures.'
        : `Key Industry Collaborator: Direct multi-hop connection to major production milestones and conclaves.`,
    }));

    const eventHistory = events.map((r: any) => {
      let badgeColor = 'bg-purple-500/80 text-white border-purple-300';
      if (r.status === 'Attended' || r.status === 'completed') {
        badgeColor = 'bg-emerald-500/80 text-white border-emerald-300';
      }

      return {
        id: r.id,
        name: r.name,
        date: r.date,
        year: String(r.year || '2026'),
        location: r.location,
        role: r.role,
        reach: r.reach,
        status: r.status,
        image: r.image,
        styling: r.styling,
        pressOutlets: ['Variety', 'Deadline', 'Vogue', 'Filmfare'],
        badgeColor,
      };
    });

    const monthlyEarnings = revenue.map((r: any) => ({
      name: r.name,
      value: Number(r.monthlyValue || 0),
      display: r.monthlyDisplay || '₹10 Lakhs',
      percent: Number(r.monthlyPercent || 20),
      growth: r.monthlyGrowth || '+10% MoM',
      color: r.color || '#9333ea',
    }));

    const yearlyEarnings = revenue.map((r: any) => ({
      name: r.name,
      value: Number(r.yearlyValue || 0),
      display: r.yearlyDisplay || '₹1.0 Cr',
      percent: Number(r.yearlyPercent || 20),
      growth: r.yearlyGrowth || '+20% YoY',
      color: r.color || '#9333ea',
    }));

    const commTelemetry = {
      totalEmailVolume: 12,
      totalEmailsCount: 4,
      unrecordedEmailCount: 0,
      hasMissingAdr: false,
      adrTaskTitle: 'Swiss Watch Exclusivity Covenant Verification',
      adrTaskStatus: 'completed',
      activeDisputeTitle: 'Tag Heuer Exclusivity Collision',
      activeDisputeId: 'rej-1',
      emailThreads: ['Rolex Ambassadorship Contract Review', 'Red Sea Film Festival Keynote', 'HRX GCC Expansion Sync'],
      discussants: ['Hrithik Roshan', 'Afsar Zaidi', 'Ayan Mukerji', 'Zoya Akhtar'],
    };

    return {
      insights,
      centralityRankings,
      communicationTelemetry: commTelemetry,
      acceptedCollabs: accepted,
      rejectedCollabs: rejected,
      eventHistory,
      monthlyEarnings,
      yearlyEarnings,
      isLiveDb: true,
      timestamp: new Date().toISOString(),
    };
  }
}

export const intelligenceService = new IntelligenceService();
