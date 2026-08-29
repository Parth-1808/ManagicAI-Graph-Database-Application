import { executeCypher } from '../db/cognodb.client';

export interface TalentRootStats {
  talentName: string;
  talentRole: string;
  avatar: string;
  portfolioValuation: string;
  clearanceScore: number;
  talentStatus: string;
  currentProject: string;
  upcomingMilestone: string;
  filmCount: number;
  brandCount: number;
  conflictCount: number;
  taskCount: number;
}

export class TalentRepository {
  async getRootTalentStats(talentId = 'root-hrithik'): Promise<TalentRootStats | null> {
    const cypher = `
      MATCH (t:Talent { id: $talentId })
      OPTIONAL MATCH (f:Film)
      OPTIONAL MATCH (b:Brand)
      OPTIONAL MATCH (d:Dispute)
      OPTIONAL MATCH (task:Task)
      RETURN 
        t.name AS talentName,
        t.role AS talentRole,
        t.avatar AS avatar,
        t.portfolioValuation AS portfolioValuation,
        t.clearanceScore AS clearanceScore,
        t.status AS talentStatus,
        t.currentProject AS currentProject,
        t.upcomingMilestone AS upcomingMilestone,
        count(DISTINCT f) AS filmCount,
        count(DISTINCT b) AS brandCount,
        count(DISTINCT d) AS conflictCount,
        count(DISTINCT task) AS taskCount;
    `;

    const res = await executeCypher<TalentRootStats>(cypher, { talentId });
    return res.records[0] || null;
  }

  async getTalentRoster() {
    const cypher = `
      MATCH (p:Person)
      RETURN p.id AS id,
             p.name AS name,
             p.role AS role,
             coalesce(p.team, 'Collaborator') AS team,
             coalesce(p.email, 'contact@managic.ai') AS email,
             coalesce(p.avatar, '/founder.jpg') AS avatar,
             coalesce(p.centralityScore, 80) AS centralityScore,
             CASE WHEN p.id = 'root-hrithik' THEN true ELSE false END AS active
      ORDER BY CASE WHEN p.id = 'root-hrithik' THEN 0 ELSE 1 END, p.centralityScore DESC;
    `;

    const res = await executeCypher(cypher);
    return res.records;
  }

  async getAllFilms() {
    const cypher = `
      MATCH (f:Film)
      RETURN f.id AS id,
             f.title AS title,
             f.year AS year,
             f.role AS role,
             f.studio AS studio,
             f.status AS status,
             f.statusBadge AS statusBadge,
             f.payday AS payday,
             f.boxOffice AS boxOffice,
             coalesce(f.image, 
               CASE 
                 WHEN f.title CONTAINS 'War 2' THEN '/movies/war 2.png'
                 WHEN f.title CONTAINS 'Fighter' THEN '/movies/fighter.png'
                 WHEN f.title = 'War' THEN '/movies/war.jpg'
                 WHEN f.title CONTAINS 'Krrish' THEN '/movies/krish 3.jpg'
                 WHEN f.title CONTAINS 'Super 30' THEN '/movies/supar30.jpg'
                 ELSE '/movies/zindagi na milegi dobara.jpg'
               END
             ) AS image
      ORDER BY f.year DESC;
    `;

    const res = await executeCypher(cypher);
    return res.records;
  }
}

export const talentRepository = new TalentRepository();
