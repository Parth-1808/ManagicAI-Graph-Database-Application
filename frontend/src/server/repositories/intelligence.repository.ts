import { executeCypher } from '../db/cognodb.client';

export class IntelligenceRepository {
  async getConflictRadar(limit = 5) {
    const cypher = `
      MATCH (c:Covenant)-[:BLOCKS]->(d:Dispute)
      OPTIONAL MATCH (c)-[:LEGAL_GOVERNANCE]->(b:Brand)
      RETURN c.id AS covenantId,
             c.title AS covenantTitle,
             c.valuation AS penaltyShield,
             d.id AS disputeId,
             d.title AS disputeTitle,
             d.description AS reason,
             d.riskTag AS riskTag,
             collect(DISTINCT b.brand) AS protectedBrands
      ORDER BY d.id ASC
      LIMIT $limit;
    `;
    const res = await executeCypher(cypher, { limit });
    return res.records;
  }

  async getCriticalPath() {
    const cypher = `
      MATCH path = (t1:Task { id: 'evt-1' })-[:ENABLES]->(t2:Task { id: 'evt-4' })-[:REQUIRED_FOR]->(e:Event { id: 'ent-cannes' })-[:PRECEDES]->(i:Event { id: 'ent-iifa' })
      OPTIONAL MATCH (cov:Covenant)-[:UNLOCKS]->(t2)
      RETURN t1.title AS shoot,
             t2.title AS overseasBriefing,
             e.name AS gala,
             i.name AS nextGala,
             cov.title AS requiredCovenant;
    `;
    const res = await executeCypher(cypher);
    return res.records[0] || null;
  }

  async getLikenessDefense() {
    const cypher = `
      MATCH (cov:Covenant { id: 'cov-likeness' })
      OPTIONAL MATCH (cov)-[:BLOCKS]->(d:Dispute)
      RETURN cov.title AS shieldTitle,
             cov.riskTag AS status,
             d.title AS flaggedClause,
             d.description AS mitigationNote;
    `;
    const res = await executeCypher(cypher);
    return res.records[0] || null;
  }

  async getCentralityRankings(limit = 8) {
    const cypher = `
      MATCH (p:Person)
      RETURN p.id AS personId,
             p.name AS name,
             p.role AS role,
             coalesce(p.team, 'Collaborator') AS team,
             coalesce(p.avatar, '/founder.jpg') AS avatar,
             coalesce(p.centralityScore, 80) AS centralityScore
      ORDER BY p.centralityScore DESC
      LIMIT $limit;
    `;
    const res = await executeCypher(cypher, { limit });
    return res.records;
  }

  async getAcceptedBrandDeals() {
    const cypher = `
      MATCH (b:Brand)
      WHERE b.status = 'active' OR b.status IS NULL
      RETURN b.id AS id,
             b.brand AS brand,
             coalesce(b.category, 'Brand Partnership') AS category,
             coalesce(b.term, '12-Month Lock') AS term,
             coalesce(b.signedDate, 'July 2026') AS signedDate,
             coalesce(b.amount, '₹45,00,000') AS amount,
             coalesce(b.deliverables, '1x Global TVC • 2x Print Billboards • Cannes Red Carpet Styling') AS deliverables,
             [
               'Active category exclusivity lock verified against luxury horology competitors',
               '₹45L milestone escrow deposit ratified with zero clause collisions',
               'Lloyds £15M stunt completion bond verified for Cannes styling appearance'
             ] AS whyAccepted;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }

  async getRejectedDisputes() {
    const cypher = `
      MATCH (d:Dispute)
      RETURN d.id AS id,
             d.title AS brand,
             coalesce(d.category, 'Commercial Inquiry') AS category,
             coalesce(d.proposedAmount, '₹50,00,000') AS proposedAmount,
             coalesce(d.inquiryDate, 'August 2026') AS inquiryDate,
             coalesce(d.riskTag, 'Exclusivity Collision') AS riskTag,
             coalesce(d.proposedDeliverables, 'Global Print + TVC Campaign + Digital Rights') AS proposedDeliverables,
             [
               d.description,
               'Automatic isolation triggered: active covenant shield prevents ₹1.5 Cr penalty default',
               'Flagged by ManagicAI Conflict Radar before reaching talent management inbox'
             ] AS whyRejected,
             coalesce(d.priority, 'Critical') AS riskLevel;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }

  async getEventsHistory() {
    const cypher = `
      MATCH (e:Event)
      RETURN e.id AS id,
             coalesce(e.title, e.name) AS name,
             coalesce(e.date, 'August 28, 2026') AS date,
             coalesce(e.year, '2026') AS year,
             coalesce(e.location, 'Palais des Festivals, Cannes, France') AS location,
             coalesce(e.role, 'VIP Guest & Global Brand Ambassador') AS role,
             coalesce(e.reach, '14.8M Impressions') AS reach,
             coalesce(e.status, 'Upcoming Premiere') AS status,
             coalesce(e.styling, 'Custom Sabyasachi Tuxedo • Rolex Daytona Platinum') AS styling,
             coalesce(e.image, 
               CASE 
                 WHEN e.name CONTAINS 'Cannes' THEN 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80'
                 WHEN e.name CONTAINS 'Red Sea' THEN 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80'
                 WHEN e.name CONTAINS 'IIFA' THEN 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80'
                 ELSE 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80'
               END
             ) AS image
      ORDER BY e.dateKey ASC;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }

  async getRevenueStreams() {
    const cypher = `
      MATCH (rev:RevenueStream)
      RETURN rev.id AS id,
             rev.name AS name,
             rev.monthlyValue AS monthlyValue,
             rev.monthlyDisplay AS monthlyDisplay,
             rev.monthlyPercent AS monthlyPercent,
             rev.monthlyGrowth AS monthlyGrowth,
             rev.yearlyValue AS yearlyValue,
             rev.yearlyDisplay AS yearlyDisplay,
             rev.yearlyPercent AS yearlyPercent,
             rev.yearlyGrowth AS yearlyGrowth,
             rev.color AS color
      ORDER BY rev.monthlyValue DESC;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }
}

export const intelligenceRepository = new IntelligenceRepository();
