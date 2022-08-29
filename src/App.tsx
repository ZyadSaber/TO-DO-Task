import {memo, useEffect, useState, useCallback} from 'react';
import Column from './components/Column';
import './App.css';
import {cardType, inputTextType} from './components/Interface'



function App() {

const [search, setSearch] = useState<string>("")
const [listData, setListData] = useState<cardType[]>([]);
const [localStorageSaveCHK, setLocalStorageSaveCHK] = useState<boolean>(false);
  const handleSearch = useCallback((event: inputTextType) => {
    setSearch(event.target.value);
  }, [setSearch]);

  //handle Local Storage
  useEffect(()=>{if (window.localStorage.getItem('ListData') !== null) setListData(JSON.parse(localStorage.getItem('ListData') || ""))},[]);
  useEffect(() => {
      if (localStorageSaveCHK === true) {localStorage.setItem('ListData', JSON.stringify(listData))};
      setLocalStorageSaveCHK(false)
  }, [listData, localStorageSaveCHK]);


  return (
    <div className="App">
      <h1>Tasks App</h1>
      <div className="appHeader">
      <h4>Here  all the tasks in the project.</h4>
      <input type="text" value={search} onChange={handleSearch} />
      </div>
      <div className="columns">
        <Column listData={listData} filter={"To Do"} search={search} setListData={setListData} setLocalStorageSaveCHK={setLocalStorageSaveCHK}/>
        <Column listData={listData} filter={"In Progress"} search={search} setListData={setListData} setLocalStorageSaveCHK={setLocalStorageSaveCHK}/>
        <Column listData={listData} filter={"On Hold"} search={search} setListData={setListData} setLocalStorageSaveCHK={setLocalStorageSaveCHK}/>
        <Column listData={listData} filter={"Done"} search={search} setListData={setListData} setLocalStorageSaveCHK={setLocalStorageSaveCHK}/>
      </div>
    </div>
  );
}

export default memo(App);