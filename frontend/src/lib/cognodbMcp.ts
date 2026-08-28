/**
 * CognoDB MCP Client
 * Executes openCypher queries directly against CognoDB Cloud MCP Server (https://mcp.cognodb.com/mcp)
 */

const COGNODB_MCP_URL = 'https://mcp.cognodb.com/mcp';
const COGNODB_API_KEY =
  process.env.COGNODB_API_KEY ||
  'cdb_784dabb1_9341b23b1fdcbfd7d85cbf76d0f60afb';

export interface McpQueryOptions {
  instance?: string;
  params?: Record<string, any>;
  confirmDestructive?: boolean;
  limit?: number;
}

export async function runMcpCypher(
  cypher: string,
  options: McpQueryOptions = {}
): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  try {
    const res = await fetch(COGNODB_MCP_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COGNODB_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'query',
          arguments: {
            cypher,
            params: options.params || {},
            instance: options.instance || 'default',
            confirm_destructive: options.confirmDestructive ?? true,
            limit: options.limit || 100,
          },
        },
      }),
    });

    const json = await res.json();

    if (json.error) {
      return { success: false, error: json.error.message || 'JSON-RPC Error' };
    }

    return {
      success: true,
      data: json.result?.content || json.result,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getMcpSchema(instance: string = 'default') {
  try {
    const res = await fetch(COGNODB_MCP_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${COGNODB_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: 'schema',
          arguments: { instance },
        },
      }),
    });

    const json = await res.json();
    return json.result;
  } catch (err: any) {
    return { error: err.message };
  }
}
