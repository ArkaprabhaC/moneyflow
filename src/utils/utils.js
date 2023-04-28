
export const getDataStoreKey = () => {
    const date = new Date();
    return (date.getMonth() + 1) + "/" + date.getUTCFullYear();
}

export const createTransactionSaveDate = () => {
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return date.getDate() + " " + months[date.getMonth()] + ", " + date.getUTCFullYear();
}