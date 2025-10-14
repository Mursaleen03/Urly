export async function getUrls(user_id) {
  const {data: session, error} = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}