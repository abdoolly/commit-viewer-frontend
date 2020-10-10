import React from 'react';
import NormalText from '../NormalText/NormalText';
import './Commit.css';

const Commit = ({ imgUrl, author = 'Abdallah Gamal', signed = false, gists = 0, following = 0, followers = 0, orgs = [] }) => {
    return (
        <div className="commit">
            <div
                className="avatar"
                style={{ backgroundImage: `url("${imgUrl || 'https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg'}")` }}></div>
            <div className="text-info">
                <div style={{ gridColumn: '1/-1' }}>
                    <h4>Author</h4>
                    <NormalText text={author} />
                </div>
                <div className={`signed ${signed ? 'signed-true' : 'signed-false'}`}>
                    <NormalText text={signed ? 'Commit Signed' : 'Commit not signed'} />
                </div>
                <div>
                    <h4>Publish gists</h4>
                    <NormalText text={gists} />
                </div>
                <div>
                    <h4>Followers</h4>
                    <NormalText text={followers} />
                </div>
                <div>
                    <h4>Following</h4>
                    <NormalText text={following} />
                </div>
                <div className="orgs">
                    <h4>Organizations</h4>
                    <NormalText text={orgs.length ? orgs.join(', ') : 'User is not in any public organizations'} />
                </div>
            </div>
        </div >
    );
};

// If is the repository owner, display a badge over the Gravatar.
// If has Gravatar, should display it. Otherwise, display a default avatar.
// It should display if the commit is signed or not.
// The list of organizations the user belongs to.
// The count of user followers.
// The count of user following.
// The count of public gists.

export default Commit;