import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [repoList, setRepoList] = useState();
  const [userPhoto, setUserPhoto] = useState();

  const convertDate = (date)  => {
    let dateToFormat = new Date(date);
    let formatedDate = dateToFormat.getFullYear()+'-' + (dateToFormat.getMonth()+1) + '-'+dateToFormat.getDate();
    return formatedDate;
  }

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
      if (repoList) {
        console.log(repoList[0])
      }
  },[])
  return (
    <div className="App">
      <header>
        <div>
        {
          userPhoto ? <div className="user-photo-container">
            <span className="username">{ repoList[0].owner.login }</span>
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
            return <div className="repo" key={ repo.id }>
              <span className="repo-name">{ repo.name }</span>
              <span className="description">{ repo.description }</span>
              <span className="date-created">Created: { convertDate(repo.created_at) }</span>
              <span className="date-created">Last Updated: { convertDate(repo.updated_at) }</span>
              <a className="vist-btn" href={ repo.clone_url }>Visit Repo</a>
            </div>
          })
          : null
        }
      </div>
    </div>
  );
}

export default App;
