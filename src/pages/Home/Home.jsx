import React, { useCallback, useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Commit from '../../components/Commit/Commit';
import InputField from '../../components/InputField/InputField';
import Spinner from '../../components/Spinner/Spinner';
import './Home.css';
import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = `https://authorify-backend.herokuapp.com/`;

const axiosGet = async (url) => {
    try {
        let { data, status } = await axios.get(url);
        return { status, body: data };
    } catch (err) {
        return { status: err.response.status, body: err.response?.data.message };
    }
}

// verify that this repo is available and accessible
const verifyRepo = async ({ username, repoName }) =>
    await axiosGet(`${username}/${repoName}`);

// get the commits by date range from the backend
const getRepoCommits = async ({ username, repoName, start, end }) =>
    await axiosGet(`${username}/${repoName}/commits?start=${start}&end=${end}`);

const Home = () => {

    const [inputs, setInputs] = useState({
        username: '',
        repoName: '',
        start: '',
        end: ''
    });
    const [err, setError] = useState('');

    const [isValidRepo, setIsValidRepo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [commits, setCommits] = useState(null);

    const checkRepoValid = async () => {
        setCommits(null);
        setIsValidRepo(false);

        let { body, status } = await verifyRepo({
            username: inputs.username,
            repoName: inputs.repoName
        });

        // handling bad errors
        if (status === 500) {
            return setError(body);
        }

        if (status !== 200) {
            return setError(`Repository is not found or it's a private repository`);
        }

        if (body.exists) {
            setError('');
            setIsValidRepo(true);
        }
    }

    const handleInputChange = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;

        const newState = {
            ...inputs,
            [name]: value
        };

        setInputs(newState);
    }, [inputs]);

    const callOnDateSelection = (start, end) => {
        setInputs({
            ...inputs,
            start: start.toLocaleDateString(),
            end: end.toLocaleDateString()
        });
    }

    const onClickQueryCommits = async () => {
        setError('');
        setIsLoading(true);
        let { status, body } = await getRepoCommits(inputs);
        setIsLoading(false);

        if (status !== 200) {
            return setError(body);
        }

        if (!body.length)
            return setError('No commits found in this date range');

        setCommits(body);
    };

    return (
        <div className="home">

            <InputField label="Enter Repository Username">
                <input placeholder="Enter Repository Username" value={inputs.username} name="username" onChange={handleInputChange} />
            </InputField>

            <InputField label="Enter Repository Name">
                <input placeholder="Enter Repository Name" value={inputs.repoName} name="repoName" onChange={handleInputChange} />
            </InputField>

            <InputField>
                <button onClick={checkRepoValid}>Check Repository availability</button>
            </InputField>

            <div className={`container ${isValidRepo ? '' : 'hide'}`}>
                <InputField label="Choose Commits by date range">
                    <Calendar onDateSelection={callOnDateSelection} />
                </InputField>

                <InputField>
                    <button onClick={onClickQueryCommits}>Search Commits</button>
                </InputField>
                <Spinner loading={isLoading} />

                <div className="commit-container" style={{ display: `${isLoading || !commits || !commits.length ? 'none' : ''}` }}>
                    {commits ? commits.map(({
                        avatar,
                        name,
                        isSigned,
                        followersCount,
                        followingCount,
                        gistsCount,
                        organizations = [],
                    }, index) => {
                        return (
                            <Commit
                                key={index.toString()}
                                imgUrl={avatar}
                                author={name}
                                followers={followersCount}
                                following={followingCount}
                                gists={gistsCount}
                                signed={isSigned}
                                orgs={organizations}
                            />
                        );
                    }) : null}
                </div>

            </div>
            <div className={`error ${err ? '' : 'hide'}`}>{err}</div>
        </div>
    );
};

export default Home;