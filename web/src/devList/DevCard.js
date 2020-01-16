import React from 'react';

export default function DevCard(props) {
    const { data } = props;
    const { avatar_url, name, techs, bio, github_user } = data;
    
    function textFormatter(textArray) {
        let complete = '';
        for(let i = 0; i < textArray.length; i++) {
            complete += (i === textArray.length - 1) ? textArray[i] : `${textArray[i]}, `;
        }
        return complete;
    }

    return (
        <li className="dev-item">
            <header>
                <img src={avatar_url} alt={name}/>
                <div className="user-info">
                <strong>{name}</strong>
                <span>{textFormatter(techs)}</span>
                </div>
            </header>
            <p>{bio}</p>
            <a href={`https://github.com/${github_user}`}>Acessar perfil no Github</a>
        </li>
    )
}