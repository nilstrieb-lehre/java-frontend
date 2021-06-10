// noinspection EqualityComparisonWithCoercionJS

const PlayerAPI = {
    players: [
        {
            number: 1,
            name: "Ben Blocker",
            position: "G",
            description: "A very good player, you might even call him outstanding."
        },
        {
            number: 2,
            name: "Dave Defender",
            position: "D",
            description: "A very good player, you might even call him outstanding."
        },
        {
            number: 99,
            name: "Hugo Boss",
            position: "D",
            description: "A very good player, you might even call him outstanding."
        },
        {
            number: 3,
            name: "Peter Meier",
            position: "D",
            description: "A very good player, you might even call him outstanding."
        },
        {
            number: 4,
            name: "Timo Nicolas Angst",
            position: "O",
            description: "A very good player, you might even call him outstanding."
        },
    ],
    all: function () {
        return this.players
    },
    get: function (id) {
        // eslint-disable-next-line eqeqeq
        return this.players.find(p => p.number == id)
    }
};

export default PlayerAPI;
