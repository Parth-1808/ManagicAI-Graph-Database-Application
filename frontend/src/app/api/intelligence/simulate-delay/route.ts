import { NextRequest, NextResponse } from 'next/server';
import { runCypher, sanitizeNeo4jValue } from '@/lib/cognodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { taskId, delayDays } = body;
    const days = Math.max(1, Math.min(30, Number(delayDays) || 1));
    const targetId = taskId || 'evt-1';

    const traversalCypher = `
      MATCH (root)
      WHERE root.id = $targetId OR root.title = $targetId OR ($targetId IS NULL AND (root:Task OR root:Event))
      WITH root LIMIT 1
      OPTIONAL MATCH (root)-[:BLOCKS|ENABLES|REQUIRED_FOR|UNLOCKS*1..5]->(downstreamTask:Task)
      WITH root, collect(DISTINCT downstreamTask) AS tasks
      OPTIONAL MATCH (root)-[:DISCUSSED_IN|MENTIONED|GOVERNS|ATTENDS*1..3]->(m:Meeting)
      WITH root, tasks, collect(DISTINCT m) AS meetings
      OPTIONAL MATCH (root)-[:BLOCKS|ENABLES|REQUIRED_FOR|UNLOCKS|PRECEDES*1..6]->(e:Event)
      WITH root, tasks, meetings, collect(DISTINCT e) AS events
      RETURN coalesce(root.id, $targetId) AS nodeId,
             coalesce(root.title, 'WAR 2 — Climax Combat Live Shoot') AS nodeTitle,
             size(tasks) AS downstreamTaskCount,
             [t in tasks | t.title] AS downstreamTaskTitles,
             size(meetings) AS downstreamMeetingCount,
             [m in meetings | m.title] AS downstreamMeetingTitles,
             size(events) AS downstreamMilestoneCount,
             [evt in events | coalesce(evt.title, evt.name)] AS downstreamMilestoneTitles;
    `;

    const result = await runCypher(traversalCypher, { targetId });

    let downstreamTaskCount = 2;
    let downstreamMeetingCount = 1;
    let downstreamMilestoneCount = 2;
    let nodeTitle = 'WAR 2 — Climax Combat Live Shoot with Jr. NTR';
    let taskTitles: string[] = ['WAR 2 — European Overseas Stunt Block Briefing (Valencia & Alps)', 'Rolex 60s Global TVC Campaign Master Cut Signoff'];
    let meetingTitles: string[] = ['Cannes Film Festival VIP Press Junket', 'YRF Spy Universe Conclave'];

    if (result.records && result.records.length > 0) {
      const row = sanitizeNeo4jValue(result.records[0]);
      downstreamTaskCount = Number(row.downstreamTaskCount ?? 0);
      downstreamMeetingCount = Number(row.downstreamMeetingCount ?? 0);
      downstreamMilestoneCount = Number(row.downstreamMilestoneCount ?? 0);
      nodeTitle = row.nodeTitle || targetId;
      if (Array.isArray(row.downstreamTaskTitles) && row.downstreamTaskTitles.length > 0) {
        taskTitles = row.downstreamTaskTitles;
      }
      if (Array.isArray(row.downstreamMeetingTitles) && row.downstreamMeetingTitles.length > 0) {
        meetingTitles = row.downstreamMeetingTitles;
      }
    }

    const affectedTasks = Math.max(downstreamTaskCount, 1) * days;
    const rescheduledMeetings = Math.max(1, Math.min(downstreamMeetingCount || 2, days >= 2 ? 2 : 1));
    const launchSlipDays = days * (downstreamMilestoneCount > 0 ? 1 : 0.75);
    const criticalRisk = days >= 2 || downstreamTaskCount >= 3 || downstreamMilestoneCount > 0;

    return NextResponse.json({
      taskId: targetId,
      nodeTitle,
      delayDays: days,
      affectedTasks,
      affectedTasksList: taskTitles,
      rescheduledMeetings,
      rescheduledMeetingsList: meetingTitles,
      launchSlipDays: Math.round(launchSlipDays * 10) / 10,
      criticalRisk,
      isLiveDb: result.isLiveDb,
      calculatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        taskId: 'API Decision',
        delayDays: 1,
        affectedTasks: 3,
        rescheduledMeetings: 1,
        launchSlipDays: 1,
        criticalRisk: false,
        isLiveDb: false,
        error: err.message,
        calculatedAt: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

