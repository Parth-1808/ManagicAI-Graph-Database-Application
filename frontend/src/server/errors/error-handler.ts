import { NextRequest, NextResponse } from 'next/server';
import { AppError } from './app-error';
import { ErrorCode } from './error-codes';

export type AsyncRouteHandler = (req: NextRequest, ctx?: any) => Promise<NextResponse | Response>;

/**
 * Higher-order controller wrapper for bulletproof async error handling in Next.js App Router
 */
export function withErrorHandler(handler: AsyncRouteHandler): AsyncRouteHandler {
  return async (req: NextRequest, ctx?: any) => {
    try {
      return await handler(req, ctx);
    } catch (err: any) {
      console.error(`[API Error] ${req.method} ${req.nextUrl.pathname}:`, err);

      if (err instanceof AppError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: err.code,
              message: err.message,
              details: err.details,
            },
            timestamp: new Date().toISOString(),
          },
          { status: err.statusCode }
        );
      }

      // Unhandled/Unexpected Errors
      return NextResponse.json(
        {
          success: false,
          error: {
            code: ErrorCode.INTERNAL_SERVER_ERROR,
            message: err.message || 'An unexpected server error occurred',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  };
}
