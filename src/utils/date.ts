export const getDate = (_date: string) => {
    const date = new Date(_date);

    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const getDateTime = (_date: string) => {
    const date = new Date(_date);
    const month = date.toLocaleString('en-us', { month: 'long' });
    return `${month}, ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
}