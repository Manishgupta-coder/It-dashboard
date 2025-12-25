import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sheetId, sheetName } = await req.json();
    
    if (!sheetId) {
      return new Response(
        JSON.stringify({ error: 'Sheet ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use the Google Sheets API to fetch data from a public sheet
    // Format: https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:json&sheet={SHEET_NAME}
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json${sheetName ? `&sheet=${encodeURIComponent(sheetName)}` : ''}`;
    
    console.log('Fetching from Google Sheets:', gvizUrl);
    
    const response = await fetch(gvizUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
    }
    
    const text = await response.text();
    
    // Google returns JSONP-like response, extract the JSON
    // Response format: google.visualization.Query.setResponse({...})
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\((.+)\)/s);
    
    if (!jsonMatch) {
      throw new Error('Invalid response format from Google Sheets');
    }
    
    const jsonData = JSON.parse(jsonMatch[1]);
    
    if (jsonData.status === 'error') {
      throw new Error(jsonData.errors?.[0]?.message || 'Error fetching sheet data');
    }
    
    // Parse the table data
    const table = jsonData.table;
    const headers = table.cols.map((col: any) => col.label || col.id);
    const rows = table.rows.map((row: any) => {
      const rowData: Record<string, any> = {};
      row.c.forEach((cell: any, index: number) => {
        const header = headers[index];
        if (header) {
          rowData[header] = cell?.v ?? null;
        }
      });
      return rowData;
    });

    console.log(`Fetched ${rows.length} rows with headers:`, headers);

    return new Response(
      JSON.stringify({ 
        success: true, 
        headers,
        data: rows,
        rowCount: rows.length 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching Google Sheet:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});