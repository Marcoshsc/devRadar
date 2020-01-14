const devModel = require('../models/devModel');
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(req, res) {
        const devs = await devModel.find();
        return res.json(devs);
    },

    async store(req, res) {
        const { github_user, techs, latitude, longitude } = req.body;

        const foundDev = await devModel.findOne({
            github_user
        });

        if(!foundDev) {
            const devInfo = await axios.get(`https://api.github.com/users/${github_user}`);

            const { name = login, avatar_url, bio } = devInfo.data;

            const techArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            const newDev = await devModel.create({
                name,
                github_user,
                bio,
                avatar_url,
                techs: techArray,
                location,
            });

            return res.json(newDev);
        }

        return res.json(foundDev);
    }
}