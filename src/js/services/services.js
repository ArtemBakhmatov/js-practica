const postData = async (url, data) => {  // async -> асинхронный код
    const res = await fetch(url, {       // await -> дождаться результата этого запроса
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json(); 
};

export {postData};