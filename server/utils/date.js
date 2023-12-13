



function giveCurrentDateTime(){
    const now = new Date()
    return now.toISOString()
}

module.exports = giveCurrentDateTime;