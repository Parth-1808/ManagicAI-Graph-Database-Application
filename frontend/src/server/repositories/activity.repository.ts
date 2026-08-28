import { executeCypher } from '../db/cognodb.client';

export class ActivityRepository {
  async getAllActivities() {
    const cypher = `
      MATCH (act:ActivityLog)
      RETURN act.id AS id,
             act.type AS type,
             act.title AS title,
             act.detail AS detail,
             act.timeAgo AS timeAgo,
             act.status AS status,
             act.queryPrompt AS queryPrompt
      ORDER BY act.id ASC;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }
}

export const activityRepository = new ActivityRepository();
