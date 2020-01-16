import React, { useState, useEffect } from 'react';

export default function Form(props) {
    const [githubUsername, setGithubUsername] = useState("");
    const [techs, setTechs] = useState("");
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    async function handleAddUser(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/devs', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                github_user: githubUsername,
                techs: techs,
                latitude: latitude,
                longitude: longitude,
            }),
        })
        const data = await response.json();
        props.callback(data);
        setGithubUsername('');
        setTechs('');
    } 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(setCoords);
    }, []);

    function setCoords(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    function handleChange(callback) {
        function inner(e) {
            callback(e.target.value);
        }
        return inner;
    }

    return (
        <>
            <strong>{props.value}</strong>
            <form onSubmit={handleAddUser}>
                <div className="input-block">
                    <label htmlFor="username_github">Usuário do Github</label>
                    <input name="username_github" id="username_github" value={githubUsername}
                        onChange={handleChange(setGithubUsername)} required/>
                </div>
                <div className="input-block">
                    <label htmlFor="techs">Tecnologias</label>
                    <input name="techs" id="techs" value={techs} onChange={handleChange(setTechs)} required/>
                </div>
                <div className="input-group">
                    <div className="input-block">
                        <label htmlFor="latitude">Latitude</label>
                        <input type="number" name="latitude" id="latitude" value={latitude} onChange={handleChange(setLatitude)} required/>
                    </div>
                    <div className="input-block">
                        <label htmlFor="longitude">Longitude</label>
                        <input type="number" name="longitude" id="longitude" value={longitude} onChange={handleChange(setLongitude)} required/>
                    </div>
                </div>
                <button type="submit" id="submit-button">Salvar</button>
            </form>
        </>
    )
}