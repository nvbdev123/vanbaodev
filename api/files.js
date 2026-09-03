const { list, put } = require('@vercel/blob');
module.exports = async function handler(req,res){
  if(req.method==='GET'){try{const {blobs}=await list({prefix:'shared/'});return res.status(200).json({files:blobs.map(b=>({url:b.url,pathname:b.pathname,size:b.size,uploadedAt:b.uploadedAt}))})}catch(e){return res.status(500).json({files:[],error:'Storage is not configured'})}}
  if(req.method==='POST'){if(req.headers['x-admin-key']!==process.env.ADMIN_KEY)return res.status(401).json({error:'Unauthorized'});try{const form=await req.formData();const file=form.get('file');if(!file||typeof file.arrayBuffer!=='function')return res.status(400).json({error:'No file'});const name=String(file.name||'file').replace(/[^a-zA-Z0-9._ -]/g,'_');const blob=await put('shared/'+name,file,{access:'public',addRandomSuffix:true});return res.status(200).json({message:'Uploaded',url:blob.url})}catch(e){return res.status(500).json({error:e.message})}}
  res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed'});
};
