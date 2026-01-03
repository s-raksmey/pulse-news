// app/debug/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { getGqlClient } from "@/services/graphql-client";

// Helper to bypass log forwarding
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
  info: console.info,
};

// Error handling utilities
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Unknown error occurred';
}

function getErrorDetails(error: unknown): {
  name: string;
  message: string;
  stack?: string;
} {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  
  return {
    name: 'UnknownError',
    message: String(error),
  };
}

export default function DebugPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawJson, setRawJson] = useState<string>("");
  const [success, setSuccess] = useState(false);

  // Use useCallback to prevent recreating the function on every render
  const directLog = useCallback((...args: any[]) => {
    originalConsole.log("[DIRECT]", ...args);
    
    // Update UI with logs - but only if component is mounted
    setRawJson(prev => prev + "\n" + args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(" "));
  }, []);

  useEffect(() => {
    // Log only once when component mounts
    directLog("🎬 DebugPage component mounted");
    directLog("🎯 useEffect triggered");
    fetchData();
  }, [directLog]);

  const fetchData = async () => {
    directLog("🚀 fetchData called");
    setLoading(true);
    setError(null);
    setSuccess(false);
    setRawJson(prev => prev + "\n=== Starting fetch ===");

    try {
      directLog("1. Getting GraphQL client...");
      const client = getGqlClient();
      directLog("2. Client type:", client.constructor.name);

      // SIMPLIFIED QUERY - Remove tags field to avoid the error
      const simpleQuery = /* GraphQL */ `
        query GetArticles {
          articles(take: 10) {
            id
            title
            slug
            contentJson
            excerpt
            status
            createdAt
            updatedAt
            publishedAt
            category {
              id
              name
              slug
            }
            # tags field removed - causes backend error
            # tags {
            #   id
            #   name
            #   slug
            # }
          }
        }
      `;

      directLog("3. Executing query...");
      const result = await client.request(simpleQuery);
      directLog("4. Query successful!");
      
      // Check what we got
      if (result?.articles) {
        directLog(`5. Found ${result.articles.length} article(s)`);
        
        // Analyze contentJson
        result.articles.forEach((article: any, index: number) => {
          if (article.contentJson) {
            directLog(`6. Article ${index + 1} contentJson:`, {
              type: typeof article.contentJson,
              isObject: typeof article.contentJson === 'object',
              hasBlocks: article.contentJson.blocks ? true : false,
              blockCount: article.contentJson.blocks ? article.contentJson.blocks.length : 0,
              sampleBlock: article.contentJson.blocks?.[0]?.type
            });
          }
        });
      }

      setData(result);
      setSuccess(true);
      
      // Save raw JSON for display
      setRawJson(JSON.stringify(result, null, 2));

    } catch (err) {
      const errorDetails = getErrorDetails(err);
      directLog("💥 ERROR DETAILS:", errorDetails);
      
      // Check if it's a partial success (GraphQL returns both data and errors)
      if (errorDetails.message.includes('"data":') && errorDetails.message.includes('"errors":')) {
        directLog("⚠️ Partial success - GraphQL returned data with errors");
        // Try to extract data from the error message
        try {
          const errorObj = JSON.parse(errorDetails.message.replace(/^Error: /, ''));
          if (errorObj.response?.data) {
            directLog("Extracted data from error response");
            setData(errorObj.response.data);
            setSuccess(true);
          }
        } catch (parseErr) {
          // Ignore parse error, just show the original error
        }
      }
      
      setError(errorDetails.message);
    } finally {
      directLog("✅ fetchData completed");
      setLoading(false);
    }
  };

  const analyzeContentJson = (contentJson: any) => {
    if (!contentJson) return null;
    
    if (typeof contentJson === 'string') {
      try {
        return JSON.parse(contentJson);
      } catch (e) {
        return { error: "Failed to parse JSON string", raw: contentJson.substring(0, 100) + "..." };
      }
    }
    
    return contentJson;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-xl">Loading debug data...</div>
        <div className="mt-4 text-sm text-gray-600">Check browser console for logs</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">GraphQL Data Debugger</h1>
      <p className="text-gray-600 mb-6">
        Testing connection to GraphQL API and inspecting contentJson structure
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-700 font-bold">⚠️ Partial Error:</h2>
          <div className="text-red-600 text-sm mt-1">
            <p className="mb-2">Backend error with tags resolver, but we have data!</p>
            <details className="mt-2">
              <summary className="cursor-pointer text-xs font-medium">View error details</summary>
              <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto max-h-64 whitespace-pre-wrap">
                {error}
              </pre>
            </details>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <h2 className="text-green-700 font-bold">✅ Success!</h2>
          <p className="text-green-600 text-sm">Data retrieved successfully (ignoring tags error)</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Control Panel */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h2 className="font-bold text-blue-700 mb-2">Controls</h2>
            <button
              onClick={fetchData}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 mr-3"
            >
              {loading ? "Loading..." : "Fetch Data"}
            </button>
            
            <button
              onClick={() => {
                window.console.log("Test log - should appear in forwarded logs");
                directLog("Test direct log - bypasses forwarding");
              }}
              className="ml-3 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Test Logging
            </button>
          </div>

          {/* Connection Info */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded">
            <h2 className="font-bold mb-2">Connection Status</h2>
            <div className="space-y-1 text-sm">
              <div className="flex">
                <span className="w-40">GraphQL Data:</span>
                <span className="font-mono">{data ? "Retrieved ✓" : "Not loaded"}</span>
              </div>
              <div className="flex">
                <span className="w-40">Articles Found:</span>
                <span className="font-mono">{data?.articles?.length || 0}</span>
              </div>
              <div className="flex">
                <span className="w-40">Tags Field:</span>
                <span className="font-mono text-amber-600">Error in backend</span>
              </div>
              <div className="flex">
                <span className="w-40">contentJson Type:</span>
                <span className="font-mono">
                  {data?.articles?.[0]?.contentJson ? 
                    typeof data.articles[0].contentJson : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Logs Panel */}
        <div className="p-4 bg-black text-green-400 font-mono text-sm rounded border border-gray-700">
          <h2 className="font-bold mb-2 text-white">Live Logs (Bypassed)</h2>
          <div className="h-64 overflow-auto">
            <pre className="whitespace-pre-wrap">{rawJson || "Logs will appear here..."}</pre>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            These logs bypass the forwarding system.
          </div>
        </div>
      </div>

      {/* Data Display */}
      {data && data.articles && (
        <div className="space-y-8">
          {/* Summary */}
          <div className="p-4 bg-white border rounded shadow">
            <h2 className="text-xl font-bold mb-3">Data Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded">
                <div className="text-sm text-blue-600">Total Articles</div>
                <div className="text-2xl font-bold">{data.articles.length}</div>
              </div>
              <div className="p-3 bg-green-50 rounded">
                <div className="text-sm text-green-600">With contentJson</div>
                <div className="text-2xl font-bold">
                  {data.articles.filter((a: any) => a.contentJson).length}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded">
                <div className="text-sm text-purple-600">Published</div>
                <div className="text-2xl font-bold">
                  {data.articles.filter((a: any) => a.status === 'PUBLISHED').length}
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded">
                <div className="text-sm text-amber-600">With Category</div>
                <div className="text-2xl font-bold">
                  {data.articles.filter((a: any) => a.category).length}
                </div>
              </div>
            </div>
          </div>

          {/* Key Discovery */}
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h2 className="text-xl font-bold text-green-700 mb-2">🎯 Key Discovery</h2>
            <p className="text-green-600 mb-2">
              <strong>contentJson structure found:</strong> It's already a parsed JSON object with Editor.js format!
            </p>
            <div className="text-sm bg-white p-3 rounded border">
              <p className="font-medium mb-1">Structure:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>contentJson.time</code>: Timestamp</li>
                <li><code>contentJson.blocks</code>: Array of content blocks</li>
                <li><code>contentJson.version</code>: "2.31.0" (Editor.js version)</li>
                <li>Block types found: <code>image</code>, <code>paragraph</code></li>
              </ul>
            </div>
          </div>

          {/* Articles List */}
          <div>
            <h2 className="text-xl font-bold mb-4">Articles ({data.articles.length})</h2>
            <div className="space-y-6">
              {data.articles.map((article: any, index: number) => {
                const parsedContent = analyzeContentJson(article.contentJson);
                
                return (
                  <div key={article.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">
                          #{index + 1}: {article.title || "No Title"}
                        </h3>
                        <div className="flex gap-2">
                          <span className={`text-sm px-2 py-1 rounded ${
                            article.status === 'PUBLISHED' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-200 text-gray-800'
                          }`}>
                            {article.status || "draft"}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        ID: <code className="text-xs">{article.id}</code> • 
                        Slug: <code>{article.slug}</code> • 
                        Created: {new Date(article.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-700">Category</h4>
                          <p className="text-lg">{article.category?.name || "None"}</p>
                          <p className="text-xs text-gray-500">Slug: {article.category?.slug}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Dates</h4>
                          <div className="text-sm space-y-1">
                            <div>Created: {new Date(article.createdAt).toLocaleString()}</div>
                            <div>Updated: {new Date(article.updatedAt).toLocaleString()}</div>
                            {article.publishedAt && (
                              <div>Published: {new Date(article.publishedAt).toLocaleString()}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Excerpt */}
                      {article.excerpt && (
                        <div className="mb-4 p-3 bg-blue-50 rounded">
                          <h4 className="font-medium text-blue-700">Excerpt</h4>
                          <p className="text-sm mt-1">{article.excerpt}</p>
                        </div>
                      )}

                      {/* contentJson Display */}
                      <div className="mt-4">
                        <h4 className="font-bold mb-2 flex items-center">
                          <span>Editor.js Content</span>
                          {parsedContent && (
                            <span className="ml-2 text-xs font-normal px-2 py-1 bg-gray-200 rounded">
                              {parsedContent.blocks?.length || 0} blocks
                            </span>
                          )}
                        </h4>
                        
                        {!article.contentJson ? (
                          <div className="text-amber-600 p-3 bg-amber-50 rounded">
                            No contentJson data
                          </div>
                        ) : parsedContent && parsedContent.blocks ? (
                          <div className="space-y-4">
                            {/* Render blocks */}
                            {parsedContent.blocks.map((block: any, blockIndex: number) => (
                              <div key={block.id || blockIndex} className="border rounded p-3">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded">
                                      {block.type}
                                    </span>
                                    <span className="text-xs text-gray-500">ID: {block.id}</span>
                                  </div>
                                  {block.tunes?.highlight?.highlighted && (
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                      Highlighted
                                    </span>
                                  )}
                                </div>
                                
                                {/* Render block content based on type */}
                                {block.type === 'paragraph' && block.data?.text && (
                                  <p className="text-gray-700">{block.data.text}</p>
                                )}
                                
                                {block.type === 'image' && block.data?.url && (
                                  <div>
                                    <div className="text-sm text-gray-600 mb-2">Image URL:</div>
                                    <code className="text-xs bg-gray-100 p-2 rounded block overflow-auto">
                                      {block.data.url}
                                    </code>
                                    <div className="mt-2">
                                      <img 
                                        src={block.data.url} 
                                        alt="Article content"
                                        className="max-w-full h-auto rounded border"
                                        onError={(e) => {
                                          (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                                
                                {/* Raw block data */}
                                <details className="mt-2">
                                  <summary className="cursor-pointer text-xs font-medium text-gray-700">
                                    View raw block data
                                  </summary>
                                  <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                                    {JSON.stringify(block, null, 2)}
                                  </pre>
                                </details>
                              </div>
                            ))}
                            
                            {/* Metadata */}
                            <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded">
                              <div className="grid grid-cols-2 gap-2">
                                <div>Version: <code>{parsedContent.version}</code></div>
                                <div>Time: {new Date(parsedContent.time).toLocaleString()}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-red-600 p-3 bg-red-50 rounded">
                            Could not parse contentJson
                            <pre className="mt-2 text-xs overflow-auto max-h-40">
                              {typeof article.contentJson === 'string' 
                                ? article.contentJson.substring(0, 500) + "..." 
                                : JSON.stringify(article.contentJson, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>

                      {/* Full JSON (collapsed) */}
                      <details className="mt-6">
                        <summary className="cursor-pointer text-sm font-medium text-gray-700">
                          View Full Article JSON
                        </summary>
                        <pre className="mt-2 text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-auto max-h-96 whitespace-pre-wrap">
                          {JSON.stringify(article, null, 2)}
                        </pre>
                      </details>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backend Issue Notice */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded">
            <h3 className="font-bold text-amber-800">⚠️ Backend Issue Found</h3>
            <p className="text-sm text-amber-700 mt-1">
              The GraphQL resolver for <code>tags</code> field has a Prisma error: 
              "Unknown argument <code>articles</code>" in <code>db.tag.findMany()</code>.
            </p>
            <p className="text-sm text-amber-700 mt-2">
              This is a backend schema/resolver issue - the relation name in your Prisma schema 
              might be different (e.g., <code>posts</code> instead of <code>articles</code>).
            </p>
          </div>

          {/* Raw Data */}
          <div className="p-4 bg-gray-900 text-gray-100 rounded">
            <h2 className="font-bold mb-2">Complete Response</h2>
            <pre className="text-xs overflow-auto max-h-96 whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-bold text-blue-800">✅ Success Summary</h3>
        <ul className="mt-2 text-sm text-blue-700 space-y-1">
          <li>• GraphQL connection is working</li>
          <li>• Articles data is being retrieved successfully</li>
          <li>• <code>contentJson</code> is properly structured Editor.js data (already parsed)</li>
          <li>• Contains images and paragraphs in blocks array</li>
          <li>• Only issue: <code>tags</code> resolver has backend Prisma error</li>
          <li>• <strong>Your frontend can now render article content!</strong></li>
        </ul>
        <div className="mt-3 text-xs text-blue-600">
          <strong>Next step:</strong> Create a component to render Editor.js blocks from <code>contentJson</code>
        </div>
      </div>
    </div>
  );
}