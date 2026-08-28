import { executeCypher } from '../db/cognodb.client';

export class WorkspaceRepository {
  async getTasks() {
    const cypher = `
      MATCH (t:Task)
      RETURN t.id AS id,
             t.title AS title,
             t.description AS description,
             t.priority AS priority,
             t.status AS status,
             t.dateKey AS dateKey,
             t.time AS time,
             t.location AS location,
             t.role AS role,
             t.category AS category,
             t.studio AS studio;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }

  async getMeetings() {
    const cypher = `
      MATCH (m:Meeting)
      RETURN m.id AS id,
             m.title AS title,
             m.description AS description,
             m.time AS time,
             m.location AS location,
             m.dateKey AS dateKey,
             m.status AS status,
             m.attendeeCount AS attendeeCount,
             m.priority AS priority,
             m.type AS type;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }

  async getInvitations() {
    const cypher = `
      MATCH (inv:Invitation)
      RETURN inv.id AS id,
             coalesce(inv.title, inv.subject, 'VIP Conclave & Brand Invitation') AS title,
             coalesce(inv.description, inv.body, inv.subtitle, 'Exclusive talent collaboration opportunity') AS description,
             coalesce(inv.project, 'Talent Operations') AS project,
             coalesce(inv.type, 'collab') AS type,
             coalesce(inv.date, inv.proposedDate, 'Today') AS date,
             coalesce(inv.time, '10:00 AM') AS time,
             coalesce(inv.status, 'pending') AS status,
             coalesce(inv.priority, 'high') AS priority,
             coalesce(inv.attendeeCount, 1) AS attendeeCount,
             coalesce(inv.senderName, inv.sender, 'Brand Partner') AS senderName,
             coalesce(inv.senderRole, 'Creative Director') AS senderRole,
             coalesce(inv.senderAvatar, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80') AS senderAvatar;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }

  async createItem(payload: {
    id: string;
    title: string;
    type: string;
    description: string;
    priority: string;
    dateKey: number;
    time?: string;
    connectedNodeId?: string;
  }) {
    const cypher = `
      CREATE (t:Task {
        id: $id,
        title: $title,
        description: $description,
        priority: $priority,
        status: 'pending',
        dateKey: $dateKey,
        time: $time,
        type: $type
      })
      WITH t
      OPTIONAL MATCH (target { id: $connectedNodeId })
      FOREACH (_ IN CASE WHEN target IS NOT NULL THEN [1] ELSE [] END |
        CREATE (t)-[:DEPENDS_ON]->(target)
      )
      RETURN t.id AS id, t.title AS title;
    `;
    return executeCypher(cypher, payload);
  }

  async resolveDispute(disputeId: string) {
    const cypher = `
      MATCH (d:Dispute { id: $disputeId })
      SET d.status = 'resolved', d.riskTag = 'Resolved & Cleared'
      RETURN d.id AS id, d.title AS title;
    `;
    return executeCypher(cypher, { disputeId });
  }
}

export const workspaceRepository = new WorkspaceRepository();
