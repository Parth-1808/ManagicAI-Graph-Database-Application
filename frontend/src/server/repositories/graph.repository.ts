import { executeCypher } from '../db/cognodb.client';

export class GraphRepository {
  async getRawSubgraph() {
    const cypherNodes = `
      MATCH (n)
      OPTIONAL MATCH (n)-[r]->(m)
      WITH n, collect(DISTINCT {
        relId: coalesce(r.id, elementId(r)),
        relType: type(r),
        targetId: m.id
      }) AS outgoing
      RETURN n, outgoing;
    `;

    const cypherEdges = `
      MATCH (a)-[r]->(b)
      RETURN DISTINCT coalesce(r.id, elementId(r)) AS id,
             a.id AS source,
             b.id AS target,
             type(r) AS type,
             coalesce(r.label, type(r)) AS label,
             CASE WHEN type(r) IN ['BLOCKS', 'BLOCKS_RELEASE', 'REQUIRED_FOR', 'PROTECTED_BY'] THEN true ELSE false END AS isCritical;
    `;

    const [nodesRes, edgesRes] = await Promise.all([
      executeCypher(cypherNodes),
      executeCypher(cypherEdges),
    ]);

    return {
      nodes: nodesRes.records,
      edges: edgesRes.records,
    };
  }

  async findShortestPath(fromId: string, toId: string): Promise<string[]> {
    const cypher = `
      MATCH (start { id: $fromId }), (end { id: $toId })
      MATCH p = shortestPath((start)-[*..10]->(end))
      RETURN [n IN nodes(p) | n.id] AS pathNodeIds;
    `;

    const res = await executeCypher(cypher, { fromId, toId });
    return res.records[0]?.pathNodeIds || [];
  }

  async computeDownstreamImpact(rootId: string): Promise<string[]> {
    const cypher = `
      MATCH (start { id: $rootId })-[*1..4]->(downstream)
      RETURN collect(DISTINCT downstream.id) AS impactedIds;
    `;

    const res = await executeCypher(cypher, { rootId });
    return res.records[0]?.impactedIds || [];
  }
}

export const graphRepository = new GraphRepository();
