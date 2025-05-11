import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const search = req.query.search as string || ''; 
  const id = req.query.id as string || '';
  const page = parseInt(req.query.page as string || '1');
  const limit = 20;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  let query = null
  if (!id)
  {
    query = supabase.from('stated_medication')
    .select('*, typed_medication:typed_medication (CIP, FORME_PHARMACEUTIQUE, SUBSTANCE, DOSAGE)', { count: 'exact' })
    .range(from, to);
      
    if (search) {
      query = query.ilike('NOM_COMMERCIAL', `%${search}%`);
    }
  }
  else 
  {
    const temp = supabase.from('medication')
    .select('*', { count: 'exact' })
    .eq('full_CIP', id)
    const { data: temp_data, error, count } = await temp;
    
    if (temp_data?.[0]) {
      query = supabase.from('stated_medication')
      .select('*, typed_medication:typed_medication (CIP, FORME_PHARMACEUTIQUE, SUBSTANCE, DOSAGE)', { count: 'exact' })
      .eq('CIS', temp_data?.[0]?.CIP)
      const { data, error, count } = await query;
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      console.log("data", data)
      return res.status(200).json({data, count});
    }
    return res.status(500).json({ message: "error" });
  }

  const { data, error, count } = await query;

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({data, count});
}

