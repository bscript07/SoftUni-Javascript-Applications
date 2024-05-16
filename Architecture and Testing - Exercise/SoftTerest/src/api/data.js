import * as api from './api.js';

const endpointsURL = {
    'ideas': `/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc`,
    'ideaById': `/data/ideas/`,
    'create': `/data/ideas`,
}

export async function getAllIdea() {
    return api.get(endpointsURL.ideas);
}

export async function getById(id) {
    return api.get(endpointsURL.ideaById + id)
}

export async function createIdea(ideaData) {
   return api.post(endpointsURL.create, ideaData)
}

export async function deleteById(id) {
    return api.delete(endpointsURL.ideaById + id)
}