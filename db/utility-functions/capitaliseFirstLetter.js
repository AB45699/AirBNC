function capitaliseFirstLetter(string) {
    const firstLetterCapitalised = string.charAt(0).toUpperCase();
    const remainingLetters = string.slice(1).toLowerCase();
    const capitalisedWord = firstLetterCapitalised + remainingLetters;

    return capitalisedWord;
};

module.exports = capitaliseFirstLetter;