const cardData = {
    "2D" : 1,
    "3D" : 2,
    "4D" : 3,
    "5D" : 4,
    "6D" : 5,
    "7D" : 6,
    "8D" : 7,
    "9D" : 8,
    "0D" : 9,
    "JD" : 10,
    "QD" : 11,
    "KD" : 12,
    "AD" : 13,
    "2C" : 14,
    "3C" : 15,
    "4C" : 16,
    "5C" : 17,
    "6C" : 18,
    "7C" : 19,
    "8C" : 20,
    "9C" : 21,
    "0C" : 22,
    "JC" : 23,
    "QC" : 24,
    "KC" : 25,
    "AC" : 26,
    "2H" : 27,
    "3H" : 28,
    "4H" : 29,
    "5H" : 30,
    "6H" : 31,
    "7H" : 32,
    "8H" : 33,
    "9H" : 34,
    "0H" : 35,
    "JH" : 36,
    "QH" : 37,
    "KH" : 38,
    "AH" : 39,
    "2S" : 40,
    "3S" : 41,
    "4S" : 42,
    "5S" : 43,
    "6S" : 44,
    "7S" : 45,
    "8S" : 46,
    "9S" : 47,
    "0S" : 48,
    "JS" : 49,
    "QS" : 50,
    "KS" : 51,
    "AS" : 52
}

const cardsAddBetting = ['JD', 'QD', 'KD', 'AD', 'JH', 'QH', 'KH', 'AH', 'JS', 'QS', 'KS', 'AS', 'JC', 'QC', 'KC', 'AC',]

const suitOrder = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES', 'NONE', 'CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES', 'NONE']

const playerOrder = ['player1', 'player2', 'player3', 'player4', 'player1']

module.exports = {
    cardData: cardData,
    cardsAddBetting: cardsAddBetting,
    suitOrder: suitOrder,
    playerOrder: playerOrder
} 