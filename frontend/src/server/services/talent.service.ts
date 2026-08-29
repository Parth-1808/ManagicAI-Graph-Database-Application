import { talentRepository } from '../repositories/talent.repository';
import { intelligenceRepository } from '../repositories/intelligence.repository';
import { calendarRepository } from '../repositories/calendar.repository';

export class TalentService {
  async getOverviewSummary() {
    const [talentStats, disputes, events, films, roster] = await Promise.all([
      talentRepository.getRootTalentStats('root-hrithik'),
      intelligenceRepository.getConflictRadar(5),
      calendarRepository.getEvents(),
      talentRepository.getAllFilms(),
      talentRepository.getTalentRoster(),
    ]);

    const clearanceScore = Number(talentStats?.clearanceScore ?? 100);
    const filmCount = Number(talentStats?.filmCount ?? 6);
    const brandCount = Number(talentStats?.brandCount ?? 7);
    const conflictCount = Number(talentStats?.conflictCount ?? 3);
    const taskCount = Number(talentStats?.taskCount ?? 6);

    const priorities = disputes.map((d: any, idx: number) => ({
      rank: idx + 1,
      title: d.disputeTitle || 'Brand Exclusivity Collision',
      badge: d.riskTag || 'Shield Verified',
      subtitle: d.reason || 'Blocked automatically by AI Legal Shield in CognoDB.',
      shield: d.covenantTitle || 'Swiss Watch Exclusivity Lock',
    }));

    const todaysMeetings = events
      .filter((e: any) => e.dateKey === 28 || e.dateKey === 29)
      .slice(0, 8);

    const formattedFilms = films.map((f: any) => {
      let statusColor = 'bg-purple-600 text-white';
      const statusBadge = f.statusBadge || 'Active';
      if (f.status === 'completed' || f.statusBadge === 'Blockbuster') {
        statusColor = 'bg-emerald-600 text-white';
      } else if (f.status === 'in_progress' || f.statusBadge === 'Filming') {
        statusColor = 'bg-purple-600 text-white';
      } else if (f.statusBadge === 'Pre-Production' || f.status === 'upcoming') {
        statusColor = 'bg-indigo-600 text-white';
      } else if (f.statusBadge === 'All-Time Hit') {
        statusColor = 'bg-amber-600 text-white';
      }

      return {
        id: f.id,
        title: f.title,
        year: f.year,
        role: f.role,
        studio: f.studio,
        image: f.image,
        status: f.status === 'in_progress' ? 'In Production' : f.status === 'completed' ? 'Released' : 'Upcoming',
        statusBadge,
        statusColor,
        payday: f.payday || '₹50 Cr',
        boxOffice: f.boxOffice || '₹300 Cr Gross',
      };
    });

    return {
      talent: {
        name: talentStats?.talentName || 'Hrithik Roshan',
        role: talentStats?.talentRole || 'Root Talent Entity • A-List Superstar & Producer',
        avatar: talentStats?.avatar || '/founder.jpg',
        portfolioValuation: talentStats?.portfolioValuation || '₹335+ Cr Active Portfolio',
        clearanceScore,
        status: talentStats?.talentStatus || 'On Set',
        currentProject: talentStats?.currentProject || 'War 2 (YRF Spy Universe)',
        upcomingMilestone: talentStats?.upcomingMilestone || 'Chroma Stage 4 Climax Shoot (London & Mumbai)',
      },
      healthScore: clearanceScore,
      healthDiff: '+100% Optimal Clearance',
      commercialPipeline: '₹1.25 Cr Active Commercial Pipeline',
      needAttentionCount: conflictCount,
      blockedTasksCount: conflictCount,
      meetingsTodayCount: todaysMeetings.length,
      filmCount,
      brandCount,
      taskCount,
      priorities,
      todaysMeetings,
      films: formattedFilms,
      talentRoster: roster,
      isLiveDb: true,
      timestamp: new Date().toISOString(),
    };
  }

  async getRoster() {
    const roster = await talentRepository.getTalentRoster();
    return {
      roster,
      count: roster.length,
      isLiveDb: true,
      timestamp: new Date().toISOString(),
    };
  }
}

export const talentService = new TalentService();
