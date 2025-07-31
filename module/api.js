'use scrict'

export const getMinhaEscola = async () => {
    const url = 'http://localhost:3000/fotos'
    const response = await fetch(url)
    const data = await response.json()
    return data;
}
