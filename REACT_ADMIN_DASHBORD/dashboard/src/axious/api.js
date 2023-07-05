

import HTTP from "./http"

export const loginid = async ({ email, password, phone }) => await HTTP.post('/login', { email, password, phone })

export const sentEmails = async ({ OTP, recipient_email: emaill }) => await HTTP.post('/sendEmails', { OTP, recipient_email: emaill })


export const getUsers = async () => { return HTTP.get('/users') }

export const createUser = async (payload) => HTTP.post('/users', payload)

export const getIndividualsProfile = async (id) => HTTP.get(`/users/${id}`);


export const getUpdatedProfiles = () => { return HTTP.get('/users') }


export const updateProfiles = async (profile) => await HTTP.put(`/users/${profile.id}`, profile)
