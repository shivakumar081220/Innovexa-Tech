import { supabase } from '../lib/supabaseClient'

// Proposals (project requests)
export const proposalService = {
  insertProposal: async (payload) => {
    const { data, error } = await supabase.from('proposal').insert([payload]).select()
    if (error) throw error
    return data[0]
  },

  getProposals: async () => {
    const { data, error } = await supabase.from('proposal').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  updateProposal: async (id, updates) => {
    const { data, error } = await supabase.from('proposal').update(updates).eq('id', id).select()
    if (error) throw error
    return data[0]
  },

  deleteProposal: async (id) => {
    const { data, error } = await supabase.from('proposal').delete().eq('id', id)
    if (error) throw error
    return data
  },
}

// Projects (portfolio)
export const supaProjectsService = {
  createProject: async (payload) => {
    const { data, error } = await supabase.from('projects').insert([payload]).select()
    if (error) throw error
    return data[0]
  },

  getProjects: async () => {
    const { data, error } = await supabase.from('projects').select('*').order('id', { ascending: false })
    if (error) throw error
    return data
  },

  updateProject: async (id, updates) => {
    const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select()
    if (error) throw error
    return data[0]
  },

  deleteProject: async (id) => {
    const { data, error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error
    return data
  },
}

export default { proposalService, supaProjectsService }
