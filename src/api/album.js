import instance from "./axios.config"

export const getAll = async (limit) => {
    return await instance.get(`/album?limit=${limit}`)
}

export const getOne = async (id) => {
    return await instance.get(`/album/${id}`)
}

export const create = async (data) => {
    return await instance.post("/album", data)
}

export const update = async (id, data) => {
    return await instance.patch(`/album/${id}`, data)
}

export const del = async (id) => {
    return await instance.patch(`/album/${id}`)
}