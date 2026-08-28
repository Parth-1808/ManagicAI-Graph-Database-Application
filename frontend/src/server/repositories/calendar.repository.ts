import { executeCypher } from '../db/cognodb.client';

export class CalendarRepository {
  async getEvents() {
    const cypher = `
      MATCH (item)
      WHERE item:Task OR item:Meeting OR item:Event
      RETURN item.id AS id,
             coalesce(item.title, item.name) AS title,
             item.time AS time,
             coalesce(item.location, item.subtitle, 'YRF Studios') AS location,
             labels(item)[0] AS type,
             coalesce(item.category, 
               CASE 
                 WHEN item:Shoot OR item:Task THEN 'Shoot'
                 WHEN item:Brand OR item.category = 'Brand Collab' THEN 'Brand Collab'
                 WHEN item:Festival OR item:Event THEN 'VIP Gala'
                 ELSE 'Meeting'
               END
             ) AS category,
             coalesce(item.brandOrClient, item.studio, item.brand, item.subtitle) AS brandOrClient,
             coalesce(item.amount, item.valuation, item.payday) AS amount,
             coalesce(item.attendeeCount, 0) AS attendees,
             item.status AS status,
             coalesce(item.priority, 'medium') AS priority,
             coalesce(item.dateKey, 28) AS dateKey,
             coalesce(item.month, 7) AS month,
             coalesce(item.year, 2026) AS year,
             coalesce(item.date, 'August 2026') AS date,
             item.description AS description;
    `;
    const res = await executeCypher(cypher);
    return res.records;
  }
}

export const calendarRepository = new CalendarRepository();
