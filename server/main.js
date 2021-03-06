import {Games} from "../imports/api/games.js";

Meteor.methods({
    getGame: (id) => Games.findOne({_id: id}),

    joinGame: () => {
        var activeGame = Games.findOne({state: 'WAITING_FOR_START'});
        if (!activeGame) {
            activeGame = {
                state: 'WAITING_FOR_START',
                numberOfPlayers: 1
            };
            id = Games.insert(activeGame);
            activeGame._id = id;
        } else {
            Games.update({_id: activeGame._id}, {
                $set: {
                    state: 'IN_PROGRESS',
                    numberOfPlayers: 2
                }
            });
            activeGame.state = 'IN_PROGRESS';
            activeGame.numberOfPlayers = 2;
        }
        Meteor.publish("active-game", (id) => Games.findOne({_id: id}));
        console.log("Active Game: " + JSON.stringify(activeGame));
        return activeGame;
    }
});
