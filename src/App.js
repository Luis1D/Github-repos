import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [repoList, setRepoList] = useState();
  const [userPhoto, setUserPhoto] = useState();
  useEffect(() => {
    axios.get("https://api.github.com/users/Luis1D/repos")
      .then(res => {
        let data = res.data;
        setRepoList(data);
        setUserPhoto(data[0].owner.avatar_url)
      })
      .catch(err => {
        console.log(err);
      })
  },[])
  return (
    <div className="App">
      <header>
        <h1>Github</h1>
        <div className="user-photo-container">
        {
          userPhoto ? <div>
            <img 
              src={ userPhoto }
              alt="user"
              className="user-photo"
            />
          </div> 
          : null
        }
        </div>
      </header>
      <div className="repo-list-container">
        {
          repoList ? repoList.map(repo => {
            return <a className="repo" href={ repo.clone_url } >
              <span className="repo-name">{ repo.name }</span>
            </a>
          })
          : null
        }
      </div>
    </div>
  );
}

export default App;
