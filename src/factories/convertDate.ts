const ConvertDate = (d: Date) => {
    let date = d.getDate()
    let month = d.getMonth() + 1 //Months are zero based
    let year = d.getFullYear()

    return (`${date}-${month}-${year}`)
}

export default ConvertDate