const getGifs = async (url) => {
    const res = await fetch(url).then(res => res.json())
    const { data } = res

    return data
}

export { getGifs }